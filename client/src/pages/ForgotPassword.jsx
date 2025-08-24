import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-10 px-4 max-w-md mx-auto text-white">
      <h2 className="text-3xl font-bold text-[#22d3ee] mb-8 text-center">Forgot Password</h2>
      {submitted ? (
        <div className="bg-white/10 rounded-xl shadow-lg p-6 text-center">
          <p className="text-[#818cf8] mb-2">If an account with that email exists, a password reset link has been sent.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white/10 rounded-xl shadow-lg p-6 flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded bg-white/80 text-[#0f172a]"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="px-4 py-2 rounded bg-[#22d3ee] text-[#0f172a] font-bold hover:bg-[#06b6d4] transition-colors">Send Reset Link</button>
        </form>
      )}
    </div>
  );
}
