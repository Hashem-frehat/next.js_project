import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-[#F7EED3] shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-2 text-[#674636]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <span className="text-xl font-bold">GreenGoals</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link href="/about" className="text-[#674636] hover:text-[#AAB396] transition-colors duration-300">
              About
            </Link>
            <Link href="/products" className="text-[#674636] hover:text-[#AAB396] transition-colors duration-300">
              Products
            </Link>
            <Link href="/challenges" className="text-[#674636] hover:text-[#AAB396] transition-colors duration-300">
              Challenges
            </Link>
            <Link href="/ContactUs" className="text-[#674636] hover:text-[#AAB396] transition-colors duration-300">
              Contact
            </Link>
            <Link href="/Community" className="text-[#674636] hover:text-[#AAB396] transition-colors duration-300">
              Community
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-[#674636] hover:text-[#AAB396] transition-colors duration-300">
              Login
            </button>
            <button className="bg-[#674636] text-[#FFF8E8] hover:bg-[#AAB396] px-4 py-2 rounded transition-colors duration-300">
              Sign Up
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;