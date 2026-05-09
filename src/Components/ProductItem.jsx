import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext"; 

export default function ProductItem({ item }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(item);
  };

  const buyNow = () => {
    const oldOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const newItem = { ...item, qty: 1 };
    const updatedOrders = [...oldOrders, newItem];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    navigate("/orders");
  };

  return (
    <div className="group bg-slate-900/40 rounded-2xl border border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 flex flex-col h-full backdrop-blur-sm relative">
      <div className="relative aspect-[4/3] bg-white p-6 flex items-center justify-center overflow-hidden">
        <img
          className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-500 ease-out"
          src={item.thumbnail}
          alt={item.title}
          loading="lazy"
        />
        {item.discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-lg">
            -{Math.round(item.discountPercentage)}%
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h4 className="font-medium text-slate-200 line-clamp-2 text-base leading-snug group-hover:text-indigo-400 transition-colors">{item.title}</h4>
        </div>
        
        <div className="flex items-end gap-2 mt-auto mb-5">
          <span className="text-2xl font-bold text-white">${item.price}</span>
          {item.discountPercentage > 0 && (
            <span className="text-sm text-slate-500 line-through mb-1">
              ${Math.round(item.price / (1 - item.discountPercentage / 100))}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mt-auto">
          <button 
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2.5 px-3 rounded-xl transition-colors border border-slate-700 flex items-center justify-center gap-2 active:scale-95 text-sm" 
            onClick={handleAddToCart}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add
          </button>

          <button 
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 px-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95 text-sm" 
            onClick={buyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}