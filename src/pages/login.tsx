import React, { useState } from 'react';
import { loginService } from '../services/auth';
import LoginBackground from '../components/LoginBackground';

interface LoginProps {
  onLoginSuccess: (token: string, username: string) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginService(username, password);
      if (response.status === true) {
        const { token, username: resUser } = response.message.data;
        if (rememberMe) {
          localStorage.setItem('token', token);
          localStorage.setItem('username', resUser);
        }

        onLoginSuccess(token, resUser);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Gagal menghubungkan ke server. Periksa koneksi internet Anda.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-[#43A6EE] p-5 box-border font-nunito relative overflow-hidden">
      <LoginBackground />
      <div className="bg-white p-10 rounded-[20px] w-full max-w-[480px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] box-border relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#1e293b] m-0 mb-2">
            Login to <span className="text-primary-blue">GPS.ID TMS</span> Account
          </h2>
          <p className="text-text-muted text-sm m-0">Please enter your email and password to continue</p>
        </div>

        {error && (
          <div className="p-3 rounded-md text-[13px] mb-2.5 bg-[#fef2f2] border border-[#fee2e2] text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-text-muted">
              Email address:
            </label>
            <input
              id="email"
              type="text"
              className="bg-[#f1f5f9] border border-[#e2e8f0] px-4 py-3.5 rounded-lg text-sm text-[#1e293b] outline-none transition-all duration-200 focus:border-primary-blue focus:bg-white focus:ring-2 focus:ring-primary-blue/15"
              placeholder="esteban_schiller@gmail.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              maxLength={100}
              disabled={loading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-sm font-medium text-text-muted">
                Password
              </label>
              <a href="#" className="text-[13px] text-text-muted hover:underline">
                Forget Password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              className="bg-[#f1f5f9] border border-[#e2e8f0] px-4 py-3.5 rounded-lg text-sm text-[#1e293b] outline-none transition-all duration-200 focus:border-primary-blue focus:bg-white focus:ring-2 focus:ring-primary-blue/15"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              maxLength={100}
              disabled={loading}
            />
          </div>

          <label htmlFor="remember" className="flex items-center gap-2 cursor-pointer text-sm text-text-muted select-none">
            <div className="relative">
              <input
                id="remember"
                type="checkbox"
                className="sr-only"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              <div className={`w-4 h-4 rounded border transition-all duration-200 flex items-center justify-center ${
                rememberMe ? 'border-[#A3A3A3] bg-white' : 'border-[#e2e8f0] bg-white'
              }`}>
                {rememberMe && (
                  <svg className="w-2.5 h-2.5 text-[#A3A3A3]" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </div>
            </div>
            <span>Remember Password</span>
          </label>

          <button
            type="submit"
            className="bg-primary-blue text-white border-none py-3.5 rounded-lg text-base font-semibold cursor-pointer transition-colors duration-200 mt-2 hover:bg-primary-blue-hover disabled:bg-[#94a3b8] disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-text-muted">
          Don't have an account?{' '}
          <a href="#" className="text-primary-blue hover:underline">
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
}
