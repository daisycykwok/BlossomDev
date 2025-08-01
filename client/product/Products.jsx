// Products.jsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import auth from '../lib/auth-helper';
import Footer from "../components/Footer";
import { useCart } from "./CartContext";
import "./ProductStyles.css";
import Snackbar from '@mui/material/Snackbar';

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
    shortDescription: "Comfortable cotton t-shirt",
    fullDescription: "Comfortable cotton t-shirt, crafted from 100% breathable cotton for all-day wear. Perfect for layering or wearing solo during warmer months.",
    price: 20,
    sizes: ["S", "M", "L"],
    colors: ["Black", "White", "Blue", "Pink"],
    category: "T-Shirts",
    image: tshirtImage,
  },
  {
    id: 2,
    name: "Hoodie",
    shortDescription: "Warm and cozy hoodie",
    fullDescription: "Warm and cozy hoodie made from ultra-soft fleece lining, ideal for chilly evenings or casual streetwear looks. Breathable and designed for everyday comfort.",
    price: 40,
    sizes: ["S", "M", "L"],
    colors: ["Black", "White", "Blue", "Pink"],
    category: "Jackets",
    image: hoodieImage,
  },
  {
    id: 3,
    name: "Cargo Pants",
    shortDescription: "Durable cargo pants",
    fullDescription: "Durable cargo pants made with reinforced stitching and stretch fabric for flexibility. Designed for utility and comfort with multiple deep pockets.",
    price: 35,
    sizes: ["S", "M", "L"],
    colors: ["Black", "White", "Blue", "Pink"],
    category: "Pants",
    image: cargoImage,
  },
  {
    id: 4,
    name: "Baseball Cap",
    shortDescription: "Stylish cotton cap",
    fullDescription: "Stylish cotton cap with adjustable strap for a perfect fit. Lightweight and breathable, ideal for sunny days and sporty looks.",
    price: 15,
    sizes: ["S", "M", "L"],
    colors: ["Black", "White", "Blue", "Pink"],
    category: "Accessories",
    image: baseballImage,
  },
  {
    id: 5,
    name: "Denim Jacket",
    shortDescription: "Classic blue denim",
    fullDescription: "Classic blue denim jacket with a vintage wash and modern fit. Versatile layering piece suitable for all seasons with reinforced seams for durability.",
    price: 60,
    sizes: ["S", "M", "L"],
    colors: ["Black", "White", "Blue", "Pink"],
    category: "Jackets",
    image: denimImage,
  },
  {
    id: 6,
    name: "Sneakers",
    shortDescription: "Comfy and casual footwear",
    fullDescription: "Comfy and casual sneakers with cushioned soles for all-day comfort. Designed for versatility — whether you're walking, running errands, or relaxing.",
    price: 75,
    sizes: ["S", "M", "L"],
    colors: ["Black", "White", "Blue", "Pink"],
    category: "Shoes",
    image: sneakerImage,
  },
  {
    id: 7,
    name: "Scarf",
    shortDescription: "Soft woolen scarf",
    fullDescription: "Soft woolen scarf spun from premium fibers to keep you warm in the coldest weather. Stylish and cozy with a unisex appeal.",
    price: 25,
    sizes: ["S", "M", "L"],
    colors: ["Black", "White", "Blue", "Pink"],
    category: "Accessories",
    image: hoodieImage,
  },
  {
    id: 8,
    name: "Track Pants",
    shortDescription: "Athletic fit joggers",
    fullDescription: "Athletic fit joggers with elastic waistband and tapered legs. Perfect for workouts or lounging, made from lightweight performance fabric.",
    price: 30,
    sizes: ["S", "M", "L"],
    colors: ["Black", "White", "Blue", "Pink"],
    category: "Pants",
    image: trackpantsImage,
  },
  {
    id: 9,
    name: "Beanie",
    shortDescription: "Warm knit beanie",
    fullDescription: "Warm knit beanie crafted from premium yarn for maximum heat retention. Stretchable and snug — great for winter or casual streetwear.",
    price: 18,
    sizes: ["S", "M", "L"],
    colors: ["Black", "White", "Blue", "Pink"],
    category: "Accessories",
    image: beanieImage,
  },
];

const ProductsPage = () => {
  const navigate = useNavigate();
  const { justAdded, resetCartMessage, addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  const [selectedQuantity, setSelectedQuantity] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ["T-Shirts", "Pants", "Shoes", "Jackets", "Accessories"];

  return (
    <div className="products-page">
      {categories.map((category) => (
        <div key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <div className="products-grid">
            {products
              .filter((product) => product.category === category)
              .map((product) => (
                <div className="product-card" key={product.id}>
                  <img
                    src={product.image}
                    alt={product.name}
                    onClick={() => setSelectedProduct(product)}
                    className="product-image"
                  />
                  <h3>{product.name}</h3>
                  <p>{product.shortDescription}</p>
                  <div className="product-price">${product.price.toFixed(2)}</div>

                  <div className="product-options">
                    <div className="product-option">
                      <label><strong>Size:</strong></label>
                      <div className="radio-group">
                        {product.sizes.map((size) => (
                          <label key={size}>
                            <input
                              type="radio"
                              name={`size-${product.id}`}
                              value={size}
                              checked={selectedSize[product.id] === size}
                              onChange={(e) => setSelectedSize({ ...selectedSize, [product.id]: e.target.value })}
                            />
                            {size}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="product-option">
                      <label><strong>Color:</strong></label>
                      <div className="radio-group">
                        {product.colors.map((color) => (
                          <label key={color}>
                            <input
                              type="radio"
                              name={`color-${product.id}`}
                              value={color}
                              checked={selectedColor[product.id] === color}
                              onChange={(e) => setSelectedColor({ ...selectedColor, [product.id]: e.target.value })}
                            />
                            <span className="color-dot" style={{ backgroundColor: color.toLowerCase() }}></span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="product-option">
                      <label><strong>Qty:</strong></label>
                      <input
                        type="number"
                        min="1"
                        value={selectedQuantity[product.id] || 1}
                        onChange={(e) =>
                          setSelectedQuantity({ ...selectedQuantity, [product.id]: parseInt(e.target.value) })
                        }
                      />
                    </div>
                  </div>

                  <button
                    className="add-to-cart-btn"
                    onClick={() => {
                      if (!auth.isAuthenticated()) {
                        navigate("/signin", {
                          state: {
                            redirectTo: "/products",
                            pendingProduct: product,
                            selectedSize: selectedSize[product.id],
                            selectedColor: selectedColor[product.id],
                          },
                        });
                      } else {
                        addToCart(
                          product,
                          selectedSize[product.id],
                          selectedColor[product.id],
                          selectedQuantity[product.id] || 1
                        );
                      }
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="modal-image" />
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.fullDescription}</p>
            <p className="product-price">Price: ${selectedProduct.price.toFixed(2)}</p>

            {/* Modal Options */}
            {/* Reuse same handlers and state */}
            {/* Size */}
            <div className="product-option">
              <label><strong>Size:</strong></label>
              <div className="radio-group">
                {selectedProduct.sizes.map((size) => (
                  <label key={size}>
                    <input
                      type="radio"
                      name={`modal-size-${selectedProduct.id}`}
                      value={size}
                      checked={selectedSize[selectedProduct.id] === size}
                      onChange={(e) => setSelectedSize({ ...selectedSize, [selectedProduct.id]: e.target.value })}
                    />
                    {size}
                  </label>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="product-option">
              <label><strong>Color:</strong></label>
              <div className="radio-group">
                {selectedProduct.colors.map((color) => (
                  <label key={color}>
                    <input
                      type="radio"
                      name={`modal-color-${selectedProduct.id}`}
                      value={color}
                      checked={selectedColor[selectedProduct.id] === color}
                      onChange={(e) => setSelectedColor({ ...selectedColor, [selectedProduct.id]: e.target.value })}
                    />
                    <span className="color-dot" style={{ backgroundColor: color.toLowerCase() }}></span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="product-option">
              <label><strong>Qty:</strong></label>
              <input
                type="number"
                min="1"
                value={selectedQuantity[selectedProduct.id] || 1}
                onChange={(e) =>
                  setSelectedQuantity({ ...selectedQuantity, [selectedProduct.id]: parseInt(e.target.value) })
                }
              />
            </div>

            <button
              className="add-to-cart-btn"
              onClick={() => {
                if (!auth.isAuthenticated()) {
                  navigate("/signin", {
                    state: {
                      redirectTo: "/products",
                      pendingProduct: selectedProduct,
                      selectedSize: selectedSize[selectedProduct.id],
                      selectedColor: selectedColor[selectedProduct.id],
                    },
                  });
                } else {
                  addToCart(
                    selectedProduct,
                    selectedSize[selectedProduct.id],
                    selectedColor[selectedProduct.id],
                    selectedQuantity[selectedProduct.id] || 1
                  );
                  setSelectedProduct(null);
                }
              }}
            >
              Add to Cart
            </button>
            <button className="close-modal-btn" onClick={() => setSelectedProduct(null)}>Close</button>
          </div>
        </div>
      )}

      <Snackbar
        open={justAdded}
        autoHideDuration={3000}
        onClose={resetCartMessage}
        message="Added to cart successfully"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
      <Footer />
    </div>
  );
};

export default ProductsPage;
