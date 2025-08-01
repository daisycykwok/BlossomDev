import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [justAdded, setJustAdded] = useState(false);

  const addToCart = (product, size, color) => {
    const keyMatch = (item) =>
      item.id === product.id && item.size === size && item.color === color;

    const existingIndex = cartItems.findIndex(keyMatch);

    if (existingIndex !== -1) {
      // If item already exists, increase its quantity
      const updatedItems = [...cartItems];
      updatedItems[existingIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      // New item, set initial quantity to 1
      setCartItems(prev => [...prev, { ...product, size, color, quantity: 1 }]);
    }

    setJustAdded(true);
  };

  const updateQuantity = (product, newQuantity) => {
    const updatedItems = cartItems.map(item => {
      if (
        item.id === product.id &&
        item.size === product.size &&
        item.color === product.color
      ) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const removeFromCart = (product) => {
    const filteredItems = cartItems.filter(
      item =>
        !(item.id === product.id &&
          item.size === product.size &&
          item.color === product.color)
    );
    setCartItems(filteredItems);
  };

  const resetCartMessage = () => setJustAdded(false);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      justAdded,
      resetCartMessage
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
