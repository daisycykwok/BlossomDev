// client/product/productData.js
import tshirtImage from "../assets/images/tshirt.png";
import hoodieImage from "../assets/images/hoodie.png";
import cargoImage from "../assets/images/cargo.png";
import denimImage from "../assets/images/denimjacket.png";
import baseballImage from "../assets/images/baseball.png";
import sneakerImage from "../assets/images/sneaker.png";
import beanieImage from "../assets/images/beanie.png";
import trackpantsImage from "../assets/images/trackpants.png";

const products = [
  {
    id: 1,
    name: "T-Shirt",
    description: "Comfortable cotton t-shirt",
    fullDescription: "Comfortable cotton t-shirt made from 100% breathable organic cotton. Perfect for everyday wear, it's soft on the skin and built to last through countless washes.",
    price: 20,
    sizes: ["S", "M", "L"],
    colors: ["Black", "White", "Blue", "Pink"],
    category: "T-Shirts",
    image: tshirtImage
  },
  {
    id: 2,
    name: "Hoodie",
    description: "Warm and cozy hoodie",
    fullDescription: "Warm and cozy hoodie crafted from ultra-soft fleece, lined with a smooth interior for comfort. Ideal for chilly days and evenings, with a stylish modern fit.",
    price: 40,
    sizes: ["S", "M", "L"],
    colors: ["Black", "White", "Blue", "Pink"],
    category: "Jackets",
    image: hoodieImage
  },
  {
    id: 3,
    name: "Cargo Pants",
    description: "Durable cargo pants",
    fullDescription: "Durable cargo pants designed for both style and function. Features reinforced stitching, multiple utility pockets, and a rugged look suited for any adventure.",
    price: 35,
    sizes: ["S", "M", "L"],
    colors: ["Black", "White", "Blue", "Pink"],
    category: "Pants",
    image: cargoImage
  },
  {
    id: 4,
    name: "Baseball Cap",
    description: "Stylish cotton cap",
    fullDescription: "Stylish cotton cap with an adjustable strap and curved brim. Lightweight, breathable, and designed to protect you from the sun while elevating your look.",
    price: 15,
    sizes: ["S", "M", "L"],
    colors: ["Black", "White", "Blue", "Pink"],
    category: "Accessories",
    image: baseballImage
  },
  {
    id: 5,
    name: "Denim Jacket",
    description: "Classic blue denim",
    fullDescription: "Classic blue denim jacket with a vintage wash. This timeless piece features metal buttons, deep pockets, and a structured fit that's great year-round.",
    price: 60,
    sizes: ["S", "M", "L"],
    colors: ["Black", "White", "Blue", "Pink"],
    category: "Jackets",
    image: denimImage
  },
  {
    id: 6,
    name: "Sneakers",
    description: "Comfy and casual footwear",
    fullDescription: "Comfy and casual footwear made with breathable mesh and memory foam soles. Engineered for all-day wear, whether you're walking around town or hitting the gym.",
    price: 75,
    sizes: ["S", "M", "L"],
    colors: ["Black", "White", "Blue", "Pink"],
    category: "Shoes",
    image: sneakerImage
  },
  {
    id: 7,
    name: "Scarf",
    description: "Soft woolen scarf",
    fullDescription: "Soft woolen scarf made from premium Merino wool. Keeps you warm without the itch, and pairs well with both casual and formal winter outfits.",
    price: 25,
    sizes: ["S", "M", "L"],
    colors: ["Black", "White", "Blue", "Pink"],
    category: "Accessories",
    image: hoodieImage
  },
  {
    id: 8,
    name: "Track Pants",
    description: "Athletic fit joggers",
    fullDescription: "Athletic fit joggers with a tapered leg and elastic cuffs. Made from moisture-wicking fabric, perfect for workouts, lounging, or casual streetwear.",
    price: 30,
    sizes: ["S", "M", "L"],
    colors: ["Black", "White", "Blue", "Pink"],
    category: "Pants",
    image: trackpantsImage
  },
  {
    id: 9,
    name: "Beanie",
    description: "Warm knit beanie",
    fullDescription: "Warm knit beanie crafted from soft acrylic yarn. Designed to retain heat and provide comfort during the coldest months without compromising on style.",
    price: 18,
    sizes: ["S", "M", "L"],
    colors: ["Black", "White", "Blue", "Pink"],
    category: "Accessories",
    image: beanieImage
  }
];

export default products;
