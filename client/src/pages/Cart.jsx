import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const safeCart = Array.isArray(cart) ? cart : [];
  const total = safeCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen py-6 px-3 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] via-[#0ea5e9] to-[#818cf8] drop-shadow-lg">
          Your Cart
        </h2>

        {safeCart.length === 0 ? (
          <motion.div 
            initial={{opacity:0, y:20}} 
            animate={{opacity:1, y:0}} 
            className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl p-6 text-center border border-white/20"
          >
            <p className="text-lg text-[#bae6fd] mb-4">Your cart is empty.</p>
            <Link 
              to="/products" 
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#22d3ee] via-[#0ea5e9] to-[#06b6d4] text-[#0f172a] font-bold shadow-md hover:scale-105 transition-transform duration-300"
            >
              Browse Products
            </Link>
          </motion.div>
        ) : (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10">
            <div className="p-4 overflow-y-auto max-h-[70vh] space-y-5">
              {safeCart.map((item) => (
                <motion.div 
                  key={item.id} 
                  initial={{opacity:0, y:10}} 
                  whileHover={{scale:1.02}} 
                  animate={{opacity:1, y:0}} 
                  transition={{duration:0.25}} 
                  className="w-full rounded-xl bg-gradient-to-tr from-white/5 to-white/10 p-4 flex flex-col gap-4 shadow-inner"
                >
                  {/* Image */}
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-800 border border-white/20 shadow-md">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                      onError={(e)=>{e.currentTarget.onerror=null; e.currentTarget.src='/placeholder.png'}} 
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] via-[#0ea5e9] to-[#818cf8]">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[#bae6fd]">Rs. {item.price}</p>
                    <p className="text-xs text-white/70">{item.description || 'No description available.'}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <input 
                        type="number" 
                        min="1" 
                        value={item.quantity} 
                        onChange={e => updateQuantity(item.id, Number(e.target.value))} 
                        className="w-16 px-3 py-1 rounded-lg bg-white text-[#0f172a] font-semibold text-center shadow-sm" 
                      />
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold shadow transition-colors duration-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-4 border-t border-white/10 bg-gradient-to-t from-black/20 to-transparent flex flex-col gap-3">
              <div className="text-sm text-[#bae6fd] font-semibold">Total Items: {safeCart.length}</div>
              <div className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] via-[#0ea5e9] to-[#818cf8]">
                Total: Rs. {total}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <Link 
                  to="/checkout" 
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-[#22d3ee] via-[#0ea5e9] to-[#06b6d4] text-[#062023] font-extrabold shadow hover:scale-105 transition-transform duration-300"
                >
                  Checkout
                </Link>
                <button 
                  onClick={clearCart} 
                  className="flex-1 px-6 py-3 rounded-full bg-transparent border border-white/20 text-white font-semibold hover:bg-white/10 transition duration-300"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
