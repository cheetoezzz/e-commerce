const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Product = require('../models/Product');

// GET /api/categories - Get all categories
router.get('/', async (req, res) => {
  try {
    const { includeProductCount = false } = req.query;
    
    let categories = await Category.find({ isActive: true })
      .sort({ sortOrder: 1, name: 1 });

    if (includeProductCount === 'true') {
      categories = await Promise.all(
        categories.map(async (category) => {
          const productCount = await Product.countDocuments({ 
            category: category._id 
          });
          
          return {
            ...category.toObject(),
            productCount
          };
        })
      );
    }

    res.json({ categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/categories/:slug - Get single category by slug
router.get('/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ 
      slug: req.params.slug,
      isActive: true 
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const productCount = await Product.countDocuments({ 
      category: category._id 
    });

    res.json({ 
      category: {
        ...category.toObject(),
        productCount
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/categories/:slug/products - Get products in a category
router.get('/:slug/products', async (req, res) => {
  try {
    const category = await Category.findOne({ 
      slug: req.params.slug,
      isActive: true 
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const { page = 1, limit = 12, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    const query = { category: category._id };
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(query);

    res.json({
      products,
      category,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalProducts: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
