import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SimpleHeader } from '../../components/layout/Header';
import { MarketingFooter } from '../../components/layout/Footer';
import { useAuth } from '../../context/AuthContext';
import { GitBranch, Mail, Globe } from 'lucide-react';

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

  console.log(Mail); // Use Mail to avoid unused warning if needed, or just remove it

  return (
    <div className="page auth-page">
      <SimpleHeader
        left="Roota"
        right={
          <Link to="/" className="floating-home-button">
            Back to home
          </Link>
        }
      />
      <main className="auth-layout">
        <section className="auth-visual">
          <div className="auth-visual__panel">
            <span className="eyebrow eyebrow--gold">
              <span className="eyebrow__icon">🛡</span>
              Global Standard
            </span>
            <h2>Secure Your Wealth Frontier</h2>
            <p>
              Roota leverages advanced AI to provide an immutable Trust Score, bridging African talent with global high-value
              opportunities.
            </p>
          </div>

          <div className="auth-visual__chips">
            <div>
              <strong>98.2%</strong>
              <span>Avg. Trust Growth</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>AI Monitoring</span>
            </div>
          </div>
        </section>

        <section className="auth-card">
          <div className="auth-tabs">
            <button 
              className={`auth-tabs__button ${!isLogin ? 'auth-tabs__button--active' : ''}`} 
              type="button"
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
            <button 
              className={`auth-tabs__button ${isLogin ? 'auth-tabs__button--active' : ''}`} 
              type="button"
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
          </div>

          <div className="auth-copy">
            <h2>{isLogin ? 'Welcome back' : 'Create your account'}</h2>
            <p>{isLogin ? 'Log in to your professional workspace.' : 'Join the network of futuristic professionals today.'}</p>
          </div>

          <form className="auth-form" onSubmit={isLogin ? handleLogin : handleSignup}>
            {!isLogin && (
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                required
              />
            )}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="pill-button pill-button--solid pill-button--block">
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          <div className="auth-divider">
            <span>OR CONTINUE WITH</span>
          </div>

          <div className="auth-socials">
            <button type="button" className="social-pill">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="social-pill__icon"
              />
              Continue with Google
            </button>
          </div>
        </section>
      </main>

      <MarketingFooter minimal auth />
    </div>
  );
}
