// src/app/login/page.js
import LoginForm from '@/components/LoginForm';
import Navbar from '@/components/Navbar';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8E8] to-[#F7EED3]">
      <Navbar />
      <div className="container mx-auto px-4">
        <LoginForm />
      </div>
    </div>
  );
}