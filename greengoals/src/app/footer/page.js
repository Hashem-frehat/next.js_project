import React from 'react'

const Footer = () => {
  return (
    <div>
              <footer className="bg-[#674636] text-[#FFF8E8] py-8">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <p className="text-sm">GreenGoals is dedicated to promoting sustainable living and environmental consciousness.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm space-y-1">
              <li><a href="#" className="hover:text-[#AAB396]">Home</a></li>
              <li><a href="#" className="hover:text-[#AAB396]">Features</a></li>
              <li><a href="#" className="hover:text-[#AAB396]">Marketplace</a></li>
              <li><a href="#" className="hover:text-[#AAB396]">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#AAB396]">Facebook</a>
              <a href="#" className="hover:text-[#AAB396]">Twitter</a>
              <a href="#" className="hover:text-[#AAB396]">Instagram</a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 text-center text-sm">
          <p>&copy; 2023 Eco-Action Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
