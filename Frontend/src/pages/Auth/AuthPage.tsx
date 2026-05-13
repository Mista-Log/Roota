import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SimpleHeader } from '../../components/layout/Header';
import { MarketingFooter } from '../../components/layout/Footer';
import { useAuth } from '../../context/AuthContext';
import { GoogleLogin } from "@react-oauth/google";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role] = useState<"WORKER" | "EMPLOYER">(
    (localStorage.getItem("selectedRole") as any) || "WORKER"
  );
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("error")

      const user = await signup({
        full_name: fullName,
        email,
        password,
        role,
      });

      localStorage.removeItem("selectedRole");

      if (user.role === "WORKER") {
        navigate("/worker");
      } else {
        navigate("/employer");
      }

    } catch (err: any) {
      console.error(err);

      alert(
        err.response?.data?.detail ||
        "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const user = await login(email, password);

      if (user.role === "WORKER") {
        navigate("/worker");
      } else {
        navigate("/employer");
      }

    } catch (err: any) {
      console.error(err);

      alert(
        err.response?.data?.detail ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8000/api/auth/google/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            token: credentialResponse.credential,
            role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail);
      }

      // save tokens
      localStorage.setItem("access", data.access);

      localStorage.setItem("refresh", data.refresh);

      localStorage.removeItem("selectedRole");

      // redirect
      if (data.user.role === "WORKER") {
        navigate("/worker");
      } else {
        navigate("/employer");
      }

    } catch (error: any) {
      console.error(error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-slate-900">Roota</Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Login</Link>
            <Link to="/" className="px-5 py-2.5 bg-primary-dark text-white text-sm font-semibold rounded-full hover:opacity-90 transition-opacity">Get Started</Link>
          </div>
        </div>
      </div>

      <main className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
        {/* LEFT SIDE - VISUAL PANEL */}
        <section className="hidden lg:flex bg-gradient-to-br from-[#0b5d4b] via-[#0a4a3d] to-[#051f1a] flex-col justify-center px-12 py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(66,186,167,0.15),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(245,166,35,0.1),transparent_35%)]" />
          <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'radial-gradient(circle at 40% 40%, rgba(66,186,167,0.1), transparent 50%)'}} />
          
          <div className="relative space-y-10 z-10">
            <motion.div 
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-2 mb-6">
                <span className="inline-block text-xs font-bold text-[#F5A623] tracking-wider">🛡 GLOBAL STANDARD</span>
                <h2 className="text-3xl font-bold text-white">Secure Your Wealth Frontier</h2>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Roota leverages advanced AI to provide an immutable Trust Score, bridging African talent with global high-value opportunities.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="text-[#F5A623] text-sm font-bold">98.2%</span>
                <p className="text-white/70 text-xs mt-1">Avg. Trust Growth</p>
              </motion.div>
              <motion.div 
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="text-[#F5A623] text-sm font-bold">24/7</span>
                <p className="text-white/70 text-xs mt-1">AI Monitoring</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* RIGHT SIDE - AUTH FORM */}
        <section className="flex flex-col justify-center px-6 lg:px-12 py-12 bg-white">
          <div className="w-full max-w-sm mx-auto space-y-8">
            {/* TABS */}
            <motion.div
              className="flex gap-0.5 rounded-full bg-slate-100 p-1"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                className={`flex-1 py-3 px-4 rounded-full font-semibold text-sm transition-all ${
                  !isLogin
                    ? 'bg-white text-primary-dark shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                type="button"
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
              <button
                className={`flex-1 py-3 px-4 rounded-full font-semibold text-sm transition-all ${
                  isLogin
                    ? 'bg-white text-primary-dark shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                type="button"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </motion.div>

            {/* HEADING */}
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-slate-900">{isLogin ? 'Welcome back' : 'Sign Up'}</h2>
              <p className="text-sm text-slate-600">{isLogin ? 'Log in to your professional workspace.' : 'Create your account'}</p>
            </motion.div>

            {/* FORM */}
            <motion.form 
              className="space-y-4"
              onSubmit={isLogin ? handleLogin : handleSignup}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {!isLogin && (
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm outline-none transition-colors focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/10"
                />
              )}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm outline-none transition-colors focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/10"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm outline-none transition-colors focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/10"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-primary-dark text-white font-semibold rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 mt-6"
              >
                {loading ? 'Loading...' : isLogin ? 'Login' : 'Create Account'}
              </button>
            </motion.form>

            {!isLogin && (
              <motion.div 
                className="flex items-center gap-2 text-xs text-slate-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <input type="checkbox" id="agree" className="rounded" />
                <label htmlFor="agree">I agree to the Terms of Service and Privacy Policy</label>
              </motion.div>
            )}

            {/* DIVIDER */}
            <motion.div 
              className="relative flex items-center gap-3 my-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs font-semibold text-slate-500">OR CONTINUE WITH</span>
              <div className="flex-1 h-px bg-slate-200" />
            </motion.div>

            {/* SOCIAL LOGIN */}
            <motion.div 
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  alert("Google Login Failed");
                }}
                size="large"
              />
            </motion.div>
          </div>
        </section>
      </main>

      <MarketingFooter minimal auth />
    </div>
  );
}
