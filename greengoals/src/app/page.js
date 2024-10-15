'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Header from './navbar/page'

export default function Home() {
  const [progress, setProgress] = useState(65)

  return (
    <div className="min-h-screen bg-[#FFF8E8]">
  <div>
  <Header/>
  </div>

      <main className="container mx-auto px-4 py-8">
        <section className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl font-bold text-[#674636] mb-4">Track Your Eco-Friendly Actions</h1>
            <p className="text-xl text-[#674636] mb-6">Join our community and make a positive impact on the environment!</p>
            <button className="bg-[#674636] text-[#FFF8E8] hover:bg-[#AAB396] px-6 py-3 rounded-lg text-lg flex items-center">
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
          <div className="md:w-1/2 relative">
            <Image 
              src="https://img.freepik.com/premium-vector/volunteers-keeping-waste-animation-save-world-save-environment-backgrounddoodle-cartoon-hand-drawn_40876-3198.jpg"
              alt="Eco-friendly lifestyle"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
            <Image 
              src="https://media.istockphoto.com/id/1427272111/vector/exchange-books-or-bookcrossing-hands-giving-books-concept-of-books-lovers-education-reading.jpg?s=612x612&w=0&k=20&c=yZR2vY21XhR7opF9WL5qvGE0i0Hm45f1uzjIV-sQXWk="
              alt="Sustainable actions"
              width={300}
              height={200}
              className="absolute -bottom-8 -left-8 rounded-lg shadow-lg opacity-70 border-4 border-[#FFF8E8]"
            />
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#F7EED3] rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#674636] mb-4">Current Community Challenge</h2>
            <p className="text-[#674636] mb-4">Eliminate 10,000 plastic bottles</p>
            <div className="w-full bg-[#AAB396] rounded-full h-2.5">
              <div className="bg-[#674636] h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-sm text-[#674636] mt-2">
              65% completed! We've already prevented over 6,500 bottles from entering the ocean!
            </p>
          </div>
          <div className="bg-[#F7EED3] rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#674636] mb-4">Join the Movement</h2>
            <p className="text-[#674636] mb-4">Sign up now and start making a difference!</p>
            <form className="flex flex-col space-y-4">
              <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded border border-[#AAB396] bg-[#FFF8E8] text-[#674636]" />
              <button type="submit" className="bg-[#674636] text-[#FFF8E8] hover:bg-[#AAB396] px-4 py-2 rounded">
                Sign Up
              </button>
            </form>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#674636] mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z", title: "Join Challenges", description: "Participate in community eco-challenges" },
              { icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25", title: "Log Actions", description: "Record your daily eco-friendly activities" },
              { icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z", title: "Track Progress", description: "Monitor your environmental impact" },
              { icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z", title: "Earn Rewards", description: "Get badges and discounts for your efforts" },
            ].map((item, index) => (
              <div key={index} className="bg-[#F7EED3] rounded-lg shadow-md p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-[#674636] mx-auto mb-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <h3 className="text-xl font-semibold text-[#674636] mb-2">{item.title}</h3>
                <p className="text-[#674636]">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#674636] mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Personal Dashboard", description: "Track your progress, set goals, and view your environmental impact." },
              { title: "Community Challenges", description: "Join forces with others to achieve larger environmental goals." },
              { title: "Educational Resources", description: "Access tips, articles, and webinars on sustainable living." },
              { title: "Eco-Friendly Marketplace", description: "Discover and purchase sustainable products from vetted sellers." },
            ].map((feature, index) => (
              <div key={index} className="bg-[#F7EED3] rounded-lg shadow-md p-6 flex items-start space-x-4">
                <Image src="/placeholder.svg" alt={feature.title} width={80} height={80} className="rounded-full" />
                <div>
                  <h3 className="text-xl font-semibold text-[#674636] mb-2">{feature.title}</h3>
                  <p className="text-[#674636]">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#F7EED3] rounded-lg shadow-md p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-2xl font-semibold text-[#674636] mb-4">Eco-Friendly Marketplace</h2>
              <p className="text-[#674636] mb-4">
                Discover sustainable products and support eco-conscious businesses. Earn discounts through your eco-actions!
              </p>
              <button className="text-[#674636] border border-[#674636] hover:bg-[#AAB396] hover:text-[#FFF8E8] px-4 py-2 rounded flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                Explore Marketplace
              </button>
            </div>
            <Image src="https://www.thesustainablemarketplace.co.uk/cdn/shop/files/1_starterpack_premium_600x.jpg?v=1623284280" alt="Eco-friendly products" width={300} height={200} className="rounded-lg shadow-md" />
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-[#674636] mb-6">Ready to Make a Difference?</h2>
          <button className="bg-[#674636] text-[#FFF8E8] hover:bg-[#AAB396] px-6 py-3 rounded-lg text-lg flex items-center mx-auto">
            Join Eco-Action Tracker
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0  0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </section>
      </main>

    </div>
  )
}