import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [showPaidModal, setShowPaidModal] = useState(false);
  const [method, setMethod] = useState('easypaisa');

  const shipping = 199;
  const codFee = 50;
  const subtotal = cart?.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
  const total = subtotal + shipping + (method === 'cod' ? codFee : 0);

  const phone = {
    easypaisa: '03457362975', 
    jazzcash: '03457362975',
  };
  const whatsappLink = 'https://wa.me/923471173358';

  if (!cart || cart.length === 0) {
    return (
      <div className="py-20 px-4 max-w-md mx-auto text-center text-white">
        <h2 className="text-3xl font-bold text-[#22d3ee] mb-6">Your cart is empty</h2>
        <p className="mb-6 text-[#818cf8]">Please add some products to your cart before checking out.</p>
        <a href="/products" className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-[#22d3ee] to-[#06b6d4] text-[#0f172a] font-bold shadow-md hover:scale-105 transition-all duration-200">Go to Products</a>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 max-w-md mx-auto text-white">
      <h2 className="text-3xl font-bold text-center text-[#22d3ee] mb-8">Checkout</h2>
      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 flex flex-col gap-6">
        
        {/* Cart summary */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-bold text-[#818cf8]">Rs. {subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping Fee:</span>
            <span className="font-bold text-[#22d3ee]">Rs. {shipping}</span>
          </div>
          {method === 'cod' && (
            <div className="flex justify-between">
              <span>Cash on Delivery Fee:</span>
              <span className="font-bold text-[#f472b6]">Rs. {codFee}</span>
            </div>
          )}
          <div className="flex justify-between mt-2 pt-2 border-t border-[#bae6fd]/30 text-lg font-extrabold">
            <span>Total:</span>
            <span className="text-[#22d3ee]">Rs. {total}</span>
          </div>
        </div>

        {/* Payment method selection */}
        <p className="text-center mt-2">Payment Options:</p>
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          {['easypaisa', 'jazzcash', 'cod'].map((m) => (
            <button
              key={m}
              className={`flex flex-col items-center px-3 py-2 rounded-xl border-2 transition-all duration-200 ${
                method === m ? 'border-[#22d3ee] bg-[#bae6fd]/20 shadow-lg scale-105' : 'border-transparent'
              }`}
              onClick={() => setMethod(m)}
            >
              <img src={`/payment-logos/${m}.png`} alt={m} className="h-8 mb-1" />
              <span className="text-xs">{m === 'cod' ? 'Cash on Delivery' : m.charAt(0).toUpperCase() + m.slice(1)}</span>
            </button>
          ))}
        </div>

        {/* Payment instructions */}
        {method !== 'cod' && (
          <div className="mt-6 bg-[#bae6fd]/10 rounded-lg p-4 text-[#0f172a] flex flex-col gap-2">
            <div>
              Send payment to <span className="font-bold text-[#22d3ee]">{phone[method]}</span> ({method === 'easypaisa' ? 'Easypaisa' : 'JazzCash'})
            </div>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-[#22d3ee] underline font-bold">
              Send payment screenshot on WhatsApp
            </a>
            <button
              onClick={() => { clearCart(); setShowPaidModal(true); }}
              className="mt-4 px-4 py-2 rounded bg-gradient-to-r from-[#22d3ee] to-[#06b6d4] text-[#0f172a] font-bold shadow-md hover:scale-105 transition-all duration-200"
            >
              Confirm Payment
            </button>
          </div>
        )}

        {method === 'cod' && (
          <div className="mt-6 bg-[#bae6fd]/10 rounded-lg p-4 text-[#0f172a]">
            <div className="mb-2">
              You will pay <span className="font-bold text-[#22d3ee]">Rs. {total}</span> (including Rs. {codFee} COD fee) on delivery.
            </div>
            <button
              onClick={() => { clearCart(); setShowPaidModal(true); }}
              className="mt-4 px-4 py-2 rounded bg-gradient-to-r from-[#22d3ee] to-[#06b6d4] text-[#0f172a] font-bold shadow-md hover:scale-105 transition-all duration-200 w-full"
            >
              Place Order
            </button>
          </div>
        )}

      </div>

      {/* Paid confirmation modal */}
      {showPaidModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }} className="bg-white/95 rounded-xl p-6 max-w-md mx-4 text-center shadow-2xl">
            <h3 className="text-2xl font-bold text-[#22d3ee] mb-2">Payment Confirmed</h3>
            <p className="mb-4">Thank you! Your payment has been received. We'll send your order details via WhatsApp shortly.</p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 rounded-full bg-[#22d3ee] text-[#0f172a] font-bold shadow-md hover:scale-105 transition-all duration-200">Open WhatsApp</a>
            <div className="mt-4">
              <button onClick={() => setShowPaidModal(false)} className="px-4 py-2 rounded border border-[#22d3ee] text-[#22d3ee] font-bold hover:bg-[#22d3ee] hover:text-white transition-colors">
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
