import { Link } from 'react-router-dom';
export default function Login() {
  return (
    <div className="py-10 px-4 max-w-md mx-auto text-white">
      <h2 className="text-3xl font-bold text-[#22d3ee] mb-8 text-center">Login</h2>
      <form className="bg-white/10 rounded-xl shadow-lg p-6 flex flex-col gap-4">
        <input type="email" placeholder="Email" className="px-4 py-2 rounded bg-white/80 text-[#0f172a]" />
        <input type="password" placeholder="Password" className="px-4 py-2 rounded bg-white/80 text-[#0f172a]" />
        <div className="text-right mt-1">
          <Link to="/forgot-password" className="text-sm text-[#818cf8] hover:underline">Forgot password?</Link>
        </div>
        <button className="px-4 py-2 rounded bg-[#22d3ee] text-[#0f172a] font-bold hover:bg-[#06b6d4] transition-colors">Login</button>
      </form>
      <div className="mt-4 text-center text-sm text-[#818cf8]">
        If you don't have an account, <a href="/signup" className="text-[#22d3ee] font-bold hover:underline">Sign Up</a>
      </div>
    </div>
  );
}
