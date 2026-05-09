import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  //  Add to Cart with alert
  const addToCart = (item) => {
    const exists = cart.find((p) => p.id === item.id);

    let updated;

    if (exists) {
      updated = cart.map((p) =>
        p.id === item.id ? { ...p, qty: (p.qty || 1) + 1 } : p
      );
    } else {
      updated = [...cart, { ...item, qty: 1 }];
    }

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));

    // 🔔 Alert here
    alert("Item added to cart ✅");
  };

  // ❌ Remove item
  const removeFromCart = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // 🧹 Clear cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // 🛒 Place order
  const placeOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty ❌");
      return;
    }

    const oldOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrders = [...oldOrders, ...cart];

    localStorage.setItem("orders", JSON.stringify(newOrders));

    setCart([]);
    localStorage.removeItem("cart");

    alert("Order placed successfully ");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}