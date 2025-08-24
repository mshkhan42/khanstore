export default function Signup() {
  return (
    <div className="py-10 px-4 max-w-md mx-auto text-white">
      <h2 className="text-3xl font-bold text-[#22d3ee] mb-8 text-center">Sign Up</h2>
      <form className="bg-white/10 rounded-xl shadow-lg p-6 flex flex-col gap-4">
        <input type="text" placeholder="Name" className="px-4 py-2 rounded bg-white/80 text-[#0f172a]" />
        <input type="email" placeholder="Email" className="px-4 py-2 rounded bg-white/80 text-[#0f172a]" />
        <input type="password" placeholder="Password" className="px-4 py-2 rounded bg-white/80 text-[#0f172a]" />
      </form>
      <button className="w-full mt-2 px-4 py-2 rounded bg-[#22d3ee] text-[#0f172a] font-bold hover:bg-[#06b6d4] transition-colors">Sign Up</button>
      <div className="mt-4 text-center text-sm text-[#818cf8]">
        Already have an account? <a href="/login" className="text-[#22d3ee] font-bold hover:underline">Login</a>
      </div>
    </div>
  );
}
