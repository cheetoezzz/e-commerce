const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  specifications: {
    type: Map,
    of: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for formatted price
productSchema.virtual('formattedPrice').get(function() {
  return `$${this.price.toFixed(2)}`;
});

// Text search index
productSchema.index({
  name: 'text',
  description: 'text',
  tags: 'text'
});

// Compound indexes for common queries
productSchema.index({ category: 1, featured: -1 });
productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Product', productSchema);
