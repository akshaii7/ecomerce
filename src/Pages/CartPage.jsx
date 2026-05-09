import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

function CartPage() {
  const { cart, removeFromCart, clearCart, placeOrder } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart?.reduce((sum, item) => sum + item.price * item.qty, 0) || 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 bg-slate-900 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors border border-slate-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Shopping Cart</h2>
          {cart && cart.length > 0 && (
            <button 
              className="ml-auto text-sm text-red-400 hover:text-red-300 font-medium px-4 py-2 rounded-lg bg-red-400/10 hover:bg-red-400/20 transition-colors" 
              onClick={clearCart}
            >
              Clear All
            </button>
          )}
        </div>

        {!cart || cart.length === 0 ? (
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-12 text-center shadow-2xl">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-slate-200 mb-2">Your cart is empty</h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Go ahead and explore our top categories.</p>
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
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 flex items-center gap-6 shadow-lg relative group">
                  <div className="w-24 h-24 bg-white rounded-xl p-2 flex-shrink-0">
                    <img className="w-full h-full object-contain mix-blend-multiply" src={item.thumbnail} alt={item.title} />
                  </div>

                  <div className="flex-grow py-2">
                    <h4 className="text-lg font-medium text-slate-200 line-clamp-1">{item.title}</h4>
                    <p className="text-indigo-400 font-bold mt-1">${item.price}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1 border border-slate-700">
                        <span className="text-sm font-medium text-slate-300 px-3">Qty: {item.qty}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    className="absolute top-4 right-4 p-2 text-slate-500 hover:text-red-400 bg-slate-800/0 hover:bg-slate-800 rounded-full transition-all" 
                    onClick={() => removeFromCart(item.id)}
                    title="Remove item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl sticky top-24">
                <h3 className="text-xl font-semibold mb-6 pb-4 border-b border-slate-800 text-slate-200">Order Summary</h3>
                
                <div className="space-y-4 mb-6 text-sm text-slate-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-slate-200 font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-400 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span className="text-slate-200 font-medium">$0.00</span>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-medium">Total</span>
                    <span className="text-2xl font-bold text-white">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98] flex justify-center items-center gap-2" 
                  onClick={() => {
                    placeOrder();
                    navigate("/orders");
                  }}
                >
                  Proceed to Checkout
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;