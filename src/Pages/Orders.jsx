import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(data);
  }, []);

  const clearOrders = () => {
    if (window.confirm("Clear all orders?")) {
      localStorage.removeItem("orders");
      setOrders([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/home')} 
            className="p-2 bg-slate-900 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors border border-slate-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Order History</h2>
          {orders.length > 0 && (
            <button 
              className="ml-auto text-sm text-red-400 hover:text-red-300 font-medium px-4 py-2 rounded-lg bg-red-400/10 hover:bg-red-400/20 transition-colors" 
              onClick={clearOrders}
            >
              Clear History
            </button>
          )}
        </div>

        {orders.length === 0 ? (
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-12 text-center shadow-2xl">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-slate-200 mb-2">No orders yet</h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">When you buy something, your orders will appear here.</p>
            <button 
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-8 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95 inline-flex items-center gap-2" 
              onClick={() => navigate('/home')}
            >
              Start Shopping
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((item, index) => (
              <div key={item.id + index} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-6 shadow-lg hover:border-indigo-500/30 transition-colors relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>
                
                <div className="w-24 h-24 bg-white rounded-xl p-2 flex-shrink-0">
                  <img className="w-full h-full object-contain mix-blend-multiply" src={item.thumbnail} alt={item.title} />
                </div>

                <div className="flex-grow text-center sm:text-left w-full sm:w-auto">
                  <h4 className="text-lg font-medium text-slate-200 mb-1">{item.title}</h4>
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-6 text-sm text-slate-400">
                    <p className="flex items-center gap-1">
                      <span className="font-semibold text-slate-300">Price:</span> ${item.price}
                    </p>
                    <p className="flex items-center gap-1">
                      <span className="font-semibold text-slate-300">Quantity:</span> {item.qty || 1}
                    </p>
                    <p className="flex items-center gap-1 text-indigo-400 font-semibold sm:ml-auto">
                      Total: ${(item.price * (item.qty || 1)).toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <div className="flex-shrink-0 mt-4 sm:mt-0 w-full sm:w-auto">
                  <div className="flex items-center justify-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-4 py-2 rounded-lg font-medium text-sm">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                    Processing
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
