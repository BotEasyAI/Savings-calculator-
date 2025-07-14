"use client"

import { useState, useEffect } from "react"
import type { BusinessData } from "@/app/page"

interface SavingsDashboardProps {
  data: BusinessData
  onNext: () => void
  onPrev: () => void
}

const savingsData: Record<string, number> = {
  "Lead Qualification & Scoring": 65,
  "Automated Appointment Scheduling": 80,
  "CRM Data Updates & Management": 70,
  "Email Marketing Automation": 75,
  "Client Follow-up Sequences": 85,
  "Document & Contract Review": 60,
  "Case Research & Analysis": 55,
  "Document Drafting & Review": 50,
  "Client Intake Automation": 70,
  "Appointment Scheduling": 80,
  "Invoice & Billing Management": 75,
  "Client Communication Follow-up": 85,
  "Patient Appointment Scheduling": 80,
  "Medical Record Management": 65,
  "Insurance Verification": 70,
  "Prescription Management": 60,
  "Patient Follow-up Communications": 85,
  "Billing & Claims Processing": 75,
  "Customer Service Chatbots": 70,
  "Inventory Management": 60,
  "Order Processing Automation": 75,
  "Personalized Marketing": 65,
  "Returns & Refunds Processing": 80,
  "Product Recommendation Engine": 55,
  "Quality Control Monitoring": 65,
  "Supply Chain Management": 50,
  "Production Scheduling": 60,
  "Inventory Optimization": 55,
  "Compliance Reporting": 70,
  "Equipment Maintenance Scheduling": 65,
  "Data Entry Automation": 85,
  "Invoice Processing": 80,
  "Tax Preparation Assistance": 60,
  "Client Communication": 75,
  "Report Generation": 70,
  "Compliance Monitoring": 65,
}

export default function SavingsDashboard({ data, onNext, onPrev }: SavingsDashboardProps) {
  const [viewPeriod, setViewPeriod] = useState<"daily" | "monthly" | "yearly">("monthly")
  const [animatedTotal, setAnimatedTotal] = useState(0)

  const calculateSavings = (opportunity: string, spending: number) => {
    const savingsPercentage = savingsData[opportunity] || 60
    return (spending * savingsPercentage) / 100
  }

  const getTotalSavings = () => {
    return Object.entries(data.spending).reduce((sum, [opportunity, spending]) => {
      return sum + calculateSavings(opportunity, spending)
    }, 0)
  }

  const getDisplaySavings = () => {
    const monthlySavings = getTotalSavings()
    switch (viewPeriod) {
      case "daily":
        return monthlySavings / 30
      case "yearly":
        return monthlySavings * 12
      default:
        return monthlySavings
    }
  }

  const getSavingsBreakdown = () => {
    return Object.entries(data.spending)
      .map(([opportunity, spending]) => ({
        opportunity,
        spending,
        savings: calculateSavings(opportunity, spending),
        percentage: savingsData[opportunity] || 60,
      }))
      .filter((item) => item.spending > 0)
      .sort((a, b) => b.savings - a.savings)
  }

  // Animated counter effect
  useEffect(() => {
    const target = getDisplaySavings()
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setAnimatedTotal(target)
        clearInterval(timer)
      } else {
        setAnimatedTotal(current)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [viewPeriod, data.spending])

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">Your AI Savings Dashboard</h2>
          <p className="text-indigo-200 text-lg">Here's how much your business can save with AI automation</p>
        </div>

        {/* Main Savings Display */}
        <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-md rounded-3xl p-8 border border-indigo-300/30 mb-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex bg-white/10 rounded-lg p-1">
                {(["daily", "monthly", "yearly"] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setViewPeriod(period)}
                    className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                      viewPeriod === period
                        ? "bg-indigo-500 text-white shadow-lg"
                        : "text-indigo-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-2">
                ${animatedTotal.toFixed(2)}
              </div>
              <div className="text-xl text-green-300 font-medium">Potential {viewPeriod} savings</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-white">${(getTotalSavings() * 12).toFixed(2)}</div>
                <div className="text-indigo-300">Annual Savings</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-white">{getSavingsBreakdown().length}</div>
                <div className="text-indigo-300">AI Opportunities</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-white">
                  {Object.values(data.spending).reduce((sum, val) => sum + val, 0) > 0
                    ? `${((getTotalSavings() / Object.values(data.spending).reduce((sum, val) => sum + val, 0)) * 100).toFixed(1)}%`
                    : "0%"}
                </div>
                <div className="text-indigo-300">Average Savings</div>
              </div>
            </div>
          </div>
        </div>

        {/* Savings Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-indigo-300/20">
            <h3 className="text-xl font-semibold text-white mb-6">Savings Breakdown</h3>
            <div className="space-y-4">
              {getSavingsBreakdown().map((item, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-medium text-sm">{item.opportunity}</h4>
                    <div className="text-green-300 font-bold">${item.savings.toFixed(2)}/mo</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-indigo-300">Current: ${item.spending.toFixed(2)}/mo</span>
                    <span className="text-green-400">{item.percentage}% savings</span>
                  </div>
                  <div className="mt-2 bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Chart */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-indigo-300/20">
            <h3 className="text-xl font-semibold text-white mb-6">Savings Visualization</h3>
            <div className="space-y-4">
              {getSavingsBreakdown()
                .slice(0, 6)
                .map((item, index) => {
                  const maxSavings = Math.max(...getSavingsBreakdown().map((i) => i.savings))
                  const width = (item.savings / maxSavings) * 100

                  return (
                    <div key={index} className="relative">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-indigo-300 truncate pr-2">{item.opportunity}</span>
                        <span className="text-green-300 font-medium">${item.savings.toFixed(2)}</span>
                      </div>
                      <div className="bg-white/10 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
            </div>

            <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-400/30 rounded-lg">
              <div className="text-indigo-300 text-sm">
                📊 <strong>Data Source:</strong> Savings percentages based on industry studies from McKinsey, Deloitte,
                and real AI implementation case studies.
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={onPrev}
            className="px-6 py-3 bg-white/10 text-indigo-200 rounded-lg hover:bg-white/20 transition-all duration-200"
          >
            ← Back
          </button>

          <button
            onClick={onNext}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 text-lg"
          >
            Book Free Consultation →
          </button>
        </div>
      </div>
    </div>
  )
}
