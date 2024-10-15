// src/app/dashboard/page.js
import Navbar from '@/components/Navbar';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8E8] to-[#F7EED3]">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#674636] mb-4">Welcome to your Dashboard</h1>
        <p className="text-[#AAB396]">This is where you'll see your green goals and progress.</p>
      </div>
    </div>
  );
}