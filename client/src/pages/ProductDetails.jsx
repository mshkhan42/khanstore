import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

function ProductDetails() {
  const { id } = useParams();
  const pid = Number(id);
  const product = products.find(p => p.id === pid);
  const { addToCart } = useCart();

  if (!product) return (
    <div className="py-20 px-4 max-w-4xl mx-auto text-center text-[#bae6fd]">Product not found.</div>
  );

  const [mainIdx, setMainIdx] = useState(0);

  return (
    <div className="py-10 px-4 max-w-5xl mx-auto">
      <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.45}} className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 w-full flex flex-col gap-4">
          <div className="w-full">
            {/* 1:1 square container using padding-top trick so images always crop to square */}
            <div className="relative w-full pb-[100%] rounded-xl overflow-hidden border-2 border-[#9fd8ef] bg-white/90">
              <img src={product.images[mainIdx]} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex gap-3 mt-2">
            {product.images.map((src, i) => (
              <button key={i} onClick={() => setMainIdx(i)} className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${i === mainIdx ? 'border-[#22d3ee]' : 'border-transparent'}`}>
                <img src={src} alt={`${product.name} ${i+1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">{product.name}</h1>
          <p className="text-[#bae6fd] mb-4">{product.description}</p>
          <div className="text-2xl font-bold text-[#22d3ee] mb-6">Rs. {product.price}</div>
          <div className="flex gap-3">
            <button type="button" onClick={() => addToCart({ ...product, selectedImage: product.images[mainIdx] })} className="px-4 py-2 rounded-full bg-[#22d3ee] text-[#0f172a] font-bold shadow-md hover:bg-[#06b6d4] transition-colors">Add to Cart</button>
            <Link to="/products" className="px-4 py-2 rounded-full bg-white/20 border border-[#22d3ee] text-[#22d3ee] font-bold">Back to Products</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProductDetails;
