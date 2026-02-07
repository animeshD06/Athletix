// Athletix Product Data

export const categories = [
  {
    id: 'gym-fitness',
    name: 'Gym & Fitness',
    slug: 'gym-fitness',
    description: 'Premium equipment for your workout sessions',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    icon: '🏋️'
  },
  {
    id: 'cricket',
    name: 'Cricket',
    slug: 'cricket',
    description: 'Professional cricket gear for champions',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop',
    icon: '🏏'
  },
  {
    id: 'football',
    name: 'Football',
    slug: 'football',
    description: 'Top-quality football equipment',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop',
    icon: '⚽'
  },
  {
    id: 'running',
    name: 'Running',
    slug: 'running',
    description: 'Gear built for speed and endurance',
    image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=300&fit=crop',
    icon: '🏃'
  },
  {
    id: 'sportswear',
    name: 'Sportswear',
    slug: 'sportswear',
    description: 'Stylish and comfortable athletic apparel',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop',
    icon: '👕'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Essential sports accessories',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=300&fit=crop',
    icon: '🎒'
  }
];

export const brands = [
  'Athletix Pro',
  'Nike',
  'Adidas',
  'Puma',
  'Under Armour',
  'Reebok',
  'New Balance',
  'ASICS'
];

export const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
export const shoeSizes = ['6', '7', '8', '9', '10', '11', '12'];
export const colors = [
  { name: 'Black', hex: '#0a0a0a' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Red', hex: '#e63946' },
  { name: 'Navy', hex: '#1b263b' },
  { name: 'Grey', hex: '#6c757d' },
  { name: 'Green', hex: '#10b981' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Orange', hex: '#f59e0b' }
];

export const products = [
  // Gym & Fitness Products
  {
    id: 1,
    name: 'Pro Series Dumbbells Set',
    slug: 'pro-series-dumbbells-set',
    category: 'gym-fitness',
    brand: 'Athletix Pro',
    price: 12999,
    originalPrice: 15999,
    discount: 19,
    rating: 4.8,
    reviews: 245,
    inStock: true,
    isNew: false,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=600&fit=crop'
    ],
    colors: ['Black', 'Grey'],
    sizes: [],
    description: 'Professional-grade rubber hex dumbbells designed for serious athletes. Features ergonomic handles with anti-slip grip and durable rubber coating for floor protection.',
    specifications: {
      'Weight Range': '5kg - 25kg',
      'Material': 'Cast Iron with Rubber Coating',
      'Handle': 'Chrome Knurled',
      'Warranty': '2 Years'
    },
    features: [
      'Anti-roll design',
      'Ergonomic grip handle',
      'Durable rubber coating',
      'Floor-safe construction'
    ]
  },
  {
    id: 2,
    name: 'Elite Training Bench',
    slug: 'elite-training-bench',
    category: 'gym-fitness',
    brand: 'Athletix Pro',
    price: 8499,
    originalPrice: 10999,
    discount: 23,
    rating: 4.7,
    reviews: 189,
    inStock: true,
    isNew: true,
    isBestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=600&h=600&fit=crop'
    ],
    colors: ['Black'],
    sizes: [],
    description: 'Adjustable weight bench with 7 incline positions. Heavy-duty steel frame supports up to 300kg.',
    specifications: {
      'Weight Capacity': '300kg',
      'Positions': '7 Adjustable',
      'Frame': 'Heavy-duty Steel',
      'Padding': 'High-density Foam'
    },
    features: [
      '7 adjustable positions',
      'Heavy-duty steel frame',
      'Foldable design',
      'Transport wheels'
    ]
  },
  {
    id: 3,
    name: 'Resistance Bands Pro Set',
    slug: 'resistance-bands-pro-set',
    category: 'gym-fitness',
    brand: 'Athletix Pro',
    price: 1299,
    originalPrice: 1799,
    discount: 28,
    rating: 4.6,
    reviews: 423,
    inStock: true,
    isNew: false,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&h=600&fit=crop'
    ],
    colors: ['Multi'],
    sizes: [],
    description: 'Complete set of 5 resistance bands with different tension levels. Perfect for home workouts and rehabilitation.',
    specifications: {
      'Resistance Levels': '5 Levels (5-50 lbs)',
      'Material': 'Natural Latex',
      'Includes': 'Door Anchor, Handles, Ankle Straps'
    },
    features: [
      '5 resistance levels',
      'Premium latex material',
      'Complete accessory kit',
      'Carry bag included'
    ]
  },
  {
    id: 4,
    name: 'Smart Fitness Tracker Pro',
    slug: 'smart-fitness-tracker-pro',
    category: 'gym-fitness',
    brand: 'Athletix Pro',
    price: 4999,
    originalPrice: 6999,
    discount: 29,
    rating: 4.5,
    reviews: 567,
    inStock: true,
    isNew: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&h=600&fit=crop'
    ],
    colors: ['Black', 'White', 'Red'],
    sizes: [],
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and 30+ workout modes.',
    specifications: {
      'Display': '1.4" AMOLED',
      'Battery': '14 Days',
      'Water Resistance': '5 ATM',
      'Sensors': 'Heart Rate, SpO2, GPS'
    },
    features: [
      'Heart rate monitoring',
      'Built-in GPS',
      '30+ workout modes',
      'Sleep tracking'
    ]
  },
  
  // Cricket Products
  {
    id: 5,
    name: 'Pro Player Cricket Bat',
    slug: 'pro-player-cricket-bat',
    category: 'cricket',
    brand: 'Athletix Pro',
    price: 7999,
    originalPrice: 9999,
    discount: 20,
    rating: 4.9,
    reviews: 312,
    inStock: true,
    isNew: false,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=600&fit=crop'
    ],
    colors: ['Natural'],
    sizes: ['SH', 'LH'],
    description: 'English willow cricket bat with premium grade wood and traditional handle.',
    specifications: {
      'Willow': 'Grade 1 English',
      'Weight': '1180-1230g',
      'Handle': 'Singapore Cane',
      'Sweet Spot': 'Mid-Low'
    },
    features: [
      'Grade 1 English willow',
      'Premium cane handle',
      'Optimal pickup weight',
      'Professional grade'
    ]
  },
  {
    id: 6,
    name: 'Premium Cricket Kit Bag',
    slug: 'premium-cricket-kit-bag',
    category: 'cricket',
    brand: 'Athletix Pro',
    price: 3499,
    originalPrice: 4499,
    discount: 22,
    rating: 4.6,
    reviews: 178,
    inStock: true,
    isNew: false,
    isBestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1578764359017-d93a3ffcc2c1?w=600&h=600&fit=crop'
    ],
    colors: ['Black', 'Navy'],
    sizes: [],
    description: 'Large capacity cricket kit bag with wheels and multiple compartments.',
    specifications: {
      'Capacity': '100 Liters',
      'Material': 'Heavy-duty Polyester',
      'Wheels': 'All-terrain',
      'Compartments': '6 Separate'
    },
    features: [
      'Heavy-duty wheels',
      'Padded shoulder straps',
      'Separate bat compartment',
      'Ventilated shoe pocket'
    ]
  },
  {
    id: 7,
    name: 'Professional Cricket Helmet',
    slug: 'professional-cricket-helmet',
    category: 'cricket',
    brand: 'Athletix Pro',
    price: 2999,
    originalPrice: 3999,
    discount: 25,
    rating: 4.8,
    reviews: 234,
    inStock: true,
    isNew: true,
    isBestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&h=600&fit=crop'
    ],
    colors: ['Navy', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'ICB certified cricket helmet with titanium grille and premium padding.',
    specifications: {
      'Certification': 'ICC Approved',
      'Grille': 'Titanium',
      'Padding': 'High-density Foam',
      'Ventilation': 'Multi-zone'
    },
    features: [
      'ICC certified',
      'Titanium face guard',
      'Adjustable chin strap',
      'Excellent ventilation'
    ]
  },
  
  // Football Products
  {
    id: 8,
    name: 'Match Pro Football',
    slug: 'match-pro-football',
    category: 'football',
    brand: 'Athletix Pro',
    price: 1999,
    originalPrice: 2499,
    discount: 20,
    rating: 4.7,
    reviews: 456,
    inStock: true,
    isNew: false,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=600&h=600&fit=crop'
    ],
    colors: ['White', 'Orange'],
    sizes: ['4', '5'],
    description: 'FIFA Quality Pro certified match ball with thermal bonded panels.',
    specifications: {
      'Certification': 'FIFA Quality Pro',
      'Panels': '32 Thermal Bonded',
      'Material': 'Polyurethane',
      'Bladder': 'Latex'
    },
    features: [
      'FIFA certified',
      'Thermal bonded panels',
      'Excellent flight stability',
      'All-weather surface'
    ]
  },
  {
    id: 9,
    name: 'Speedster Football Boots',
    slug: 'speedster-football-boots',
    category: 'football',
    brand: 'Athletix Pro',
    price: 5999,
    originalPrice: 7999,
    discount: 25,
    rating: 4.8,
    reviews: 289,
    inStock: true,
    isNew: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=600&h=600&fit=crop'
    ],
    colors: ['Black', 'Red', 'White'],
    sizes: ['7', '8', '9', '10', '11'],
    description: 'Lightweight speed boots with firm ground studs for maximum acceleration.',
    specifications: {
      'Upper': 'Synthetic Mesh',
      'Soleplate': 'Nylon TPU',
      'Studs': 'Conical/Blade Mix',
      'Weight': '195g'
    },
    features: [
      'Ultralight construction',
      'Speed-focused design',
      'Adaptive fit system',
      'Multi-stud configuration'
    ]
  },
  {
    id: 10,
    name: 'Goalkeeper Gloves Pro',
    slug: 'goalkeeper-gloves-pro',
    category: 'football',
    brand: 'Athletix Pro',
    price: 2499,
    originalPrice: 3299,
    discount: 24,
    rating: 4.6,
    reviews: 167,
    inStock: true,
    isNew: false,
    isBestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=600&fit=crop'
    ],
    colors: ['Black', 'Orange'],
    sizes: ['7', '8', '9', '10', '11'],
    description: 'Professional goalkeeper gloves with 4mm German latex palm.',
    specifications: {
      'Palm': '4mm German Latex',
      'Backhand': 'Breathable Mesh',
      'Cut': 'Negative Roll',
      'Closure': 'Elastic Bandage'
    },
    features: [
      'Premium German latex',
      'Excellent grip',
      'Finger protection',
      'Breathable design'
    ]
  },
  
  // Running Products
  {
    id: 11,
    name: 'Ultra Boost Running Shoes',
    slug: 'ultra-boost-running-shoes',
    category: 'running',
    brand: 'Athletix Pro',
    price: 8999,
    originalPrice: 12999,
    discount: 31,
    rating: 4.9,
    reviews: 678,
    inStock: true,
    isNew: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop'
    ],
    colors: ['Black', 'White', 'Red', 'Blue'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    description: 'Premium running shoes with responsive cushioning and energy return technology.',
    specifications: {
      'Midsole': 'Boost Technology',
      'Upper': 'Primeknit',
      'Outsole': 'Continental Rubber',
      'Drop': '10mm'
    },
    features: [
      'Energy return technology',
      'Primeknit upper',
      'Continental rubber outsole',
      'Torsion system'
    ]
  },
  {
    id: 12,
    name: 'Performance Running Vest',
    slug: 'performance-running-vest',
    category: 'running',
    brand: 'Athletix Pro',
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    rating: 4.5,
    reviews: 234,
    inStock: true,
    isNew: false,
    isBestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=600&fit=crop'
    ],
    colors: ['Black', 'Grey', 'Orange'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Lightweight hydration vest with 2L capacity for long-distance running.',
    specifications: {
      'Capacity': '2L Hydration + 5L Storage',
      'Material': 'Ripstop Nylon',
      'Weight': '185g (empty)',
      'Pockets': '8 Multi-purpose'
    },
    features: [
      'Front water bottle pockets',
      'Adjustable chest straps',
      'Reflective details',
      'Phone pocket'
    ]
  },
  {
    id: 13,
    name: 'Marathon Compression Socks',
    slug: 'marathon-compression-socks',
    category: 'running',
    brand: 'Athletix Pro',
    price: 799,
    originalPrice: 999,
    discount: 20,
    rating: 4.7,
    reviews: 345,
    inStock: true,
    isNew: false,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&h=600&fit=crop'
    ],
    colors: ['Black', 'White', 'Red'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Graduated compression socks for improved circulation and recovery.',
    specifications: {
      'Compression': '15-20 mmHg',
      'Material': 'Moisture-wicking Blend',
      'Length': 'Calf Height',
      'Padding': 'Cushioned Zones'
    },
    features: [
      'Graduated compression',
      'Moisture management',
      'Arch support',
      'Seamless toe'
    ]
  },
  
  // Sportswear Products
  {
    id: 14,
    name: 'Elite Performance Tee',
    slug: 'elite-performance-tee',
    category: 'sportswear',
    brand: 'Athletix Pro',
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    rating: 4.6,
    reviews: 567,
    inStock: true,
    isNew: false,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop'
    ],
    colors: ['Black', 'White', 'Navy', 'Red', 'Grey'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Premium athletic t-shirt with moisture-wicking technology and 4-way stretch.',
    specifications: {
      'Fabric': '92% Polyester, 8% Elastane',
      'Technology': 'Dri-FIT',
      'Fit': 'Athletic',
      'Care': 'Machine Wash'
    },
    features: [
      'Moisture-wicking',
      '4-way stretch',
      'Anti-odor treatment',
      'Flatlock seams'
    ]
  },
  {
    id: 15,
    name: 'Pro Training Shorts',
    slug: 'pro-training-shorts',
    category: 'sportswear',
    brand: 'Athletix Pro',
    price: 1499,
    originalPrice: 1899,
    discount: 21,
    rating: 4.7,
    reviews: 423,
    inStock: true,
    isNew: true,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=600&fit=crop'
    ],
    colors: ['Black', 'Navy', 'Grey'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Lightweight training shorts with built-in compression liner.',
    specifications: {
      'Outer': '100% Polyester',
      'Liner': 'Compression Fit',
      'Length': '7 inches',
      'Pockets': 'Zip Side Pockets'
    },
    features: [
      'Built-in compression',
      'Secure zip pockets',
      'Quick-dry fabric',
      'Reflective logo'
    ]
  },
  {
    id: 16,
    name: 'Storm Shield Jacket',
    slug: 'storm-shield-jacket',
    category: 'sportswear',
    brand: 'Athletix Pro',
    price: 4999,
    originalPrice: 6499,
    discount: 23,
    rating: 4.8,
    reviews: 289,
    inStock: true,
    isNew: true,
    isBestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop'
    ],
    colors: ['Black', 'Navy', 'Red'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Waterproof and breathable running jacket for all weather conditions.',
    specifications: {
      'Waterproof': '10K Rating',
      'Breathability': '10K Rating',
      'Seams': 'Fully Taped',
      'Hood': 'Adjustable'
    },
    features: [
      'Waterproof 10K',
      'Packable design',
      'Adjustable hood',
      '360° reflectivity'
    ]
  },
  {
    id: 17,
    name: 'Flex Training Leggings',
    slug: 'flex-training-leggings',
    category: 'sportswear',
    brand: 'Athletix Pro',
    price: 2499,
    originalPrice: 2999,
    discount: 17,
    rating: 4.6,
    reviews: 512,
    inStock: true,
    isNew: false,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=600&fit=crop'
    ],
    colors: ['Black', 'Navy', 'Grey'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'High-waisted compression leggings with side pocket and squat-proof fabric.',
    specifications: {
      'Fabric': '78% Nylon, 22% Spandex',
      'Rise': 'High Waist',
      'Compression': 'Medium',
      'Length': 'Full'
    },
    features: [
      'Squat-proof fabric',
      'Side phone pocket',
      'Tummy control waistband',
      'Moisture-wicking'
    ]
  },
  
  // Accessories
  {
    id: 18,
    name: 'Pro Gym Bag',
    slug: 'pro-gym-bag',
    category: 'accessories',
    brand: 'Athletix Pro',
    price: 2999,
    originalPrice: 3999,
    discount: 25,
    rating: 4.7,
    reviews: 334,
    inStock: true,
    isNew: false,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop'
    ],
    colors: ['Black', 'Navy', 'Grey'],
    sizes: [],
    description: 'Spacious gym duffel bag with shoe compartment and wet pocket.',
    specifications: {
      'Capacity': '45 Liters',
      'Material': 'Water-resistant Polyester',
      'Dimensions': '55 x 30 x 28 cm',
      'Compartments': 'Main + Shoe + Wet'
    },
    features: [
      'Separate shoe compartment',
      'Water-resistant',
      'Padded shoulder strap',
      'Ventilated wet pocket'
    ]
  },
  {
    id: 19,
    name: 'Sports Water Bottle 1L',
    slug: 'sports-water-bottle-1l',
    category: 'accessories',
    brand: 'Athletix Pro',
    price: 599,
    originalPrice: 799,
    discount: 25,
    rating: 4.5,
    reviews: 678,
    inStock: true,
    isNew: false,
    isBestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop'
    ],
    colors: ['Black', 'White', 'Red', 'Blue'],
    sizes: [],
    description: 'BPA-free sports bottle with time markings and carry loop.',
    specifications: {
      'Capacity': '1 Liter',
      'Material': 'Tritan BPA-free',
      'Features': 'Time Markings, Flip Lid',
      'Dishwasher': 'Safe'
    },
    features: [
      'BPA-free material',
      'Time markings',
      'Leak-proof lid',
      'Easy carry loop'
    ]
  },
  {
    id: 20,
    name: 'Performance Yoga Mat',
    slug: 'performance-yoga-mat',
    category: 'accessories',
    brand: 'Athletix Pro',
    price: 1999,
    originalPrice: 2499,
    discount: 20,
    rating: 4.8,
    reviews: 423,
    inStock: true,
    isNew: true,
    isBestSeller: false,
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop'
    ],
    colors: ['Black', 'Grey', 'Blue', 'Green'],
    sizes: [],
    description: 'Premium eco-friendly yoga mat with superior grip and cushioning.',
    specifications: {
      'Thickness': '6mm',
      'Material': 'Natural Rubber + TPE',
      'Dimensions': '183 x 68 cm',
      'Weight': '2.5 kg'
    },
    features: [
      'Eco-friendly materials',
      'Non-slip surface',
      'Alignment markings',
      'Carry strap included'
    ]
  }
];

export const reviews = [
  {
    id: 1,
    name: 'Rahul Sharma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5,
    date: '2024-01-15',
    title: 'Best sports gear I\'ve ever bought!',
    comment: 'The quality of Athletix products is unmatched. I\'ve been using their gym equipment for 6 months now and it still feels brand new. Highly recommend!',
    verified: true
  },
  {
    id: 2,
    name: 'Priya Patel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 5,
    date: '2024-01-12',
    title: 'Amazing running shoes!',
    comment: 'The Ultra Boost shoes gave me the perfect support during my marathon training. The cushioning is incredible and my feet never hurt after long runs.',
    verified: true
  },
  {
    id: 3,
    name: 'Amit Kumar',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    rating: 4,
    date: '2024-01-10',
    title: 'Great cricket bat',
    comment: 'Excellent pickup and power. The English willow quality is premium. Could improve the packaging though.',
    verified: true
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    rating: 5,
    date: '2024-01-08',
    title: 'Perfect sportswear',
    comment: 'The fit is perfect and the fabric quality is amazing. I love how the moisture-wicking works during intense workouts. Will buy more!',
    verified: true
  }
];

export const bannerSlides = [
  {
    id: 1,
    title: 'Train Hard.',
    subtitle: 'Play Strong.',
    highlight: 'Perform Better.',
    description: 'Discover premium sports gear designed for champions',
    cta: 'Shop Now',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920&h=1080&fit=crop',
    category: 'all'
  },
  {
    id: 2,
    title: 'New Season',
    subtitle: 'Running Collection',
    highlight: 'Up to 40% Off',
    description: 'Gear up with the latest running essentials',
    cta: 'Explore Running',
    image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=1920&h=1080&fit=crop',
    category: 'running'
  },
  {
    id: 3,
    title: 'Cricket Season',
    subtitle: 'Pro Equipment',
    highlight: 'Just Arrived',
    description: 'Professional cricket gear for serious players',
    cta: 'Shop Cricket',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1920&h=1080&fit=crop',
    category: 'cricket'
  }
];

// Helper functions
export const getProductById = (id) => products.find(p => p.id === parseInt(id));
export const getProductBySlug = (slug) => products.find(p => p.slug === slug);
export const getProductsByCategory = (category) => products.filter(p => p.category === category);
export const getBestSellers = () => products.filter(p => p.isBestSeller);
export const getNewArrivals = () => products.filter(p => p.isNew);
export const getCategoryBySlug = (slug) => categories.find(c => c.slug === slug);

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

export const calculateDiscount = (originalPrice, discount) => {
  return Math.round(originalPrice - (originalPrice * discount / 100));
};
