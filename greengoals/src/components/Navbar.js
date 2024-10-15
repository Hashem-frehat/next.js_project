// src/components/Navbar.js
"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, LogIn, UserPlus, LogOut } from 'lucide-react';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', { method: 'POST' });
    if (response.ok) {
      router.push('/login');
    }
  };

  return (
    <nav className="bg-[#F7EED3] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-[#674636] font-bold text-xl flex items-center">
          <Home className="mr-2" /> GreenGoals
        </Link>
        <div className="flex space-x-4">
          <Link href="/login" className="text-[#674636] hover:text-[#AAB396] transition duration-300 flex items-center">
            <LogIn className="mr-1" size={18} /> Login
          </Link>
          <Link href="/signup" className="text-[#674636] hover:text-[#AAB396] transition duration-300 flex items-center">
            <UserPlus className="mr-1" size={18} /> Sign Up
          </Link>
          <button onClick={handleLogout} className="text-[#674636] hover:text-[#AAB396] transition duration-300 flex items-center">
            <LogOut className="mr-1" size={18} /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;