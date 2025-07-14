"use client"

import type React from "react"

import { useState } from "react"
import type { BusinessData } from "@/app/page"

interface LeadCaptureProps {
  data: BusinessData
  onUpdate: (data: Partial<BusinessData>) => void
  onNext: () => void
}

export default function LeadCapture({ data, onUpdate, onNext }: LeadCaptureProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    try {
      // Replace with actual API endpoint
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_API_KEY", // Replace with actual API key
        },
        body: JSON.stringify({
          businessName: data.businessName,
          ownerName: data.ownerName,
          email: data.email,
        }),
      })

      if (response.ok) {
        onNext()
      }
    } catch (error) {
      console.error("Error submitting lead:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Calculate Your AI Savings</h1>
          <p className="text-indigo-200 text-lg">Discover how much money your business can save with AI automation</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-indigo-300/20">
            <div className="space-y-6">
              <div>
                <label className="block text-indigo-200 text-sm font-medium mb-2">Business Name</label>
                <input
                  type="text"
                  required
                  value={data.businessName}
                  onChange={(e) => onUpdate({ businessName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-indigo-300/30 rounded-lg text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your business name"
                />
              </div>

              <div>
                <label className="block text-indigo-200 text-sm font-medium mb-2">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={data.ownerName}
                  onChange={(e) => onUpdate({ ownerName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-indigo-300/30 rounded-lg text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-indigo-200 text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={data.email}
                  onChange={(e) => onUpdate({ email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-indigo-300/30 rounded-lg text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !data.businessName || !data.ownerName || !data.email}
              className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                "Get Started →"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
