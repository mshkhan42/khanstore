import { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  { question: "How do I order?", answer: "Browse products, add to cart, and checkout securely with your preferred payment method." },
  { question: "What are the payment options?", answer: "Easypaisa, JazzCash, and Cash on Delivery (COD) are available." },
  { question: "How much is shipping?", answer: "Flat shipping fee of 199 PKR per order anywhere in Pakistan." },
  { question: "How do I contact support?", answer: "Email us at support@khanstore.pk or message on WhatsApp +92 300 1234567." },
];

export default function Help() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white">
      <h2 className="text-4xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#22d3ee] via-[#0ea5e9] to-[#818cf8] drop-shadow-lg">
        Help & FAQs
      </h2>

      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-5 cursor-pointer border border-white/20 shadow-lg hover:bg-white/20"
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#bae6fd]">{faq.question}</h3>
              <span className="text-2xl font-bold">{activeIndex === i ? "−" : "+"}</span>
            </div>
            {activeIndex === i && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3 text-[#dbeafe]"
              >
                {faq.answer}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>

      <p className="text-center text-sm text-[#94a3b8] mt-10">
        Still have questions? Contact us at <span className="text-[#22d3ee] font-semibold">support@khanstore.pk</span>
      </p>
    </div>
  );
}
