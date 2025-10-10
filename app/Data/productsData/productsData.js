import simg0101 from './smartphonesimages/samertphone01.jpeg';
import simg0102 from './smartphonesimages/smartphone0102.jpg';
import simg0103 from './smartphonesimages/smartphone0103.jpg';
import simg0201 from './smartphonesimages/smartphonesamsung24_0101.jpg';
import simg0202 from './smartphonesimages/smartphonesamsung24_0102.jpg';
import simg0203 from './smartphonesimages/smartphonegooglepixels_0103.jpeg';
import simg0301 from './smartphonesimages/smartphonegooglepixels_0101.jpeg';
import simg0302 from './smartphonesimages/smartphonegooglepixels_0102.jpeg';
import simg0303 from './smartphonesimages/smartphonegooglepixels_0103.jpeg'
import laptopimg01 from './laptop/mac/laptopimg01.jpeg'
import laptopimg02 from './laptop/mac/laptopimg02.jpeg'
import laptopimg03 from './laptop/mac/laptopimg03.jpeg'
import laptopimg0201 from './laptop/dell/laptopdellxps501.jpeg'
import laptopimg0202 from './laptop/dell/laptopdellxps502.jpeg'
import laptopimg0203 from './laptop/dell/laptopdellxps503.jpeg'
import laptop0301 from './laptop/HP/laptophp01.jpeg'
import laptop0302 from './laptop/HP/laptophp02.jpeg'
import laptop0303 from './laptop/HP/laptophp03.jpeg'
import fragnance0401 from './fragnancec/fragnanve_chule_01.jpeg'
import fragnance0402 from './fragnancec/fragnanve_chule_02.jpeg'
import fragnance0403 from './fragnancec/fragnanve_chule_03.jpeg'
import fragnance0501 from './fragnancec/fragnance_sauvage_02.jpeg'
import fragnance0502 from './fragnancec/fragnance_sauvage_0201.jpeg'
import fragnance0503 from './fragnancec/fragnance_sauvage_0203.jpeg'
import fragnance0601 from './fragnancec/fragnance_tom_ford_extreme.jpeg'
import fragnance0602 from './fragnancec/fragnance_tom_ford_extreme022.jpeg'
import fragnance0603 from './fragnancec/fragnance_tom_ford_extreme03.jpeg'
import fragnance0701 from './fragnancec/fragnancc_creedaventus.jpeg'
import fragnance0702 from './fragnancec/fragnance_creed_aventus02.jpeg'
import fragnance0703 from './fragnancec/fragnance_creed_aventus03.jpeg'
import skincare0100 from './skincaree/skincare_lamaer01.jpeg'
import skincare0101 from './skincaree/skincare_lamaer02.jpeg'
import skincare0102 from './skincaree/skincare_lamaer03.jpeg'
import skincare0200 from './skincaree/skincare_skincuetical01.jpeg'
import skincare0201 from './skincaree/skincare_skincuetical02.jpeg';
import skincare0202 from './skincaree/skincare_skincuetical03.jpeg'
import skincare0300 from './skincaree/skincare_drinkelephant01.jpeg'
import skincare0301 from './skincaree/skincare_drinkelephant02.jpeg'
import skincare0302 from './skincaree/skincare_drinkelephant03.jpeg'
import grocery0101 from './Grocery/grocery_organic_creative01.jpeg'
import grocery0102 from './Grocery/grocery_organic_creative02.jpeg'
import grocery0103 from './Grocery/grocery_organic_creative03.jpeg'
import grocery0201 from './Grocery/grocery_extra_virggin_oil01.jpeg'
import grocery0202 from './Grocery/grocery_extra_virggin_oil02.jpeg'
import grocery0203 from './Grocery/grocery_organic_creative03.jpeg'
import grocery0301 from './Grocery/grocery_artisin00.jpeg'
import grocery0302 from './Grocery/grocery_artisin01.jpeg'
import grocery0303 from './Grocery/grocery_artisin02.jpeg';
import homedecor0101 from './HomeDecor/homedecorceramic01.jpeg'
import homedecor0102 from './HomeDecor/homedecorceramic02.jpeg'
import homedecor0103 from './HomeDecor/homedecorceramic03.jpeg'
import homedecor0201 from './HomeDecor/homescendianart01.jpeg'
import homedecor0202 from './HomeDecor/homescendianart02.jpeg'
import homedecor0203 from './HomeDecor/homescendianart03.jpeg'
import homedecor0301 from './HomeDecor/homedecorlamp01.jpeg'
import homedecor0302 from './HomeDecor/homedecorlamp02.jpeg'
import homedecor0303 from './HomeDecor/homedecorlamp03.jpeg'
import launched0101 from './launchedproduct/launches01.jpeg'
import launched0102 from './launchedproduct/launched0102.jpeg'
import launched0103 from './launchedproduct/launched0103.jpeg'
import launched0201 from './launchedproduct/launched02.jpeg'
import launched0202 from './launchedproduct/launched0202.jpeg'
import launched0203 from './launchedproduct/launched0203.jpeg'
import launched0301 from './launchedproduct/launched03.jpeg'
import launched0302 from './launchedproduct/launched0302.jpeg'
import launched0303 from './launchedproduct/launched0303.jpeg'
import featured0101 from './featured/featured01.jpeg'
import featured0102 from './featured/featured0102.jpeg'
import featured0103 from './featured/featured0103.jpeg'
import feature0201 from './featured/featured02.jpeg'
import feature0202 from './featured/featured0202.jpeg'
import feature0203 from './featured/featured0203.jpeg'

// data/productsData.js
export const productsData = [
  // Smartphones
  {
    id: 1,
    title: "iPhone 15 Pro",
    description: "Latest iPhone with titanium design and powerful A17 Pro chip",
    price: 999,
    discountPercentage: 8.5,
    rating: 4.8,
    stock: 87,
    brand: "Apple",
    category: "smartphones",
    thumbnail: simg0101,
    images: [
      simg0102,
      simg0103
        ]
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra",
    description: "Premium Android phone with advanced AI features and S Pen",
    price: 1299,
    discountPercentage: 12.3,
    rating: 4.7,
    stock: 45,
    brand: "Samsung",
    category: "smartphones",
    thumbnail: simg0201,
    images: [
    simg0202,
     simg0203,
  
    ]
  },
  {
    id: 3,
    title: "Google Pixel 8 Pro",
    description: "AI-powered smartphone with exceptional camera capabilities",
    price: 899,
    discountPercentage: 10.2,
    rating: 4.6,
    stock: 63,
    brand: "Google",
    category: "smartphones",
    thumbnail: simg0301,
    images: [
      simg0302,
      simg0303,
      simg0301
    ]
  },

  // Laptops
  {
    id: 6,
    title: "MacBook Pro 16-inch",
    description: "Professional laptop with M3 Max chip for extreme performance",
    price: 2499,
    discountPercentage: 5.2,
    rating: 4.9,
    stock: 34,
    brand: "Apple",
    category: "laptops",
    thumbnail: laptopimg01,
    images: [
      laptopimg02,
     laptopimg03,
    ]
  },
  {
    id: 7,
    title: "Dell XPS 15",
    description: "Premium Windows laptop with InfinityEdge display",
    price: 1799,
    discountPercentage: 8.7,
    rating: 4.7,
    stock: 56,
    brand: "Dell",
    category: "laptops",
    thumbnail:laptopimg0201,
    images: [
    laptopimg0202  ,
     laptopimg0203,
    ]
  },
  {
    id: 8,
    title: "HP Spectre x360",
    description: "Convertible laptop with OLED display and premium design",
    price: 1499,
    discountPercentage: 11.4,
    rating: 4.6,
    stock: 42,
    brand: "HP",
    category: "laptops",
    thumbnail: laptop0301,
    images: [
     laptop0302,
     laptop0303,
    ]
  },

  // Fragrances
  {
    id: 11,
    title: "Chanel Bleu De",
    description: "Luxury men's fragrance with woody aromatic notes",
    price: 125,
    discountPercentage: 12.5,
    rating: 4.7,
    stock: 89,
    brand: "Chanel",
    category: "fragrances",
    thumbnail: fragnance0401,
    images: [
     fragnance0402,
fragnance0403,
    ]
  },
  {
    id: 12,
    title: "Dior Sauvage",
    description: "Fresh spicy fragrance with amber woody notes",
    price: 110,
    discountPercentage: 8.9,
    rating: 4.8,
    stock: 76,
    brand: "Dior",
    category: "fragrances",
    thumbnail: fragnance0501,
    images: [
     fragnance0502,
fragnance0503,
    ]
  },
  {
    id: 13,
    title: "Tom Ford Noir",
    description: "Oriental fragrance with rich, dark character",
    price: 145,
    discountPercentage: 15.2,
    rating: 4.6,
    stock: 54,
    brand: "Tom Ford",
    category: "fragrances",
    thumbnail: fragnance0601,
    images: [
     fragnance0602,
      fragnance0603,
    ]
  },
  {
    id: 14,
    title: "Creed Aventus",
    description: "Premium fragrance with pineapple and birch notes",
    price: 485,
    discountPercentage: 5.8,
    rating: 4.9,
    stock: 32,
    brand: "Creed",
    category: "fragrances",
    thumbnail: fragnance0701,
    images: [
     fragnance0702,
     fragnance0703,
    ]
  },


  // Skincare
  {
    id: 16,
    title: "La Mer Moisturizing Cream",
    description: "Luxury moisturizer with miracle broth technology",
    price: 185,
    discountPercentage: 7.3,
    rating: 4.8,
    stock: 45,
    brand: "La Mer",
    category: "skincare",
    thumbnail: skincare0100,
    images: [
      skincare0101,
      skincare0102,
    ]
  },
  {
    id: 17,
    title: "Skinceuticals C E Ferulic",
    description: "Antioxidant serum for environmental protection",
    price: 166,
    discountPercentage: 9.1,
    rating: 4.7,
    stock: 38,
    brand: "Skinceuticals",
    category: "skincare",
    thumbnail: skincare0200,
    images: [
     skincare0201,
      skincare0202,
    ]
  },
  {
    id: 18,
    title: "Drunk Elephant Protini",
    description: "Peptide-packed moisturizer for firmness and bounce",
    price: 68,
    discountPercentage: 12.8,
    rating: 4.6,
    stock: 72,
    brand: "Drunk Elephant",
    category: "skincare",
    thumbnail:skincare0300,
    images: [
     skincare0301,
      skincare0302,
    ]
  },


  // Groceries
  {
    id: 21,
    title: "Organic Quinoa 500g",
    description: "Premium organic quinoa packed with protein and fiber",
    price: 8.99,
    discountPercentage: 15.2,
    rating: 4.5,
    stock: 156,
    brand: "Nature's Best",
    category: "groceries",
    thumbnail:grocery0101,
    images: [
      grocery0102,
      grocery0103,
    ]
  },
  {
    id: 22,
    title: "Extra Virgin Olive Oil",
    description: "Cold-pressed olive oil from Italian olives",
    price: 24.99,
    discountPercentage: 12.8,
    rating: 4.7,
    stock: 89,
    brand: "Mediterranean Gold",
    category: "groceries",
    thumbnail: grocery0201,
    images: [
      grocery0202,
      grocery0203,
    ]
  },
  {
    id: 23,
    title: "Artisan Sourdough Bread",
    description: "Handcrafted sourdough with natural fermentation",
    price: 6.50,
    discountPercentage: 8.4,
    rating: 4.6,
    stock: 34,
    brand: "Bread & Butter",
    category: "groceries",
    thumbnail: grocery0301,
    images: [
grocery0302,
    grocery0303,
    ]
  },

  // Home Decoration
  {
    id: 26,
    title: "Modern Ceramic Vase",
    description: "Handcrafted ceramic vase with minimalist design",
    price: 45,
    discountPercentage: 18.6,
    rating: 4.5,
    stock: 78,
    brand: "Home Art",
    category: "home-decoration",
    thumbnail: homedecor0101,
    images: [
      homedecor0102,
      homedecor0103,
    ]
  },
  {
    id: 27,
    title: "Scandinavian Wall Art",
    description: "Abstract wall art with natural wood frame",
    price: 89,
    discountPercentage: 15.3,
    rating: 4.7,
    stock: 45,
    brand: "Nordic Design",
    category: "home-decoration",
    thumbnail:homedecor0201,
    images: [
     homedecor0202,
     homedecor0203
    ]
  },
  {
    id: 28,
    title: "LED Smart Floor Lamp",
    description: "Modern floor lamp with adjustable color temperature",
    price: 120,
    discountPercentage: 12.8,
    rating: 4.6,
    stock: 32,
    brand: "Lumi Home",
    category: "home-decoration",
    thumbnail: homedecor0301,
    images: [
      homedecor0302,
      homedecor0303,
    ]
  },


  // Newly Launched Products
  {
    id: 101,
    title: "AI Personal Assistant Bot",
    description: "Advanced AI assistant that manages your daily tasks and schedules with smart automation",
    benefit: "Boosts productivity using AI-based suggestions",
    price: 249.99,
    stock: 12,
    category: "launched",
    thumbnail:launched0101,
    images: [
      launched0102,
      launched0103,
    ],
    discountPercentage: 0,
    rating: 4.8,
    brand: "TechAI"
  },
  {
    id: 102,
    title: "Smart Glasses 2.0",
    description: "Augmented reality glasses for hands-free navigation and notifications",
    benefit: "Combines style and technology seamlessly",
    price: 299.99,
    stock: 25,
    category: "launched",
    thumbnail: launched0201,
    images: [
      launched0202,
      launched0203,
    ],
    discountPercentage: 0,
    rating: 4.6,
    brand: "VisionTech"
  },
  {
    id: 103,
    title: "Foldable Wireless Keyboard",
    description: "Compact and lightweight keyboard that connects to all your devices via Bluetooth",
    benefit: "Ideal for digital nomads and travelers",
    price: 59.99,
    stock: 50,
    category: "launched",
    thumbnail: launched0301,
    images: [
      launched0302,
      launched0303,
    ],
    discountPercentage: 0,
    rating: 4.4,
    brand: "FlexType"
  },


  // Featured Products
  {
    id: 201,
    title: "Smart Fitness Watch Pro",
    description: "Track your health, workouts, and sleep patterns in real time",
    benefits: ["Heart rate monitor", "Water resistant", "Sleep analysis"],
    price: 129.99,
    stock: 45,
    category: "featured",
    thumbnail:featured0101 ,
    images: [
      featured0102,
     featured0103,
    ],
    discountPercentage: 0,
    rating: 4.8,
    brand: "FitTech"
  },
  {
    id: 202,
    title: "Wireless Noise-Cancelling Headphones",
    description: "Experience immersive sound with long-lasting battery life",
    benefits: ["Active noise cancellation", "40-hour battery", "Comfort fit"],
    price: 199.99,
    stock: 32,
    category: "featured",
    thumbnail: feature0201,
    images: [
      feature0202,
     feature0203,
    ],
    discountPercentage: 0,
    rating: 4.9,
    brand: "AudioPro"
  },

];

// Helper functions to get specific product types
export const getNewlyLaunchedProducts = () => {
  return productsData.filter(product => product.category === "launched");
};

export const getFeaturedProducts = () => {
  return productsData.filter(product => product.category === "featured");
};

export const getProductsByCategory = (category) => {
  return productsData.filter(product => product.category === category);
};

export const getAllCategories = () => {
  const categories = [...new Set(productsData.map(product => product.category))];
  return categories;
};

export default productsData;