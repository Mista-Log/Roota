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
      <SimpleHeader
        left="Roota"
        right={
          <Link to="/" className="text-primary-dark hover:opacity-80 transition-opacity font-medium">
            Back to home
          </Link>
        }
      />
      <main className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
        {/* LEFT VISUAL SECTION */}
        <section className="hidden lg:flex bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 flex-col justify-center px-12 py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(66,186,167,0.2),transparent_30%),radial-gradient(circle_at_65%_34%,rgba(245,166,35,0.15),transparent_25%)]" />
          
          <div className="relative space-y-12">
            <div className="space-y-4">
              <span className="inline-block text-sm font-semibold text-[#F5A623] bg-[#FFF1D9] rounded-full px-4 py-1.5">
                🛡 Global Standard
              </span>
              <h2 className="text-4xl font-bold text-white">Secure Your Wealth Frontier</h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Roota leverages advanced AI to provide an immutable Trust Score, bridging African talent with global high-value opportunities.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="space-y-1">
                <p className="text-3xl font-bold text-white">98.2%</p>
                <p className="text-slate-400">Avg. Trust Growth</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-white">24/7</p>
                <p className="text-slate-400">AI Monitoring</p>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT AUTH SECTION */}
        <section className="flex flex-col justify-center px-6 lg:px-12 py-12">
          <div className="w-full max-w-sm mx-auto space-y-8">
            {/* TABS */}
            <div className="flex gap-1 rounded-full bg-slate-100 p-1">
              <button
                className={`flex-1 py-2.5 px-4 rounded-full font-semibold text-sm transition-colors ${
                  !isLogin
                    ? 'bg-white text-primary-dark shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                type="button"
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
              <button
                className={`flex-1 py-2.5 px-4 rounded-full font-semibold text-sm transition-colors ${
                  isLogin
                    ? 'bg-white text-primary-dark shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                type="button"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </div>

            {/* COPY */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">{isLogin ? 'Welcome back' : 'Create your account'}</h2>
              <p className="text-slate-600">{isLogin ? 'Log in to your professional workspace.' : 'Join the network of futuristic professionals today.'}</p>
            </div>

            {/* FORM */}
            <form className="space-y-4" onSubmit={isLogin ? handleLogin : handleSignup}>
              {!isLogin && (
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm outline-none transition-colors focus:border-primary-dark"
                />
              )}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm outline-none transition-colors focus:border-primary-dark"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm outline-none transition-colors focus:border-primary-dark"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-primary-dark text-white font-semibold rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Loading...' : isLogin ? 'Login' : 'Create Account'}
              </button>
            </form>

            {/* DIVIDER */}
            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs font-semibold text-slate-500">OR</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* GOOGLE LOGIN */}
            <div className="w-full">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  alert("Google Login Failed");
                }}
                size="large"
              />
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter minimal auth />
    </div>
  );
}
