import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function Login() {
  const context = useContext(AuthContext);

  if (!context) {
    return <p className="text-center text-white mt-10">Auth not working</p>;
  }

  const { login, signup } = context;

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    if (login(email, password)) {
      navigate("/home");
    } else {
      alert("Invalid email or password");
    }
  };

  const handleSignup = () => {
    if (!name || !email || !password) {
      alert("Enter all fields");
      return;
    }

    signup(name, email, password);
    alert("Signup successful");

    setName("");
    setEmail("");
    setPassword("");
    setIsLogin(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <div className="relative w-full max-w-md">
        {/* Decorative background glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 animate-pulse"></div>
        
        <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-slate-400 mt-2 text-sm">
              {isLogin ? "Enter your credentials to access your account" : "Sign up to start shopping"}
            </p>
          </div>

          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                <input
                  className="w-full bg-slate-950/50 border border-slate-700/50 text-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder-slate-600"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
              <input
                className="w-full bg-slate-950/50 border border-slate-700/50 text-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder-slate-600"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
              <input
                className="w-full bg-slate-950/50 border border-slate-700/50 text-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder-slate-600"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-indigo-500/25 active:scale-[0.98] flex justify-center items-center gap-2"
              onClick={isLogin ? handleLogin : handleSignup}
            >
              {isLogin ? "Sign In" : "Create Account"}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="mt-8 text-center pt-6 border-t border-slate-700/50">
            <p className="text-slate-400 text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors cursor-pointer inline-flex items-center gap-1"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign up now" : "Log in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
