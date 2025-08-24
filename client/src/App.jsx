// Floating Cart Button
import { useCart } from './context/CartContext';
import { useState, useRef, useEffect } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';


import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';



import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Help from './pages/Help';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Animated NavLink component (module scope)
// Animated NavLink component (module scope)
function NavLink({ to, label, color }) {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link to={to} className={`group relative px-4 py-1 rounded transition-all duration-200 font-semibold ${active ? `text-[${color}]` : 'text-white'}`}>
      <span className="relative z-10">{label}</span>
      <span
        className="absolute left-1/2 -translate-x-1/2 bottom-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-transparent to-transparent transition-all duration-300 group-hover:w-full group-focus:w-full"
        style={{background: `linear-gradient(90deg, ${color}, rgba(255,255,255,0.8))`, transitionProperty:'width,background-color'}}
      />
    </Link>
  );
}

// Animate page transitions
import { AnimatePresence } from 'framer-motion';

const Home = () => (
  <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
    <motion.h2 initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{delay:0.2, duration:0.7}} className="text-4xl md:text-6xl font-extrabold text-white mb-6 mt-16 md:mt-0 drop-shadow-xl">
      Premium Pakistani Online Shopping
    </motion.h2>
    <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5, duration:0.7}} className="text-lg md:text-2xl text-[#bae6fd] max-w-2xl mb-8">
      Discover the best products, smooth checkout, and secure payments with Khan Store. Experience a modern, premium, and fully responsive e-commerce platform.
    </motion.p>
    <motion.button whileHover={{scale:1.08}} className="px-8 py-3 rounded-full bg-[#22d3ee] text-[#0f172a] font-bold text-xl shadow-lg hover:bg-[#06b6d4] transition-colors">
      <Link to="/products">Shop Now</Link>
    </motion.button>
  </main>
);


function App() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const cartRef = useRef();
  // Location hook (kept for NavLink active checks / future use)
  const location = useLocation();
  // Defensive: ensure cart is always an array
  const safeCart = Array.isArray(cart) ? cart : [];
  const total = safeCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0ea5e9] animate-gradient-move">
      {/* Header */}
  <header className="relative flex flex-col items-center px-6 py-4 shadow-2xl bg-gradient-to-r from-[#082f36]/30 via-[#0c2530]/25 to-[#2a2340]/25 backdrop-blur-2xl w-full rounded-b-2xl border-b border-white/10 z-20 ring-2 ring-[#2b2350]/6">
        {/* Login/Signup top right */}
        <div className="absolute right-6 top-4 flex gap-2">
          <Link to="/login" className="px-4 py-2 rounded-lg bg-[#22d3ee] text-[#0f172a] font-bold shadow-md hover:bg-[#06b6d4] hover:scale-103 transition-all duration-200">Login</Link>
        </div>
        <motion.h1 initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} transition={{duration:0.6}} className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] via-[#0ea5e9] to-[#818cf8] tracking-tight drop-shadow-xl mb-2 self-start ml-2 md:ml-8">
            <span className="inline-flex items-center gap-3">
            <Link to="/" aria-label="Khan Store home">
              <img
                src="/logo.png"
                alt="Khan Store logo"
                className="w-10 h-10 rounded-lg object-contain shadow-md cursor-pointer"
                onError={(e) => {
                  console.warn('Logo failed to load, using fallback.');
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/logo-fallback.svg';
                }}
              />
            </Link>
            {/* title intentionally non-interactive: pointer-events disabled in CSS */}
            <span className="title-3d" data-text="Khan Store" aria-hidden="false" role="text">Khan Store</span>
          </span>
        </motion.h1>
  <nav className="w-full flex justify-center space-x-2 md:space-x-4 text-lg font-semibold text-white mb-2 mt-6" onContextMenu={e => e.preventDefault()}>
          <NavLink to="/" label="Home" color="#22d3ee" />
          <NavLink to="/products" label="Products" color="#818cf8" />
          <NavLink to="/contact" label="Contact" color="#facc15" />
          <NavLink to="/help" label="Help" color="#34d399" />
        </nav>
      </header>

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </AnimatePresence>

      {/* Floating Cart Button */}
  <div ref={cartRef} className="fixed bottom-8 right-8 z-50 md:bottom-10 md:right-12 lg:bottom-12 lg:right-16">
    <Link to="/cart" className="relative bg-[#22d3ee] p-3 rounded-full shadow-md hover:scale-105 transition-all inline-flex items-center justify-center">
      <ShoppingCartIcon className="h-7 w-7 text-white" />
      {safeCart.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#f472b6] text-white text-xs font-bold px-2 py-0.5 rounded-full border-2 border-white animate-bounce">{safeCart.length}</span>
      )}
    </Link>
  </div>
      {/* Footer */}
      <footer className="py-6 text-center text-[#bae6fd] text-sm bg-white/10 mt-auto w-full shadow-inner rounded-t-2xl border-t border-white/20">
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] via-[#0ea5e9] to-[#818cf8]">&copy; {new Date().getFullYear()} Khan Store.</span> All rights reserved.
      </footer>
    </div>
  );
}

export default App;
