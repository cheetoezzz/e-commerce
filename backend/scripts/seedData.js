const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
require('dotenv').config();

const categories = [
  {
    name: 'Electronics',
    description: 'Modern electronics and gadgets',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
    sortOrder: 1
  },
  {
    name: 'Furniture',
    description: 'Minimalist furniture for modern living',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    sortOrder: 2
  },
  {
    name: 'Accessories',
    description: 'Everyday accessories and essentials',
    image: 'https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=400',
    sortOrder: 3
  },
  {
    name: 'Lighting',
    description: 'Modern lighting solutions',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a226e6d23?w=400',
    sortOrder: 4
  }
];

const products = [
  {
    name: 'Minimalist Desk Lamp',
    price: 89.99,
    description: 'A sleek and modern desk lamp with adjustable brightness and color temperature. Perfect for any workspace.',
    category: 'Lighting',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a226e6d23?w=600',
      'https://images.unsplash.com/photo-1513506003901-1e6a226e6d23?w=600&h=400'
    ],
    stock: 25,
    featured: true,
    tags: ['lighting', 'desk', 'modern', 'LED'],
    specifications: {
      'Material': 'Aluminum',
      'Dimensions': '12" x 6" x 18"',
      'Power': '12W LED',
      'Color Temperature': '2700K - 6500K'
    }
  },
  {
    name: 'Wireless Charging Pad',
    price: 34.99,
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Minimalist design with premium materials.',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400'
    ],
    stock: 50,
    featured: true,
    tags: ['wireless', 'charging', 'electronics', 'Qi'],
    specifications: {
      'Output': '15W Max',
      'Compatibility': 'Qi-enabled devices',
      'Material': 'Premium fabric',
      'Safety': 'Overcharge protection'
    }
  },
  {
    name: 'Minimalist Coffee Table',
    price: 299.99,
    description: 'Clean lines and natural materials define this minimalist coffee table. Perfect centerpiece for modern living rooms.',
    category: 'Furniture',
    images: [
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600',
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=400'
    ],
    stock: 15,
    featured: true,
    tags: ['furniture', 'table', 'modern', 'minimalist'],
    specifications: {
      'Material': 'Oak wood',
      'Dimensions': '48" x 24" x 16"',
      'Finish': 'Natural oil',
      'Assembly': 'Required'
    }
  },
  {
    name: 'Leather Wallet',
    price: 59.99,
    description: 'Handcrafted leather wallet with RFID protection. Slim profile with multiple card slots and cash compartment.',
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1627123424574-45ba0301ec65?w=600',
      'https://images.unsplash.com/photo-1627123424574-45ba0301ec65?w=600&h=400'
    ],
    stock: 40,
    featured: false,
    tags: ['wallet', 'leather', 'accessories', 'RFID'],
    specifications: {
      'Material': 'Genuine leather',
      'Dimensions': '4.25" x 3.25" x 0.25"',
      'Card Slots': '8',
      'Features': 'RFID protection'
    }
  },
  {
    name: 'Smart Speaker',
    price: 129.99,
    description: 'Premium smart speaker with exceptional sound quality and voice assistant integration. Minimalist aesthetic.',
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=400'
    ],
    stock: 30,
    featured: true,
    tags: ['speaker', 'smart', 'audio', 'voice'],
    specifications: {
      'Power': '20W',
      'Connectivity': 'Wi-Fi, Bluetooth',
      'Voice Assistant': 'Compatible',
      'Dimensions': '6" x 4" x 4"'
    }
  },
  {
    name: 'Minimalist Bookshelf',
    price: 189.99,
    description: 'Floating bookshelf with clean lines and hidden mounting hardware. Perfect for displaying books and decor.',
    category: 'Furniture',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=400'
    ],
    stock: 20,
    featured: false,
    tags: ['bookshelf', 'wall', 'floating', 'storage'],
    specifications: {
      'Material': 'Bamboo',
      'Dimensions': '36" x 8" x 6"',
      'Weight Capacity': '50 lbs',
      'Installation': 'Wall-mounted'
    }
  },
  {
    name: 'Ceramic Vase',
    price: 44.99,
    description: 'Handcrafted ceramic vase with minimalist design. Perfect for fresh flowers or as a standalone decor piece.',
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1588482364533-31bf8a40568b?w=600',
      'https://images.unsplash.com/photo-1588482364533-31bf8a40568b?w=600&h=400'
    ],
    stock: 35,
    featured: false,
    tags: ['vase', 'ceramic', 'decor', 'handmade'],
    specifications: {
      'Material': 'Ceramic',
      'Dimensions': '8" x 4"',
      'Color': 'Matte white',
      'Care': 'Hand wash only'
    }
  },
  {
    name: 'Floor Lamp',
    price: 149.99,
    description: 'Elegant floor lamp with adjustable arm and warm LED lighting. Creates the perfect ambiance for any room.',
    category: 'Lighting',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400'
    ],
    stock: 18,
    featured: false,
    tags: ['lamp', 'floor', 'lighting', 'modern'],
    specifications: {
      'Height': '64"',
      'Material': 'Metal and fabric',
      'Bulb': 'LED included',
      'Switch': 'Foot pedal'
    }
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log('Cleared existing data');

    // Create categories
    const createdCategories = await Category.create(categories);
    console.log(`Created ${createdCategories.length} categories`);

    // Create products with category references
    const productsWithCategories = products.map(product => {
      const category = createdCategories.find(cat => cat.name === product.category);
      return {
        ...product,
        category: category._id
      };
    });

    const createdProducts = await Product.create(productsWithCategories);
    console.log(`Created ${createdProducts.length} products`);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
  }
}

// Run the seed function
seedDatabase();
