
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../Components/ProductList";
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const cartItemsCount = cart?.reduce((acc, item) => acc + item.qty, 0) || 0;

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent cursor-pointer" onClick={() => navigate("/home")}>
                Shivu's<span className="font-light">Store</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/cart")}
                className="relative p-2 text-slate-300 hover:text-white transition-colors flex items-center gap-2 group"
              >
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-slate-950">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:block font-medium">Cart</span>
              </button>

              <button
                onClick={() => navigate("/orders")}
                className="p-2 text-slate-300 hover:text-white transition-colors flex items-center gap-2 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="hidden sm:block font-medium">Orders</span>
              </button>

              <button
                onClick={logout}
                className="ml-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-700 hover:border-slate-600 active:scale-95"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-950 pt-16 pb-24 lg:pt-24 lg:pb-32 space-y-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Extraordinary</span> Products
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-slate-400 mx-auto">
            Upgrade your lifestyle with our curated collection of premium electronics, fashion, and everyday essentials.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-20">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 lg:p-10 shadow-2xl">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
              <p className="text-slate-400 font-medium tracking-wide">Loading exclusive collection...</p>
            </div>
          ) : (
            <ProductList products={products} />
          )}
        </div>
      </main>
    </div>
  );
}
