// In-memory product data for demo purposes
const products = [
  {
    _id: '1',
    name: 'Minimalist Desk Lamp',
    price: 89.99,
    description: 'A sleek and modern desk lamp with adjustable brightness and color temperature. Perfect for any workspace.',
    category: {
      _id: 'cat1',
      name: 'Lighting',
      slug: 'lighting'
    },
    images: [
      'https://source.unsplash.com/featured/800x800?desk-lamp,minimal&sig=1',
      'https://source.unsplash.com/featured/800x800?lamp,workspace&sig=101'
    ],
    stock: 25,
    featured: true,
    tags: ['lighting', 'desk', 'modern', 'LED'],
    specifications: {
      'Material': 'Aluminum',
      'Dimensions': '12" x 6" x 18"',
      'Power': '12W LED',
      'Color Temperature': '2700K - 6500K'
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    _id: '2',
    name: 'Wireless Charging Pad',
    price: 34.99,
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Minimalist design with premium materials.',
    category: {
      _id: 'cat2',
      name: 'Electronics',
      slug: 'electronics'
    },
    images: [
      'https://source.unsplash.com/featured/800x800?wireless-charger,phone&sig=2',
      'https://source.unsplash.com/featured/800x800?charging-pad,desk&sig=102'
    ],
    stock: 50,
    featured: true,
    tags: ['wireless', 'charging', 'electronics', 'Qi'],
    specifications: {
      'Output': '15W Max',
      'Compatibility': 'Qi-enabled devices',
      'Material': 'Premium fabric',
      'Safety': 'Overcharge protection'
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    _id: '3',
    name: 'Minimalist Coffee Table',
    price: 299.99,
    description: 'Clean lines and natural materials define this minimalist coffee table. Perfect centerpiece for modern living rooms.',
    category: {
      _id: 'cat3',
      name: 'Furniture',
      slug: 'furniture'
    },
    images: [
      'https://source.unsplash.com/featured/800x800?coffee-table,minimalist&sig=3',
      'https://source.unsplash.com/featured/800x800?living-room,coffee-table&sig=103'
    ],
    stock: 15,
    featured: true,
    tags: ['furniture', 'table', 'modern', 'minimalist'],
    specifications: {
      'Material': 'Oak wood',
      'Dimensions': '48" x 24" x 16"',
      'Finish': 'Natural oil',
      'Assembly': 'Required'
    },
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  },
  {
    _id: '4',
    name: 'Leather Wallet',
    price: 59.99,
    description: 'Handcrafted leather wallet with RFID protection. Slim profile with multiple card slots and cash compartment.',
    category: {
      _id: 'cat4',
      name: 'Accessories',
      slug: 'accessories'
    },
    images: [
      'https://source.unsplash.com/featured/800x800?leather-wallet,minimal&sig=4',
      'https://source.unsplash.com/featured/800x800?wallet,leather&sig=104'
    ],
    stock: 40,
    featured: false,
    tags: ['wallet', 'leather', 'accessories', 'RFID'],
    specifications: {
      'Material': 'Genuine leather',
      'Dimensions': '4.25" x 3.25" x 0.25"',
      'Card Slots': '8',
      'Features': 'RFID protection'
    },
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08')
  },
  {
    _id: '5',
    name: 'Smart Speaker',
    price: 129.99,
    description: 'Premium smart speaker with exceptional sound quality and voice assistant integration. Minimalist aesthetic.',
    category: {
      _id: 'cat2',
      name: 'Electronics',
      slug: 'electronics'
    },
    images: [
      'https://source.unsplash.com/featured/800x800?smart-speaker,minimal&sig=5',
      'https://source.unsplash.com/featured/800x800?speaker,home-audio&sig=105'
    ],
    stock: 30,
    featured: true,
    tags: ['speaker', 'smart', 'audio', 'voice'],
    specifications: {
      'Power': '20W',
      'Connectivity': 'Wi-Fi, Bluetooth',
      'Voice Assistant': 'Compatible',
      'Dimensions': '6" x 4" x 4"'
    },
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  },
  {
    _id: '6',
    name: 'Minimalist Bookshelf',
    price: 189.99,
    description: 'Floating bookshelf with clean lines and hidden mounting hardware. Perfect for displaying books and decor.',
    category: {
      _id: 'cat3',
      name: 'Furniture',
      slug: 'furniture'
    },
    images: [
      'https://source.unsplash.com/featured/800x800?bookshelf,minimal&sig=6',
      'https://source.unsplash.com/featured/800x800?floating-shelf,books&sig=106'
    ],
    stock: 20,
    featured: false,
    tags: ['bookshelf', 'wall', 'floating', 'storage'],
    specifications: {
      'Material': 'Bamboo',
      'Dimensions': '36" x 8" x 6"',
      'Weight Capacity': '50 lbs',
      'Installation': 'Wall-mounted'
    },
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03')
  },
  {
    _id: '7',
    name: 'Ceramic Vase',
    price: 44.99,
    description: 'Handcrafted ceramic vase with minimalist design. Perfect for fresh flowers or as a standalone decor piece.',
    category: {
      _id: 'cat4',
      name: 'Accessories',
      slug: 'accessories'
    },
    images: [
      'https://source.unsplash.com/featured/800x800?ceramic-vase,minimal&sig=7',
      'https://source.unsplash.com/featured/800x800?vase,home-decor&sig=107'
    ],
    stock: 35,
    featured: false,
    tags: ['vase', 'ceramic', 'decor', 'handmade'],
    specifications: {
      'Material': 'Ceramic',
      'Dimensions': '8" x 4"',
      'Color': 'Matte white',
      'Care': 'Hand wash only'
    },
    createdAt: new Date('2024-01-07'),
    updatedAt: new Date('2024-01-07')
  },
  {
    _id: '8',
    name: 'Floor Lamp',
    price: 149.99,
    description: 'Elegant floor lamp with adjustable arm and warm LED lighting. Creates the perfect ambiance for any room.',
    category: {
      _id: 'cat1',
      name: 'Lighting',
      slug: 'lighting'
    },
    images: [
      'https://source.unsplash.com/featured/800x800?floor-lamp,modern&sig=8',
      'https://source.unsplash.com/featured/800x800?lamp,living-room&sig=108'
    ],
    stock: 18,
    featured: false,
    tags: ['lamp', 'floor', 'lighting', 'modern'],
    specifications: {
      'Height': '64"',
      'Material': 'Metal and fabric',
      'Bulb': 'LED included',
      'Switch': 'Foot pedal'
    },
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-11')
  },
  // Fashion Products
  {
    _id: '9',
    name: 'Classic Leather Jacket',
    price: 189.99,
    description: 'Timeless leather jacket with modern tailoring. Perfect blend of classic style and contemporary comfort.',
    category: {
      _id: 'cat5',
      name: 'Fashion',
      slug: 'fashion'
    },
    images: [
      'https://source.unsplash.com/featured/800x800?leather-jacket,fashion&sig=9',
      'https://source.unsplash.com/featured/800x800?jacket,street-style&sig=109'
    ],
    stock: 25,
    featured: true,
    tags: ['jacket', 'leather', 'fashion', 'classic'],
    specifications: {
      'Material': 'Genuine leather',
      'Fit': 'Regular fit',
      'Care': 'Professional dry clean only',
      'Sizes': 'S, M, L, XL'
    },
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    _id: '10',
    name: 'Designer Sunglasses',
    price: 159.99,
    description: 'Premium sunglasses with UV protection and minimalist frame. Essential accessory for modern style.',
    category: {
      _id: 'cat5',
      name: 'Fashion',
      slug: 'fashion'
    },
    images: [
      'https://source.unsplash.com/featured/800x800?sunglasses,fashion&sig=10',
      'https://source.unsplash.com/featured/800x800?sunglasses,accessories&sig=110'
    ],
    stock: 40,
    featured: true,
    tags: ['sunglasses', 'accessories', 'fashion', 'UV protection'],
    specifications: {
      'Lens': 'Polarized',
      'UV Protection': 'UV400',
      'Frame': 'Acetate',
      'Included': 'Protective case'
    },
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18')
  },
  {
    _id: '11',
    name: 'Minimalist Watch',
    price: 299.99,
    description: 'Clean and sophisticated timepiece with minimalist dial design. Japanese movement with premium materials.',
    category: {
      _id: 'cat5',
      name: 'Fashion',
      slug: 'fashion'
    },
    images: [
      'https://source.unsplash.com/featured/800x800?minimal-watch,watch&sig=11',
      'https://source.unsplash.com/featured/800x800?watch,wristwatch&sig=111'
    ],
    stock: 15,
    featured: true,
    tags: ['watch', 'minimalist', 'japanese', 'timepiece'],
    specifications: {
      'Movement': 'Japanese automatic',
      'Case': 'Stainless steel',
      'Water Resistance': '50m',
      'Crystal': 'Sapphire'
    },
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22')
  },
  {
    _id: '12',
    name: 'Canvas Tote Bag',
    price: 79.99,
    description: 'Durable canvas tote bag with minimalist design. Perfect for daily use and eco-conscious consumers.',
    category: {
      _id: 'cat5',
      name: 'Fashion',
      slug: 'fashion'
    },
    images: [
      'https://source.unsplash.com/featured/800x800?tote-bag,canvas&sig=12',
      'https://source.unsplash.com/featured/800x800?canvas-bag,minimal&sig=112'
    ],
    stock: 30,
    featured: false,
    tags: ['bag', 'tote', 'canvas', 'eco-friendly'],
    specifications: {
      'Material': 'Heavy-duty canvas',
      'Dimensions': '16" x 14" x 6"',
      'Strap': 'Adjustable canvas',
      'Pockets': 'Interior zip pocket'
    },
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  },
  // Additional Furniture
  {
    _id: '13',
    name: 'Modern Office Chair',
    price: 449.99,
    description: 'Ergonomic office chair with breathable mesh back and adjustable height. Designed for all-day comfort.',
    category: {
      _id: 'cat3',
      name: 'Furniture',
      slug: 'furniture'
    },
    images: [
      'https://source.unsplash.com/featured/800x800?office-chair,ergonomic&sig=13',
      'https://source.unsplash.com/featured/800x800?desk-chair,home-office&sig=113'
    ],
    stock: 20,
    featured: true,
    tags: ['chair', 'office', 'ergonomic', 'modern'],
    specifications: {
      'Material': 'Mesh and aluminum',
      'Height Adjustment': 'Yes',
      'Armrests': '3D adjustable',
      'Base': '5-wheel casters'
    },
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14')
  },
  {
    _id: '14',
    name: 'Minimalist Dining Table',
    price: 599.99,
    description: 'Scandinavian-inspired dining table with clean lines and natural wood finish. Seats 6 people comfortably.',
    category: {
      _id: 'cat3',
      name: 'Furniture',
      slug: 'furniture'
    },
    images: [
      'https://source.unsplash.com/featured/800x800?dining-table,wood&sig=14',
      'https://source.unsplash.com/featured/800x800?minimal-dining-room,table&sig=114'
    ],
    stock: 10,
    featured: true,
    tags: ['table', 'dining', 'scandinavian', 'wood'],
    specifications: {
      'Material': 'Solid oak',
      'Dimensions': '72" x 36" x 29"',
      'Seats': '6',
      'Finish': 'Natural oil',
      'Assembly': 'Simple assembly required'
    },
    createdAt: new Date('2024-01-09'),
    updatedAt: new Date('2024-01-09')
  },
  {
    _id: '15',
    name: 'Platform Bed Frame',
    price: 349.99,
    description: 'Minimalist platform bed frame with hidden storage and clean lines. No box spring needed.',
    category: {
      _id: 'cat3',
      name: 'Furniture',
      slug: 'furniture'
    },
    images: [
      'https://source.unsplash.com/featured/800x800?platform-bed,minimal&sig=15',
      'https://source.unsplash.com/featured/800x800?bedroom,bed-frame&sig=115'
    ],
    stock: 12,
    featured: false,
    tags: ['bed', 'platform', 'minimalist', 'storage'],
    specifications: {
      'Material': 'Solid wood',
      'Sizes': 'Twin, Full, Queen, King',
      'Storage': 'Under-bed storage',
      'Foundation': 'Platform design'
    },
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16')
  },
  // Additional Accessories
  {
    _id: '16',
    name: 'Minimalist Backpack',
    price: 89.99,
    description: 'Clean and functional backpack with laptop compartment and hidden pockets. Perfect for work or travel.',
    category: {
      _id: 'cat4',
      name: 'Accessories',
      slug: 'accessories'
    },
    images: [
      'https://source.unsplash.com/featured/800x800?backpack,minimal&sig=16',
      'https://source.unsplash.com/featured/800x800?bag,travel-backpack&sig=116'
    ],
    stock: 35,
    featured: true,
    tags: ['backpack', 'travel', 'work', 'minimalist'],
    specifications: {
      'Material': 'Water-resistant nylon',
      'Laptop Compartment': 'Padded sleeve for 15" laptop',
      'Dimensions': '18" x 12" x 6"',
      'Features': 'Hidden side pockets, water bottle holder'
    },
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17')
  },
  {
    _id: '17',
    name: 'Wireless Earbuds',
    price: 129.99,
    description: 'Premium wireless earbuds with active noise cancellation and crystal-clear sound. Minimalist charging case.',
    category: {
      _id: 'cat4',
      name: 'Accessories',
      slug: 'accessories'
    },
    images: [
      'https://source.unsplash.com/featured/800x800?wireless-earbuds,audio&sig=17',
      'https://source.unsplash.com/featured/800x800?earbuds,headphones&sig=117'
    ],
    stock: 45,
    featured: true,
    tags: ['earbuds', 'wireless', 'audio', 'ANC'],
    specifications: {
      'Battery Life': 'Up to 8 hours',
      'Charging': 'USB-C wireless charging',
      'Connectivity': 'Bluetooth 5.0',
      'Features': 'Active noise cancellation, touch controls'
    },
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-19')
  }
];

const categories = [
  {
    _id: 'cat1',
    name: 'Lighting',
    slug: 'lighting',
    description: 'Modern lighting solutions',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a226e6d23?w=400',
    isActive: true,
    sortOrder: 1
  },
  {
    _id: 'cat2',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Modern electronics and gadgets',
    image: 'https://images.unsplash.com/photo-1498049794561-7b2a4c4d4a6c?w=400',
    isActive: true,
    sortOrder: 2
  },
  {
    _id: 'cat3',
    name: 'Furniture',
    slug: 'furniture',
    description: 'Minimalist furniture for modern living',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    isActive: true,
    sortOrder: 3
  },
  {
    _id: 'cat4',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Everyday accessories and essentials',
    image: 'https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=400',
    isActive: true,
    sortOrder: 4
  },
  {
    _id: 'cat5',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Contemporary fashion and style',
    image: 'https://images.unsplash.com/photo-14419862113-4c4b3e8a9b?w=400',
    isActive: true,
    sortOrder: 5
  }
];

module.exports = {
  products,
  categories
};
