import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import CartPage from "./Pages/CartPage";
import Orders from "./Pages/Orders";
import AuthProvider from "./Context/AuthContext";
import CartProvider from "./Context/CartContext";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}