
// src/product/CategoryPage.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import allProducts from "./productData"; 
import { useCart } from "./CartContext";
import "./ProductStyles.css";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedColor, setSelectedColor] = useState({});

  const filteredProducts = allProducts.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="category-section">
      <h2 className="category-title">{categoryName}</h2>
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>

            <div className="radio-group">
              <strong>Size:</strong>
              {product.sizes.map((size) => (
                <label key={size}>
                  <input
                    type="radio"
                    name={`size-${product.id}`}
                    value={size}
                    checked={selectedSize[product.id] === size}
                    onChange={(e) =>
                      setSelectedSize({ ...selectedSize, [product.id]: e.target.value })
                    }
                  />
                  {size}
                </label>
              ))}
            </div>

            <div className="radio-group">
              <strong>Color:</strong>
              {product.colors.map((color) => (
                <label key={color}>
                  <input
                    type="radio"
                    name={`color-${product.id}`}
                    value={color}
                    checked={selectedColor[product.id] === color}
                    onChange={(e) =>
                      setSelectedColor({ ...selectedColor, [product.id]: e.target.value })
                    }
                  />
                  <span
                    style={{
                      backgroundColor: color.toLowerCase(),
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      display: "inline-block",
                      border: "1px solid #999",
                      marginLeft: 6,
                    }}
                  ></span>
                </label>
              ))}
            </div>

            <button
              className="add-to-cart-btn"
              onClick={() => {
              const size = selectedSize[product.id] || "Small";
              const color = selectedColor[product.id] || "Black";
              addToCart(product, size, color);
             }}

            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;

// client/product/CategoryPage.jsx
// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import allProducts from "./productData"; 
// import { useCart } from "./CartContext";
// import auth from '../lib/auth-helper';  // import auth for modal Add to Cart redirect
// import "./ProductStyles.css";

// const CategoryPage = () => {
//   const { categoryName } = useParams();
//   const navigate = useNavigate();
//   const { addToCart } = useCart();

//   const [selectedSize, setSelectedSize] = useState({});
//   const [selectedColor, setSelectedColor] = useState({});
//   const [quantities, setQuantities] = useState({});
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedQuantity, setSelectedQuantity] = useState({}); // for modal quantity

//   const filteredProducts = allProducts.filter(
//     (p) => p.category.toLowerCase() === categoryName.toLowerCase()
//   );

//   return (
//     <div className="category-section">
//       <h2 className="category-title">{categoryName}</h2>
//       <div className="products-grid">
//         {filteredProducts.map((product) => (
//           <div className="product-card" key={product.id}>
//             {/* Click on image or name to open modal */}
//             <img
//               src={product.image}
//               alt={product.name}
//               className="product-image"
//               onClick={() => setSelectedProduct(product)}
//               style={{ cursor: "pointer" }}
//             />
//             <h3 onClick={() => setSelectedProduct(product)} style={{ cursor: "pointer" }}>
//               {product.name}
//             </h3>

//             <p className="product-short-description">{product.description}</p>

//             <p className="product-price">${product.price.toFixed(2)}</p>

//             <div className="radio-group">
//               <strong>Size:</strong>
//               {product.sizes.map((size) => (
//                 <label key={size}>
//                   <input
//                     type="radio"
//                     name={`size-${product.id}`}
//                     value={size}
//                     checked={selectedSize[product.id] === size}
//                     onChange={(e) =>
//                       setSelectedSize({ ...selectedSize, [product.id]: e.target.value })
//                     }
//                   />
//                   {size}
//                 </label>
//               ))}
//             </div>

//             <div className="radio-group">
//               <strong>Color:</strong>
//               {product.colors.map((color) => (
//                 <label key={color}>
//                   <input
//                     type="radio"
//                     name={`color-${product.id}`}
//                     value={color}
//                     checked={selectedColor[product.id] === color}
//                     onChange={(e) =>
//                       setSelectedColor({ ...selectedColor, [product.id]: e.target.value })
//                     }
//                   />
//                   <span
//                     style={{
//                       backgroundColor: color.toLowerCase(),
//                       width: 18,
//                       height: 18,
//                       borderRadius: "50%",
//                       display: "inline-block",
//                       border: "1px solid #999",
//                       marginLeft: 6,
//                     }}
//                   ></span>
//                 </label>
//               ))}
//             </div>

//             <div className="quantity-input">
//               <strong>Qty:</strong>
//               <input
//                 type="number"
//                 min="1"
//                 value={quantities[product.id] || 1}
//                 onChange={(e) =>
//                   setQuantities({ ...quantities, [product.id]: parseInt(e.target.value) })
//                 }
//               />
//             </div>

//             <button
//               className="add-to-cart-btn"
//               onClick={() => {
//                 const size = selectedSize[product.id] || product.sizes[0];
//                 const color = selectedColor[product.id] || product.colors[0];
//                 const quantity = quantities[product.id] || 1;
//                 addToCart(product, size, color, quantity);
//               }}
//             >
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Product Modal */}
//       {selectedProduct && (
//         <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <img
//               src={selectedProduct.image}
//               alt={selectedProduct.name}
//               className="modal-image"
//             />
//             <h2>{selectedProduct.name}</h2>

//             {/* Full description in modal */}
//             <p className="product-full-description">{selectedProduct.fullDescription}</p>

//             <p className="product-price">Price: ${selectedProduct.price.toFixed(2)}</p>

//             {/* Size */}
//             <div className="product-option">
//               <label><strong>Size:</strong></label>
//               <div className="radio-group">
//                 {selectedProduct.sizes.map((size) => (
//                   <label key={size}>
//                     <input
//                       type="radio"
//                       name={`modal-size-${selectedProduct.id}`}
//                       value={size}
//                       checked={selectedSize[selectedProduct.id] === size}
//                       onChange={(e) =>
//                         setSelectedSize({ ...selectedSize, [selectedProduct.id]: e.target.value })
//                       }
//                     />
//                     {size}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Color */}
//             <div className="product-option">
//               <label><strong>Color:</strong></label>
//               <div className="radio-group">
//                 {selectedProduct.colors.map((color) => (
//                   <label key={color}>
//                     <input
//                       type="radio"
//                       name={`modal-color-${selectedProduct.id}`}
//                       value={color}
//                       checked={selectedColor[selectedProduct.id] === color}
//                       onChange={(e) =>
//                         setSelectedColor({ ...selectedColor, [selectedProduct.id]: e.target.value })
//                       }
//                     />
//                     <span
//                       className="color-dot"
//                       style={{ backgroundColor: color.toLowerCase() }}
//                     ></span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Quantity */}
//             <div className="product-option">
//               <label><strong>Qty:</strong></label>
//               <div className="radio-group">
//                 <input
//                   type="number"
//                   min="1"
//                   value={selectedQuantity[selectedProduct.id] || 1}
//                   onChange={(e) =>
//                     setSelectedQuantity({
//                       ...selectedQuantity,
//                       [selectedProduct.id]: parseInt(e.target.value),
//                     })
//                   }
//                 />
//               </div>
//             </div>

//             {/* Add to Cart from Modal */}
//             <button
//               className="add-to-cart-btn"
//               onClick={() => {
//                 if (!auth.isAuthenticated()) {
//                   navigate("/signin", {
//                     state: {
//                       redirectTo: "/products",
//                       pendingProduct: selectedProduct,
//                       selectedSize: selectedSize[selectedProduct.id],
//                       selectedColor: selectedColor[selectedProduct.id],
//                     },
//                   });
//                 } else {
//                   addToCart(
//                     selectedProduct,
//                     selectedSize[selectedProduct.id],
//                     selectedColor[selectedProduct.id],
//                     selectedQuantity[selectedProduct.id] || 1
//                   );
//                   setSelectedProduct(null); // close modal on add
//                 }
//               }}
//             >
//               Add to Cart
//             </button>

//             <button onClick={() => setSelectedProduct(null)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoryPage;

