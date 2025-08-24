import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Yahan aap backend API call add kar sakte ho
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="py-12 px-4 max-w-3xl mx-auto text-white">
      <h2 className="text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#22d3ee] via-[#0ea5e9] to-[#818cf8] drop-shadow-lg">
        Contact Us
      </h2>
      <p className="text-center text-[#bae6fd] mb-8">
        Have questions or feedback? Fill out the form below and we'll get back to you shortly!
      </p>

      {submitted && (
        <div className="mb-6 p-4 bg-green-500/20 text-green-100 rounded-lg text-center font-semibold shadow-md">
          Thank you! Your message has been sent.
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-white/20 space-y-6">
        <div>
          <label className="block text-[#bae6fd] mb-2 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#22d3ee] transition"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label className="block text-[#bae6fd] mb-2 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#22d3ee] transition"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-[#bae6fd] mb-2 font-semibold">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#22d3ee] transition"
            placeholder="Write your message..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-gradient-to-r from-[#22d3ee] to-[#06b6d4] text-[#0f172a] font-bold shadow-lg hover:scale-105 transition-all duration-200"
        >
          Send Message
        </button>
      </form>

      <div className="mt-12 text-center space-y-3 text-[#bae6fd]">
        <p>Or reach us directly:</p>
        <p>Email: <a href="mailto:mshkhanking@gmail.com" className="underline text-[#22d3ee]">mshkhanking@gmail.com</a></p>
        <p>Phone/WhatsApp: <a href="https://wa.me/923471173358" target="_blank" rel="noopener noreferrer" className="underline text-[#22d3ee]">+92 347 1173358</a></p>
      </div>
    </div>
  );
}
