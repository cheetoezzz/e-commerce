const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');

// GET /api/products - Get all products with filtering, sorting, and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      featured,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      minPrice,
      maxPrice
    } = req.query;

    // Build query
    const query = {};
    
    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      }
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Build sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    res.json({
      products,
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

// GET /api/products/featured - Get featured products only
router.get('/featured', async (req, res) => {
  try {
    const { limit = 8 } = req.query;
    
    const products = await Product.find({ featured: true })
      .populate('category', 'name slug')
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/search - Search products
router.get('/search', async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const products = await Product.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    )
      .populate('category', 'name slug')
      .sort({ score: { $meta: 'textScore' } })
      .limit(parseInt(limit));

    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/:id - Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name slug description');

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/category/:categorySlug - Get products by category
router.get('/category/:categorySlug', async (req, res) => {
  try {
    const { categorySlug } = req.params;
    const { page = 1, limit = 12, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

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

// GET /api/products/price-range - Get min and max price
router.get('/price-range/stats', async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $group: {
          _id: null,
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
          avgPrice: { $avg: '$price' }
        }
      }
    ]);

    const priceRange = result[0] || { minPrice: 0, maxPrice: 1000, avgPrice: 50 };

    res.json(priceRange);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
