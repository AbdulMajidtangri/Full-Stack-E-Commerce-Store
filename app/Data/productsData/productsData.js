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
    thumbnail: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg",
    images: [
      "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg",
      "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg",
      "https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg"
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
    thumbnail: "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg",
    images: [
      "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg",
      "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg",
      "https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg"
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
    thumbnail: "https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg",
    images: [
      "https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg",
      "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg",
      "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg"
    ]
  },
  {
    id: 19,
    title: "Sunday Riley Good Genes",
    description: "Lactic acid treatment for radiant complexion",
    price: 85,
    discountPercentage: 11.2,
    rating: 4.5,
    stock: 56,
    brand: "Sunday Riley",
    category: "skincare",
    thumbnail: "https://images.pexels.com/photos/4041391/pexels-photo-4041391.jpeg",
    images: [
      "https://images.pexels.com/photos/4041391/pexels-photo-4041391.jpeg",
      "https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg",
      "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg"
    ]
  },
  {
    id: 20,
    title: "Tatcha The Water Cream",
    description: "Oil-free moisturizer with Japanese nutrients",
    price: 68,
    discountPercentage: 8.7,
    rating: 4.4,
    stock: 81,
    brand: "Tatcha",
    category: "skincare",
    thumbnail: "https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg",
    images: [
      "https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg",
      "https://images.pexels.com/photos/4041391/pexels-photo-4041391.jpeg",
      "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg"
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
    thumbnail: "https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg",
    images: [
      "https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg",
      "https://images.pexels.com/photos/1274760/pexels-photo-1274760.jpeg",
      "https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg"
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
    thumbnail: "https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg",
    images: [
      "https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg",
      "https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg",
      "https://images.pexels.com/photos/1274760/pexels-photo-1274760.jpeg"
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
    thumbnail: "https://images.pexels.com/photos/1274760/pexels-photo-1274760.jpeg",
    images: [
      "https://images.pexels.com/photos/1274760/pexels-photo-1274760.jpeg",
      "https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg",
      "https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg"
    ]
  },
  {
    id: 24,
    title: "Organic Blueberries",
    description: "Fresh organic blueberries packed with antioxidants",
    price: 4.99,
    discountPercentage: 10.5,
    rating: 4.4,
    stock: 67,
    brand: "Berry Fresh",
    category: "groceries",
    thumbnail: "https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg",
    images: [
      "https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg",
      "https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg",
      "https://images.pexels.com/photos/1274760/pexels-photo-1274760.jpeg"
    ]
  },
  {
    id: 25,
    title: "Gourmet Coffee Beans",
    description: "Single-origin coffee beans from Ethiopia",
    price: 16.99,
    discountPercentage: 7.9,
    rating: 4.8,
    stock: 112,
    brand: "Morning Brew",
    category: "groceries",
    thumbnail: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg",
    images: [
      "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg",
      "https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg",
      "https://images.pexels.com/photos/1274760/pexels-photo-1274760.jpeg"
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
    thumbnail: "https://images.pexels.com/photos/4846431/pexels-photo-4846431.jpeg",
    images: [
      "https://images.pexels.com/photos/4846431/pexels-photo-4846431.jpeg",
      "https://images.pexels.com/photos/5824497/pexels-photo-5824497.jpeg",
      "https://images.pexels.com/photos/6311292/pexels-photo-6311292.jpeg"
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
    thumbnail: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/4846431/pexels-photo-4846431.jpeg",
      "https://images.pexels.com/photos/5824497/pexels-photo-5824497.jpeg"
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
    thumbnail: "https://images.pexels.com/photos/5824497/pexels-photo-5824497.jpeg",
    images: [
      "https://images.pexels.com/photos/5824497/pexels-photo-5824497.jpeg",
      "https://images.pexels.com/photos/4846431/pexels-photo-4846431.jpeg",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
    ]
  },
  {
    id: 29,
    title: "Velvet Throw Pillows",
    description: "Set of 3 luxury velvet pillows for sofa decoration",
    price: 65,
    discountPercentage: 20.1,
    rating: 4.4,
    stock: 91,
    brand: "Comfort Living",
    category: "home-decoration",
    thumbnail: "https://images.pexels.com/photos/6311292/pexels-photo-6311292.jpeg",
    images: [
      "https://images.pexels.com/photos/6311292/pexels-photo-6311292.jpeg",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/4846431/pexels-photo-4846431.jpeg"
    ]
  },
  {
    id: 30,
    title: "Geometric Wall Shelf",
    description: "Modern geometric wall shelf for books and decor",
    price: 75,
    discountPercentage: 14.7,
    rating: 4.3,
    stock: 56,
    brand: "Urban Design",
    category: "home-decoration",
    thumbnail: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/6311292/pexels-photo-6311292.jpeg",
      "https://images.pexels.com/photos/5824497/pexels-photo-5824497.jpeg"
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
    thumbnail: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
    images: [
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
      "https://images.pexels.com/photos/6153350/pexels-photo-6153350.jpeg",
      "https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg"
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
    thumbnail: "https://images.pexels.com/photos/1275929/pexels-photo-1275929.jpeg",
    images: [
      "https://images.pexels.com/photos/1275929/pexels-photo-1275929.jpeg",
      "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg",
      "https://images.pexels.com/photos/1714205/pexels-photo-1714205.jpeg"
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
    thumbnail: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg",
    images: [
      "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg",
      "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg",
      "https://images.pexels.com/photos/119550/pexels-photo-119550.jpeg"
    ],
    discountPercentage: 0,
    rating: 4.4,
    brand: "FlexType"
  },
  {
    id: 104,
    title: "Portable Projector Mini",
    description: "Pocket-sized projector for movies, gaming, and presentations on the go",
    benefit: "Turns any wall into a cinema screen",
    price: 189.99,
    stock: 30,
    category: "launched",
    thumbnail: "https://images.pexels.com/photos/2528114/pexels-photo-2528114.jpeg",
    images: [
      "https://images.pexels.com/photos/2528114/pexels-photo-2528114.jpeg",
      "https://images.pexels.com/photos/2528115/pexels-photo-2528115.jpeg",
      "https://images.pexels.com/photos/2528116/pexels-photo-2528116.jpeg"
    ],
    discountPercentage: 0,
    rating: 4.5,
    brand: "PocketBeam"
  },
  {
    id: 105,
    title: "Smart Drone Explorer",
    description: "AI-powered drone with obstacle avoidance and 4K aerial photography",
    benefit: "Capture stunning shots from the sky",
    price: 499.99,
    stock: 8,
    category: "launched",
    thumbnail: "https://images.pexels.com/photos/1043514/pexels-photo-1043514.jpeg",
    images: [
      "https://images.pexels.com/photos/1043514/pexels-photo-1043514.jpeg",
      "https://images.pexels.com/photos/12715956/pexels-photo-12715956.jpeg",
      "https://images.pexels.com/photos/12715957/pexels-photo-12715957.jpeg"
    ],
    discountPercentage: 0,
    rating: 4.9,
    brand: "SkyView"
  },
  {
    id: 106,
    title: "Next-Gen Gaming Mouse",
    description: "High precision optical sensor with customizable RGB lighting",
    benefit: "Enhances gaming accuracy and performance",
    price: 79.99,
    stock: 40,
    category: "launched",
    thumbnail: "https://images.pexels.com/photos/2115217/pexels-photo-2115217.jpeg",
    images: [
      "https://images.pexels.com/photos/2115217/pexels-photo-2115217.jpeg",
      "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg",
      "https://images.pexels.com/photos/1293265/pexels-photo-1293265.jpeg"
    ],
    discountPercentage: 0,
    rating: 4.7,
    brand: "GamePro"
  },
  {
    id: 107,
    title: "Smart Thermostat Pro",
    description: "Automatically adjusts your home temperature based on preferences",
    benefit: "Saves energy and keeps comfort optimized",
    price: 139.99,
    stock: 22,
    category: "launched",
    thumbnail: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
    images: [
      "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
      "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
      "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg"
    ],
    discountPercentage: 0,
    rating: 4.6,
    brand: "HomeComfort"
  },
  {
    id: 108,
    title: "Wireless Earbuds Max",
    description: "Crystal-clear sound with noise isolation and 30-hour battery life",
    benefit: "Perfect for long listening sessions",
    price: 99.99,
    stock: 45,
    category: "launched",
    thumbnail: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg",
    images: [
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg",
      "https://images.pexels.com/photos/1649683/pexels-photo-1649683.jpeg",
      "https://images.pexels.com/photos/1649684/pexels-photo-1649684.jpeg"
    ],
    discountPercentage: 0,
    rating: 4.8,
    brand: "SoundMax"
  },
  {
    id: 109,
    title: "Smart Desk Lamp",
    description: "Adjustable LED lighting with touch control and wireless charging base",
    benefit: "Modern lighting with convenience",
    price: 59.99,
    stock: 33,
    category: "launched",
    thumbnail: "https://images.pexels.com/photos/7031876/pexels-photo-7031876.jpeg",
    images: [
      "https://images.pexels.com/photos/7031876/pexels-photo-7031876.jpeg",
      "https://images.pexels.com/photos/7031877/pexels-photo-7031877.jpeg",
      "https://images.pexels.com/photos/7031878/pexels-photo-7031878.jpeg"
    ],
    discountPercentage: 0,
    rating: 4.5,
    brand: "LumiTech"
  },
  {
    id: 110,
    title: "Virtual Reality Headset",
    description: "Immersive VR experience with 120° field of view and HD resolution",
    benefit: "Brings entertainment to the next level",
    price: 349.99,
    stock: 15,
    category: "launched",
    thumbnail: "https://images.pexels.com/photos/4305275/pexels-photo-4305275.jpeg",
    images: [
      "https://images.pexels.com/photos/4305275/pexels-photo-4305275.jpeg",
      "https://images.pexels.com/photos/4305276/pexels-photo-4305276.jpeg",
      "https://images.pexels.com/photos/4305277/pexels-photo-4305277.jpeg"
    ],
    discountPercentage: 0,
    rating: 4.7,
    brand: "VReality"
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
    thumbnail: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
    images: [
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
      "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
      "https://images.pexels.com/photos/1649683/pexels-photo-1649683.jpeg"
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
    thumbnail: "https://images.pexels.com/photos/1649683/pexels-photo-1649683.jpeg",
    images: [
      "https://images.pexels.com/photos/1649683/pexels-photo-1649683.jpeg",
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg",
      "https://images.pexels.com/photos/1649684/pexels-photo-1649684.jpeg"
    ],
    discountPercentage: 0,
    rating: 4.9,
    brand: "AudioPro"
  },
  {
    id: 203,
    title: "UltraHD 4K Action Camera",
    description: "Capture your adventures with stunning 4K clarity",
    benefits: ["Waterproof up to 30m", "Wi-Fi control", "Stabilized footage"],
    price: 249.99,
    stock: 28,
    category: "featured",
    thumbnail: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",
    images: [
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",
      "https://images.pexels.com/photos/1043514/pexels-photo-1043514.jpeg",
      "https://images.pexels.com/photos/12715956/pexels-photo-12715956.jpeg"
    ],
    discountPercentage: 0,
    rating: 4.7,
    brand: "ActionCam"
  },
  {
    id: 204,
    title: "Ergonomic Wireless Keyboard",
    description: "Comfortable typing experience with durable key switches",
    benefits: ["Rechargeable", "Ergonomic design", "Silent keys"],
    price: 69.99,
    stock: 70,
    category: "featured",
    thumbnail: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg",
    images: [
      "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg",
      "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg",
      "https://images.pexels.com/photos/119550/pexels-photo-119550.jpeg"
    ],
    discountPercentage: 0,
    rating: 4.6,
    brand: "ErgoType"
  },
  {
    id: 205,
    title: "Smart LED Desk Lamp",
    description: "Adjustable color and brightness to match your mood",
    benefits: ["App control", "Energy efficient", "Touch dimmer"],
    price: 59.99,
    stock: 56,
    category: "featured",
    thumbnail: "https://images.pexels.com/photos/7031876/pexels-photo-7031876.jpeg",
    images: [
      "https://images.pexels.com/photos/7031876/pexels-photo-7031876.jpeg",
      "https://images.pexels.com/photos/7031877/pexels-photo-7031877.jpeg",
      "https://images.pexels.com/photos/7031878/pexels-photo-7031878.jpeg"
    ],
    discountPercentage: 0,
    rating: 4.5,
    brand: "LumiSmart"
  },
  {
    id: 206,
    title: "Portable Bluetooth Speaker",
    description: "Compact size with deep bass and 360° sound",
    benefits: ["12-hour playtime", "Splash-proof", "Hands-free calls"],
    price: 89.99,
    stock: 80,
    category: "featured",
    thumbnail: "https://images.pexels.com/photos/1608276/pexels-photo-1608276.jpeg",
    images: [
      "https://images.pexels.com/photos/1608276/pexels-photo-1608276.jpeg",
      "https://images.pexels.com/photos/1608277/pexels-photo-1608277.jpeg",
      "https://images.pexels.com/photos/1608278/pexels-photo-1608278.jpeg"
    ],
    discountPercentage: 0,
    rating: 4.4,
    brand: "SoundSphere"
  },
  {
    id: 207,
    title: "Smart Wi-Fi Plug Mini",
    description: "Control your appliances remotely using voice assistants",
    benefits: ["Alexa/Google compatible", "Energy monitoring", "Timer function"],
    price: 24.99,
    stock: 120,
    category: "featured",
    thumbnail: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
    images: [
      "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
      "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
      "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg"
    ],
    discountPercentage: 0,
    rating: 4.3,
    brand: "SmartPlug"
  },
  {
    id: 208,
    title: "HD Video Doorbell",
    description: "See who's at your door anytime, anywhere",
    benefits: ["Motion detection", "Night vision", "2-way audio"],
    price: 149.99,
    stock: 36,
    category: "featured",
    thumbnail: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
    images: [
      "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
      "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
      "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg"
    ],
    discountPercentage: 0,
    rating: 4.8,
    brand: "SecureView"
  },
  {
    id: 209,
    title: "Smart Home Security Camera",
    description: "Keep your home safe with AI-powered surveillance",
    benefits: ["Cloud storage", "HD night vision", "Motion alerts"],
    price: 179.99,
    stock: 48,
    category: "featured",
    thumbnail: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
    images: [
      "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
      "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
      "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg"
    ],
    discountPercentage: 0,
    rating: 4.7,
    brand: "HomeGuard"
  },
  {
    id: 210,
    title: "Fast Wireless Charger Pad",
    description: "Charge your phone quickly without messy cables",
    benefits: ["15W fast charge", "Non-slip pad", "LED indicator"],
    price: 39.99,
    stock: 95,
    category: "featured",
    thumbnail: "https://images.pexels.com/photos/127025933/pexels-photo-127025933.jpeg",
    images: [
      "https://images.pexels.com/photos/127025933/pexels-photo-127025933.jpeg",
      "https://images.pexels.com/photos/127025934/pexels-photo-127025934.jpeg",
      "https://images.pexels.com/photos/127025935/pexels-photo-127025935.jpeg"
    ],
    discountPercentage: 0,
    rating: 4.6,
    brand: "ChargeFast"
  }
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