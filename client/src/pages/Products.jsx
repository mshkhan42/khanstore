import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { Link } from 'react-router-dom';

function Products() {
  const { addToCart } = useCart();
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <div className="py-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] via-[#0ea5e9] to-[#818cf8] mb-6 text-center drop-shadow-xl animate-pulse">Products</h2>

      {/* Search */}
      <div className="max-w-md mx-auto mb-6">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-[#9fbfdc] border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#22d3ee]"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.length === 0 ? (
          <div className="text-center text-[#bae6fd] col-span-full">No products found.</div>
        ) : (
          filtered.map((product, idx) => (
            <Link to={`/products/${product.id}`} key={product.id} className="group">
              <motion.div
                className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-md p-3 sm:p-4 flex flex-col items-center border border-white/10 hover:shadow-[#0ea5e9]/20 transition-all duration-300 group relative overflow-hidden h-[360px]"
                whileHover={{ y: -6, scale: 1.03 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
              >
                <img
                  src={product.images?.[0] || product.image}
                  alt={product.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl mb-3 border-2 border-[#9fd8ef] bg-white/90 transition-transform duration-300 opacity-0 will-change-opacity"
                  loading={idx < 8 ? 'eager' : 'lazy'}
                  decoding="async"
                  onLoad={e => { e.currentTarget.classList.remove('opacity-0'); e.currentTarget.classList.add('opacity-100', 'transition-opacity', 'duration-300'); }}
                />
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 drop-shadow-lg group-hover:text-[#22d3ee] transition-colors">{product.name}</h3>
                
                {/* Truncated description */}
                <p className="text-[#bae6fd] mb-2 text-xs sm:text-sm text-center group-hover:text-white transition-colors line-clamp-2">
                  {product.description}
                </p>

                <div className="text-md sm:text-lg font-bold text-[#22d3ee] mb-2">Rs. {product.price}</div>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  className="px-3 py-2 rounded-full bg-[#22d3ee] text-[#0f172a] font-bold shadow-sm hover:bg-[#06b6d4] hover:scale-103 transition-all duration-200"
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); addToCart(product); }}
                >
                  Add to Cart
                </motion.button>

                {/* animated background shapes */}
                <div className="absolute -z-10 inset-0 opacity-30 group-hover:opacity-80 transition-opacity duration-500 rounded-2xl overflow-hidden pointer-events-none">
                  <div className="product-bg w-full h-full" aria-hidden="true"></div>
                </div>
              </motion.div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
