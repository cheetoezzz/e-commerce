const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

const { products, categories } = require('./models/MemoryProduct');

const app = express();
const PORT = process.env.PORT || 5000;
const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL || `http://localhost:${PORT}`;

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(compression());
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://your-production-domain.com'
    : 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Helper functions
const paginate = (array, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = array.slice(startIndex, endIndex);

  return {
    products: paginatedItems,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(array.length / limit),
      totalProducts: array.length,
      hasNext: page < Math.ceil(array.length / limit),
      hasPrev: page > 1
    }
  };
};

const filterProducts = (products, filters) => {
  let filtered = [...products];

  if (filters.category) {
    filtered = filtered.filter(product =>
      product.category.slug === filters.category
    );
  }

  if (filters.featured === 'true') {
    filtered = filtered.filter(product => product.featured);
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  if (filters.minPrice) {
    filtered = filtered.filter(product => product.price >= parseFloat(filters.minPrice));
  }

  if (filters.maxPrice) {
    filtered = filtered.filter(product => product.price <= parseFloat(filters.maxPrice));
  }

  // Sorting
  if (filters.sortBy) {
    filtered.sort((a, b) => {
      let aVal = a[filters.sortBy];
      let bVal = b[filters.sortBy];

      if (filters.sortBy === 'price') {
        aVal = parseFloat(aVal);
        bVal = parseFloat(bVal);
      }

      if (filters.sortOrder === 'desc') {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      } else {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      }
    });
  }

  return filtered;
};

const normalizeProduct = (product) => {
  const imgs = Array.isArray(product.images) ? product.images : [];
  const normalizedImages = imgs.length
    ? imgs.map((_, idx) => `${PUBLIC_BASE_URL}/api/images/products/${product._id}/${idx}`)
    : [`${PUBLIC_BASE_URL}/api/images/products/${product._id}/0`];

  return {
    ...product,
    images: normalizedImages,
  };
};

const normalizeCategory = (category) => {
  return {
    ...category,
    image: `${PUBLIC_BASE_URL}/api/images/categories/${category.slug}`,
  };
};

const escapeXml = (unsafe) => {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

const svgCard = ({ title, subtitle }) => {
  const t = escapeXml(title);
  const s = subtitle ? escapeXml(subtitle) : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f3f4f6"/>
      <stop offset="100%" stop-color="#e5e7eb"/>
    </linearGradient>
  </defs>
  <rect width="800" height="800" rx="48" fill="url(#g)"/>
  <text x="50%" y="46%" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="42" font-weight="700" fill="#111827">${t}</text>
  ${s ? `<text x="50%" y="54%" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="500" fill="#6b7280">${s}</text>` : ''}
  <text x="50%" y="70%" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="600" fill="#9ca3af">SHOPORA</text>
</svg>`;
};

// Image endpoints (SVG placeholders that always load)
app.get('/api/images/placeholder', (req, res) => {
  const body = svgCard({ title: 'SHOPORA', subtitle: 'Minimal Commerce' });
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'no-store');
  res.send(body);
});

app.get('/api/images/products/:id/:index', (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p._id === id);
  if (!product) return res.status(404).send('Not found');

  const body = svgCard({
    title: product.name,
    subtitle: product.category?.name || ''
  });

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'no-store');
  res.send(body);
});

app.get('/api/images/categories/:slug', (req, res) => {
  const { slug } = req.params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return res.status(404).send('Not found');

  const body = svgCard({
    title: category.name,
    subtitle: category.description || ''
  });

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'no-store');
  res.send(body);
});

// API Routes

// GET /api/health
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// GET /api/products
app.get('/api/products', (req, res) => {
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

  const filters = { category, featured, search, sortBy, sortOrder, minPrice, maxPrice };
  const filtered = filterProducts(products, filters).map(normalizeProduct);
  const result = paginate(filtered, page, limit);

  res.json(result);
});

// GET /api/products/featured
app.get('/api/products/featured', (req, res) => {
  const { limit = 8 } = req.query;
  const featuredProducts = products.filter(product => product.featured).map(normalizeProduct);
  res.json({ products: featuredProducts.slice(0, parseInt(limit)) });
});

// GET /api/products/search
app.get('/api/products/search', (req, res) => {
  const { q, limit = 10 } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  const searchLower = q.toLowerCase();
  const searchResults = products.filter(product =>
    product.name.toLowerCase().includes(searchLower) ||
    product.description.toLowerCase().includes(searchLower) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchLower))
  ).map(normalizeProduct);

  res.json({ products: searchResults.slice(0, parseInt(limit)) });
});

// GET /api/products/:id
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json({ product: normalizeProduct(product) });
});

// GET /api/products/category/:categorySlug
app.get('/api/products/category/:categorySlug', (req, res) => {
  const { categorySlug } = req.params;
  const { page = 1, limit = 12, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

  const categoryProducts = products
    .filter(product => product.category.slug === categorySlug)
    .map(normalizeProduct);

  const category = categories.find(cat => cat.slug === categorySlug);

  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

  // Sort products
  const sorted = [...categoryProducts].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];

    if (sortBy === 'price') {
      aVal = parseFloat(aVal);
      bVal = parseFloat(bVal);
    }

    if (sortOrder === 'desc') {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    } else {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    }
  });

  const result = paginate(sorted, page, limit);
  result.category = normalizeCategory(category);

  res.json(result);
});

// GET /api/products/price-range/stats
app.get('/api/products/price-range/stats', (req, res) => {
  const prices = products.map(p => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;

  res.json({
    minPrice,
    maxPrice,
    avgPrice
  });
});

// GET /api/categories
app.get('/api/categories', (req, res) => {
  const { includeProductCount = false } = req.query;

  let result = categories.filter(cat => cat.isActive).map(normalizeCategory);

  if (includeProductCount === 'true') {
    result = result.map(category => ({
      ...category,
      productCount: products.filter(product => product.category.slug === category.slug).length
    }));
  }

  res.json({ categories: result });
});

// GET /api/categories/:slug
app.get('/api/categories/:slug', (req, res) => {
  const category = categories.find(cat =>
    cat.slug === req.params.slug && cat.isActive
  );

  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

  const productCount = products.filter(product =>
    product.category.slug === category.slug
  ).length;

  res.json({
    category: {
      ...normalizeCategory(category),
      productCount
    }
  });
});

// GET /api/categories/:slug/products
app.get('/api/categories/:slug/products', (req, res) => {
  const category = categories.find(cat =>
    cat.slug === req.params.slug && cat.isActive
  );

  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

  const { page = 1, limit = 12, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

  const categoryProducts = products
    .filter(product => product.category.slug === category.slug)
    .map(normalizeProduct);

  // Sort products
  const sorted = [...categoryProducts].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];

    if (sortBy === 'price') {
      aVal = parseFloat(aVal);
      bVal = parseFloat(bVal);
    }

    if (sortOrder === 'desc') {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    } else {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    }
  });

  const result = paginate(sorted, page, limit);
  result.category = normalizeCategory(category);

  res.json(result);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend should be available at: http://localhost:5173`);
  console.log(`API is available at: http://localhost:${PORT}/api`);
});

module.exports = app;
