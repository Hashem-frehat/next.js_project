// src/components/LoginForm.js
// src/components/LoginForm.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-[#FFF8E8] rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-[#674636]">Login</h2>
      <div className="mb-4 relative">
        <User className="absolute top-3 left-3 text-[#AAB396]" size={20} />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 pl-10 border border-[#AAB396] rounded focus:outline-none focus:ring-2 focus:ring-[#674636] transition duration-300"
          required
        />
      </div>
      <div className="mb-6 relative">
        <Lock className="absolute top-3 left-3 text-[#AAB396]" size={20} />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 pl-10 border border-[#AAB396] rounded focus:outline-none focus:ring-2 focus:ring-[#674636] transition duration-300"
          required
        />
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        type="submit"
        className="w-full bg-[#674636] text-white py-2 rounded hover:bg-[#AAB396] transition duration-300"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;