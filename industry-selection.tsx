"use client"

import { useState } from "react"
import type { BusinessData } from "@/app/page"

interface IndustrySelectionProps {
  data: BusinessData
  onUpdate: (data: Partial<BusinessData>) => void
  onNext: () => void
  onPrev: () => void
}

const industries = [
  {
    name: "Healthcare",
    niches: ["General Practice", "Dental", "Mental Health", "Physical Therapy", "Veterinary"],
  },
  {
    name: "Real Estate",
    niches: ["Residential Sales", "Commercial", "Property Management", "Real Estate Investment"],
  },
  {
    name: "Legal",
    niches: ["Personal Injury", "Family Law", "Corporate Law", "Criminal Defense", "Immigration"],
  },
  {
    name: "Retail",
    niches: ["E-commerce", "Fashion", "Electronics", "Home & Garden", "Automotive"],
  },
  {
    name: "Manufacturing",
    niches: ["Food Processing", "Automotive Parts", "Electronics", "Textiles", "Pharmaceuticals"],
  },
  {
    name: "Professional Services",
    niches: ["Accounting", "Consulting", "Marketing Agency", "IT Services", "Architecture"],
  },
]

export default function IndustrySelection({ data, onUpdate, onNext, onPrev }: IndustrySelectionProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const selectedIndustry = industries.find((ind) => ind.name === data.industry)
  const filteredNiches =
    selectedIndustry?.niches.filter((niche) => niche.toLowerCase().includes(searchTerm.toLowerCase())) || []

  const handleNext = () => {
    if (data.industry && data.niche) {
      onNext()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">What's Your Industry?</h2>
          <p className="text-indigo-200">Help us customize your AI savings calculation</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-indigo-300/20">
          {!data.industry ? (
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Select Your Industry</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {industries.map((industry) => (
                  <button
                    key={industry.name}
                    onClick={() => onUpdate({ industry: industry.name, niche: "" })}
                    className="p-4 bg-white/5 border border-indigo-300/20 rounded-lg text-left hover:bg-white/10 hover:border-indigo-300/40 transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/10"
                  >
                    <div className="text-white font-medium">{industry.name}</div>
                    <div className="text-indigo-300 text-sm mt-1">{industry.niches.length} specializations</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Choose Your Specialization in {data.industry}</h3>
                <button
                  onClick={() => onUpdate({ industry: "", niche: "" })}
                  className="text-indigo-300 hover:text-white transition-colors"
                >
                  Change Industry
                </button>
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search specializations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-indigo-300/30 rounded-lg text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredNiches.map((niche) => (
                  <button
                    key={niche}
                    onClick={() => onUpdate({ niche })}
                    className={`p-4 border rounded-lg text-left transition-all duration-200 transform hover:scale-105 ${
                      data.niche === niche
                        ? "bg-indigo-500/20 border-indigo-400 text-white"
                        : "bg-white/5 border-indigo-300/20 text-indigo-200 hover:bg-white/10 hover:border-indigo-300/40"
                    }`}
                  >
                    {niche}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={onPrev}
              className="px-6 py-3 bg-white/10 text-indigo-200 rounded-lg hover:bg-white/20 transition-all duration-200"
            >
              ← Back
            </button>

            {data.industry && data.niche && (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
              >
                Continue →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
