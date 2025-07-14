"use client"

import { useEffect } from "react"
import type { BusinessData } from "@/app/page"

interface AIOpportunitiesProps {
  data: BusinessData
  onUpdate: (data: Partial<BusinessData>) => void
  onNext: () => void
  onPrev: () => void
}

const aiOpportunities: Record<string, Record<string, string[]>> = {
  "Real Estate": {
    "Residential Sales": [
      "Lead Qualification & Scoring",
      "Automated Appointment Scheduling",
      "CRM Data Updates & Management",
      "Email Marketing Automation",
      "Client Follow-up Sequences",
      "Document & Contract Review",
    ],
    Commercial: [
      "Market Analysis & Reporting",
      "Property Valuation Automation",
      "Client Communication Management",
      "Deal Pipeline Tracking",
      "Financial Analysis Automation",
      "Lease Agreement Processing",
    ],
  },
  Legal: {
    "Personal Injury": [
      "Case Research & Analysis",
      "Document Drafting & Review",
      "Client Intake Automation",
      "Appointment Scheduling",
      "Invoice & Billing Management",
      "Client Communication Follow-up",
    ],
    "Family Law": [
      "Document Preparation",
      "Case Timeline Management",
      "Client Consultation Scheduling",
      "Court Filing Automation",
      "Client Progress Updates",
      "Legal Research Assistance",
    ],
  },
  Healthcare: {
    "General Practice": [
      "Patient Appointment Scheduling",
      "Medical Record Management",
      "Insurance Verification",
      "Prescription Management",
      "Patient Follow-up Communications",
      "Billing & Claims Processing",
    ],
    Dental: [
      "Appointment Scheduling & Reminders",
      "Treatment Plan Creation",
      "Insurance Claims Processing",
      "Patient Communication",
      "Inventory Management",
      "Follow-up Care Coordination",
    ],
  },
  Retail: {
    "E-commerce": [
      "Customer Service Chatbots",
      "Inventory Management",
      "Order Processing Automation",
      "Personalized Marketing",
      "Returns & Refunds Processing",
      "Product Recommendation Engine",
    ],
  },
  Manufacturing: {
    "Food Processing": [
      "Quality Control Monitoring",
      "Supply Chain Management",
      "Production Scheduling",
      "Inventory Optimization",
      "Compliance Reporting",
      "Equipment Maintenance Scheduling",
    ],
  },
  "Professional Services": {
    Accounting: [
      "Data Entry Automation",
      "Invoice Processing",
      "Tax Preparation Assistance",
      "Client Communication",
      "Report Generation",
      "Compliance Monitoring",
    ],
  },
}

export default function AIOpportunities({ data, onUpdate, onNext, onPrev }: AIOpportunitiesProps) {
  useEffect(() => {
    const opportunities = aiOpportunities[data.industry]?.[data.niche] || []
    if (opportunities.join("|") !== data.aiOpportunities.join("|")) {
      onUpdate({ aiOpportunities: opportunities })
    }
    // onUpdate is memo-stable, safe to include:
  }, [data.industry, data.niche, data.aiOpportunities, onUpdate])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">AI Integration Opportunities</h2>
          <p className="text-indigo-200">Here are the key areas where AI can transform your {data.niche} business</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-indigo-300/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.aiOpportunities.map((opportunity, index) => (
              <div
                key={index}
                className="bg-white/5 border border-indigo-300/20 rounded-lg p-6 hover:bg-white/10 hover:border-indigo-300/40 transition-all duration-200 transform hover:scale-105"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">{opportunity}</h3>
                    <p className="text-indigo-300 text-sm">
                      Automate and optimize this process with AI to save time and reduce costs
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-indigo-500/10 border border-indigo-400/30 rounded-lg">
            <div className="flex items-center mb-3">
              <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-xs">💡</span>
              </div>
              <h4 className="text-white font-semibold">Why These Areas?</h4>
            </div>
            <p className="text-indigo-200 text-sm">
              These opportunities are specifically selected based on industry research and successful AI implementations
              in {data.niche} businesses. Each area represents significant potential for cost savings and efficiency
              improvements.
            </p>
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
              Calculate Savings →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
