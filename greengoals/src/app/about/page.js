import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#FFF8E8]">


      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#674636] mb-8 text-center">About Eco-Action Tracker</h1>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#674636] mb-4">Our Mission</h2>
          <p className="text-lg text-[#674636] mb-4">
            At Eco-Action Tracker, our mission is to empower individuals and communities to take meaningful action against climate change. We believe that small, consistent actions can lead to significant positive impacts on our environment.
          </p>
          <p className="text-lg text-[#674636]">
            Through our platform, we aim to educate, motivate, and track eco-friendly actions, fostering a global community committed to sustainable living and environmental stewardship.
          </p>
        </section>

        <section className="mb-16 bg-[#F7EED3] rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-semibold text-[#674636] mb-4">Our Story</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <p className="text-lg text-[#674636] mb-4">
                Eco-Action Tracker was founded in 2020 by a group of environmental enthusiasts who recognized the need for a user-friendly platform to encourage and track eco-friendly actions.
              </p>
              <p className="text-lg text-[#674636]">
                What started as a small project among friends quickly grew into a global movement, connecting like-minded individuals passionate about making a difference in their daily lives and communities.
              </p>
            </div>
            <div className="md:w-1/2">
              <Image 
                src="/placeholder.svg" 
                alt="Eco-Action Tracker founders" 
                width={500} 
                height={300} 
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#674636] mb-8 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Sustainability", description: "We promote sustainable practices in all aspects of life, from individual choices to community initiatives." },
              { title: "Education", description: "We believe in the power of knowledge and strive to provide accurate, up-to-date information on environmental issues and solutions." },
              { title: "Community", description: "We foster a supportive community where members can share ideas, challenges, and successes in their eco-friendly journeys." },
              { title: "Innovation", description: "We continuously seek innovative ways to tackle environmental challenges and improve our platform." },
              { title: "Transparency", description: "We are committed to being open about our operations, partnerships, and the impact of our collective actions." },
              { title: "Inclusivity", description: "We welcome and value diverse perspectives, recognizing that environmental issues affect us all." },
            ].map((value, index) => (
              <div key={index} className="bg-[#F7EED3] rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-[#674636] mb-2">{value.title}</h3>
                <p className="text-[#674636]">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#674636] mb-8 text-center">Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: "Jane Doe", role: "Founder & CEO", image: "/placeholder.svg" },
              { name: "John Smith", role: "CTO", image: "/placeholder.svg" },
              { name: "Emily Brown", role: "Head of Sustainability", image: "/placeholder.svg" },
              { name: "Michael Chen", role: "Community Manager", image: "/placeholder.svg" },
            ].map((member, index) => (
              <div key={index} className="bg-[#F7EED3] rounded-lg shadow-md p-6 text-center">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  width={150} 
                  height={150} 
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-[#674636] mb-1">{member.name}</h3>
                <p className="text-[#674636]">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 bg-[#F7EED3] rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-semibold text-[#674636] mb-4">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-[#674636] mb-2">1M+</p>
              <p className="text-lg text-[#674636]">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#674636] mb-2">5M+</p>
              <p className="text-lg text-[#674636]">Eco-Actions Tracked</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#674636] mb-2">100K+</p>
              <p className="text-lg text-[#674636]">Trees Planted</p>
            </div>
          </div>
          <p className="text-lg text-[#674636] mt-8 text-center">
            Together, we're making a measurable difference in the fight against climate change.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#674636] mb-8 text-center">Our Partners</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((partner) => (
              <div key={partner} className="bg-[#F7EED3] rounded-lg shadow-md p-6 flex items-center justify-center">
                <Image 
                  src="/placeholder.svg" 
                  alt={`Partner ${partner}`} 
                  width={150} 
                  height={75} 
                  className="max-w-full h-auto"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-[#674636] mb-6">Join Our Mission</h2>
          <p className="text-lg text-[#674636] mb-8">
            Be part of the change. Start tracking your eco-friendly actions and inspire others to do the same.
          </p>
          <Link 
            href="/signup" 
            className="bg-[#674636] text-[#FFF8E8] hover:bg-[#AAB396] px-6 py-3 rounded-lg text-lg inline-flex items-center"
          >
            Get Started
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </section>
      </main>


    </div>
  )
}