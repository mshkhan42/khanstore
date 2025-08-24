import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setSubmitted(true);
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div className="py-10 px-4 max-w-md mx-auto text-white">
      <h2 className="text-3xl font-bold text-[#22d3ee] mb-8 text-center">Reset Password</h2>
      {submitted ? (
        <div className="bg-white/10 rounded-xl shadow-lg p-6 text-center">
          <p className="text-[#818cf8] mb-2">Your password has been reset. Redirecting to login...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white/10 rounded-xl shadow-lg p-6 flex flex-col gap-4">
          <input
            type="password"
            placeholder="New password"
            className="px-4 py-2 rounded bg-white/80 text-[#0f172a]"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            className="px-4 py-2 rounded bg-white/80 text-[#0f172a]"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
          />
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button type="submit" className="px-4 py-2 rounded bg-[#22d3ee] text-[#0f172a] font-bold hover:bg-[#06b6d4] transition-colors">Reset Password</button>
        </form>
      )}
    </div>
  );
}
