"use client"

import { useState } from "react"
import type { BusinessData } from "@/app/page"

interface SpendingInputProps {
  data: BusinessData
  onUpdate: (data: Partial<BusinessData>) => void
  onNext: () => void
  onPrev: () => void
}

// Industry benchmark savings percentages
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

export default function SpendingInput({ data, onUpdate, onNext, onPrev }: SpendingInputProps) {
  const [period, setPeriod] = useState<"weekly" | "monthly">("monthly")

  const handleSpendingChange = (opportunity: string, value: string) => {
    const numValue = Number.parseFloat(value) || 0
    onUpdate({
      spending: {
        ...data.spending,
        [opportunity]: numValue,
      },
    })
  }

  const calculateSavings = (opportunity: string, spending: number) => {
    const savingsPercentage = savingsData[opportunity] || 60
    return (spending * savingsPercentage) / 100
  }

  const getTotalSpending = () => {
    return Object.values(data.spending).reduce((sum, value) => sum + value, 0)
  }

  const getTotalSavings = () => {
    return Object.entries(data.spending).reduce((sum, [opportunity, spending]) => {
      return sum + calculateSavings(opportunity, spending)
    }, 0)
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Current Spending Analysis</h2>
          <p className="text-indigo-200">
            Enter how much you currently spend on each area to calculate your AI savings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Spending Inputs */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-indigo-300/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Enter Your Current Costs</h3>
                <div className="flex bg-white/10 rounded-lg p-1">
                  <button
                    onClick={() => setPeriod("weekly")}
                    className={`px-3 py-1 rounded text-sm transition-all ${
                      period === "weekly" ? "bg-indigo-500 text-white" : "text-indigo-300 hover:text-white"
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setPeriod("monthly")}
                    className={`px-3 py-1 rounded text-sm transition-all ${
                      period === "monthly" ? "bg-indigo-500 text-white" : "text-indigo-300 hover:text-white"
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {data.aiOpportunities.map((opportunity, index) => {
                  const spending = data.spending[opportunity] || 0
                  const savings = calculateSavings(opportunity, spending)
                  const savingsPercentage = savingsData[opportunity] || 60

                  return (
                    <div key={index} className="bg-white/5 border border-indigo-300/20 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-white font-medium mb-1">{opportunity}</h4>
                          <p className="text-indigo-300 text-sm">
                            AI can save up to {savingsPercentage}% on this task
                            <button className="ml-2 text-indigo-400 hover:text-indigo-300">
                              <span className="text-xs">ℹ️</span>
                            </button>
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-indigo-200 text-sm mb-2">Current {period} cost ($)</label>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={spending || ""}
                            onChange={(e) => handleSpendingChange(opportunity, e.target.value)}
                            className="w-full px-3 py-2 bg-white/10 border border-indigo-300/30 rounded text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="0.00"
                          />
                        </div>

                        <div>
                          <label className="block text-indigo-200 text-sm mb-2">Potential {period} savings</label>
                          <div className="px-3 py-2 bg-green-500/20 border border-green-400/30 rounded text-green-300 font-medium">
                            ${savings.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Live Savings Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-indigo-300/20 sticky top-8">
              <h3 className="text-xl font-semibold text-white mb-6">Live Savings Calculator</h3>

              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-indigo-300 text-sm mb-1">Total Current Spending</div>
                  <div className="text-2xl font-bold text-white">
                    ${getTotalSpending().toFixed(2)}
                    <span className="text-sm text-indigo-300 ml-1">/{period}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-lg p-4">
                  <div className="text-green-300 text-sm mb-1">Potential Savings</div>
                  <div className="text-3xl font-bold text-green-300">
                    ${getTotalSavings().toFixed(2)}
                    <span className="text-sm ml-1">/{period}</span>
                  </div>
                  <div className="text-green-400 text-sm mt-1">
                    {getTotalSpending() > 0
                      ? `${((getTotalSavings() / getTotalSpending()) * 100).toFixed(1)}% savings`
                      : "0% savings"}
                  </div>
                </div>

                <div className="bg-indigo-500/20 border border-indigo-400/30 rounded-lg p-4">
                  <div className="text-indigo-300 text-sm mb-1">Annual Savings Projection</div>
                  <div className="text-2xl font-bold text-indigo-300">
                    ${(getTotalSavings() * (period === "weekly" ? 52 : 12)).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-400/30 rounded-lg">
                <div className="text-yellow-300 text-sm">
                  💡 <strong>Tip:</strong> These calculations are based on industry benchmarks and real AI
                  implementation data.
                </div>
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
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
          >
            View Dashboard →
          </button>
        </div>
      </div>
    </div>
  )
}
