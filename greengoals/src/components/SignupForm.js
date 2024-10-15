// src/components/SignupForm.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, Mail } from 'lucide-react';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    if (response.ok) {
      router.push('/login');
    } else {
      // Handle error
      console.error('Signup failed');
    }


    if (response.ok) {
      const data = await response.json(); // Get the response data
      sessionStorage.setItem('user', JSON.stringify(data.user)); // Store user data in session storage
      router.push('/login'); // Redirect to the login page
    } else {
      // Handle error
      const errorData = await response.json();
      console.error('Signup failed:', errorData.message);
    }
    
  };
  

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-[#FFF8E8] rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-[#674636]">Sign Up</h2>
      <div className="mb-4 relative">
        <User className="absolute top-3 left-3 text-[#AAB396]" size={20} />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 pl-10 border border-[#AAB396] rounded focus:outline-none focus:ring-2 focus:ring-[#674636] transition duration-300"
          required
        />
      </div>
      <div className="mb-4 relative">
        <Mail className="absolute top-3 left-3 text-[#AAB396]" size={20} />
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
      <button
        type="submit"
        className="w-full bg-[#674636] text-white py-2 rounded hover:bg-[#AAB396] transition duration-300"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;