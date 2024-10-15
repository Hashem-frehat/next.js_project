// src/app/signup/page.js
import SignupForm from '@/components/SignupForm';
import Navbar from '@/components/Navbar';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8E8] to-[#F7EED3]">
      <Navbar />
      <div className="container mx-auto px-4">
        <SignupForm />
      </div>
    </div>
  );
}