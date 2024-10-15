'use client'

import React, { useState } from 'react'
import axios from 'axios'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitStatus('submitting')
    setErrorMessage('')
    try {
      const response = await axios.post('/api/contact', formData)
      console.log('Form submitted:', response.data)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitStatus('success')
    } catch (error) {
      console.error('Error submitting form:', error.response?.data || error.message)
      setSubmitStatus('error')
      setErrorMessage(error.response?.data?.error || 'An unexpected error occurred. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF8E8]">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#674636] mb-8 text-center">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#F7EED3] rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#674636] mb-4">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#674636]">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-[#FFF8E8] border border-[#AAB396] rounded-md text-[#674636] shadow-sm focus:outline-none focus:ring-[#674636] focus:border-[#674636]"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#674636]">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-[#FFF8E8] border border-[#AAB396] rounded-md text-[#674636] shadow-sm focus:outline-none focus:ring-[#674636] focus:border-[#674636]"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[#674636]">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-[#FFF8E8] border border-[#AAB396] rounded-md text-[#674636] shadow-sm focus:outline-none focus:ring-[#674636] focus:border-[#674636]"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership Opportunities</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#674636]">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-[#FFF8E8] border border-[#AAB396] rounded-md text-[#674636] shadow-sm focus:outline-none focus:ring-[#674636] focus:border-[#674636]"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={submitStatus === 'submitting'}
                className="w-full bg-[#674636] text-[#FFF8E8] hover:bg-[#AAB396] px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#674636] disabled:opacity-50"
              >
                {submitStatus === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
              {submitStatus === 'success' && (
                <p className="text-green-600 text-center">Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-600 text-center">{errorMessage}</p>
              )}
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-[#F7EED3] rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-[#674636] mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#674636]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span className="text-[#674636]">support@eco-actiontracker.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#674636]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span className="text-[#674636]">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#674636]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span className="text-[#674636]">123 Eco Street, Green City, EC 12345</span>
                </div>
              </div>
            </div>

            <div className="bg-[#F7EED3] rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-[#674636] mb-4">Follow Us</h2>
              <div className="flex space-x-4">
                <a href="#" className="text-[#674636] hover:text-[#AAB396]">Facebook</a>
                <a href="#" className="text-[#674636] hover:text-[#AAB396]">Twitter</a>
                <a href="#" className="text-[#674636] hover:text-[#AAB396]">Instagram</a>
                <a href="#" className="text-[#674636] hover:text-[#AAB396]">LinkedIn</a>
              </div>
            </div>

            <div className="bg-[#F7EED3] rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-[#674636] mb-4">FAQs</h2>
              <ul className="list-disc list-inside space-y-2 text-[#674636]">
                <li>How do I create an account?</li>
                <li>Can I track my progress over time?</li>
                <li>How do community challenges work?</li>
                <li>What kind of rewards can I earn?</li>
              </ul>
              <button className="mt-4 text-[#674636] hover:text-[#AAB396] underline">
                View all FAQs
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}