"use client"

import { useState } from "react"
import type { BusinessData } from "@/app/page"

interface ConsultationSetupProps {
  data: BusinessData
  onUpdate: (data: Partial<BusinessData>) => void
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

export default function ConsultationSetup({ data, onUpdate, onPrev }: ConsultationSetupProps) {
  const [showCalendar, setShowCalendar] = useState(false)
  // Remove these state variables:
  // const [selectedDate, setSelectedDate] = useState("")
  // const [selectedTime, setSelectedTime] = useState("")
  const [isBooking, setIsBooking] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)

  const calculateSavings = (opportunity: string, spending: number) => {
    const savingsPercentage = savingsData[opportunity] || 60
    return (spending * savingsPercentage) / 100
  }

  const getOpportunitiesWithSavings = () => {
    return data.aiOpportunities
      .map((opportunity) => ({
        opportunity,
        spending: data.spending[opportunity] || 0,
        savings: calculateSavings(opportunity, data.spending[opportunity] || 0),
      }))
      .filter((item) => item.spending > 0)
      .sort((a, b) => b.savings - a.savings)
  }

  const handleAreaToggle = (opportunity: string) => {
    const current = data.selectedConsultationAreas || []
    const updated = current.includes(opportunity)
      ? current.filter((area) => area !== opportunity)
      : [...current, opportunity]

    onUpdate({ selectedConsultationAreas: updated })
  }

  // Update the handleBookConsultation function to be simpler:
  const handleBookConsultation = async () => {
    setIsBooking(true)

    try {
      const bookingData = {
        businessName: data.businessName,
        ownerName: data.ownerName,
        email: data.email,
        selectedAreas: data.selectedConsultationAreas,
        totalPotentialSavings: getOpportunitiesWithSavings().reduce((sum, item) => sum + item.savings, 0),
      }

      console.log("Consultation areas selected:", bookingData)
      setBookingComplete(true)
    } catch (error) {
      console.error("Booking error:", error)
    } finally {
      setIsBooking(false)
    }
  }

  const getTotalSelectedSavings = () => {
    return (data.selectedConsultationAreas || []).reduce((sum, area) => {
      const spending = data.spending[area] || 0
      return sum + calculateSavings(area, spending)
    }, 0)
  }

  if (bookingComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-indigo-300/20">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">✓</span>
            </div>

            <h2 className="text-3xl font-bold text-white mb-4">Consultation Booked Successfully!</h2>

            <p className="text-indigo-200 text-lg mb-8">
              Thank you, {data.ownerName}! We've sent a confirmation email to {data.email} with your appointment
              details.
            </p>

            <div className="bg-indigo-500/20 border border-indigo-400/30 rounded-xl p-6 mb-8">
              <h3 className="text-white font-semibold mb-4">Your Appointment Details</h3>
              {/* In the booking complete section, remove the date/time display and update to: */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-indigo-300">Calendar</div>
                  <div className="text-white font-medium">Check your email for appointment details</div>
                </div>
                <div>
                  <div className="text-indigo-300">Focus Areas</div>
                  <div className="text-white font-medium">{(data.selectedConsultationAreas || []).length} selected</div>
                </div>
                <div>
                  <div className="text-indigo-300">Potential Monthly Savings</div>
                  <div className="text-green-300 font-bold">${getTotalSelectedSavings().toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-indigo-300">Annual Savings Potential</div>
                  <div className="text-green-300 font-bold">${(getTotalSelectedSavings() * 12).toFixed(2)}</div>
                </div>
              </div>
            </div>

            <div className="text-indigo-300 text-sm">
              We'll call you 5 minutes before your scheduled time. Have your current processes and pain points ready to
              discuss!
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Book Your Free AI Consultation</h2>
          <p className="text-indigo-200">
            Select the areas you'd like to focus on and schedule your personalized consultation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Area Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-indigo-300/20">
              <h3 className="text-xl font-semibold text-white mb-6">Select Areas for Consultation</h3>

              <div className="space-y-3">
                {getOpportunitiesWithSavings().map((item, index) => (
                  <div key={index} className="bg-white/5 border border-indigo-300/20 rounded-lg p-4">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(data.selectedConsultationAreas || []).includes(item.opportunity)}
                        onChange={() => handleAreaToggle(item.opportunity)}
                        className="mt-1 mr-4 w-5 h-5 text-indigo-500 bg-white/10 border-indigo-300/30 rounded focus:ring-indigo-400 focus:ring-2"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-medium">{item.opportunity}</h4>
                          <div className="text-green-300 font-bold">${item.savings.toFixed(2)}/mo savings</div>
                        </div>
                        <div className="text-indigo-300 text-sm">
                          Current spending: ${item.spending.toFixed(2)}/month
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>

              {!showCalendar && (
                <button
                  onClick={() => setShowCalendar(true)}
                  disabled={(data.selectedConsultationAreas || []).length === 0}
                  className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
                >
                  Book Free AI Consultation →
                </button>
              )}
            </div>

            {/* Calendar Interface */}
            {showCalendar && (
              <div className="mt-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-indigo-300/20">
                <h3 className="text-xl font-semibold text-white mb-6">Schedule Your Free AI Consultation</h3>

                <div className="bg-white rounded-lg p-2 mb-6">
                  <iframe
                    src="https://calendly.com/boteasyai/30min"
                    width="100%"
                    height="700"
                    frameBorder="0"
                    className="rounded-lg"
                    title="Schedule Consultation"
                  />
                </div>

                <div className="bg-indigo-500/20 border border-indigo-400/30 rounded-lg p-4 mb-4">
                  <div className="text-indigo-300 text-sm">
                    📅 <strong>Easy Booking:</strong> Select your preferred time slot above. You'll receive an instant
                    confirmation email with meeting details and a calendar invite.
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-indigo-300 text-sm mb-1">Meeting Duration</div>
                    <div className="text-white font-medium">30 minutes</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-indigo-300 text-sm mb-1">Meeting Type</div>
                    <div className="text-white font-medium">Video Call</div>
                  </div>
                </div>

                <button
                  onClick={() => setBookingComplete(true)}
                  className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25"
                >
                  I've Scheduled My Consultation ✓
                </button>
              </div>
            )}
          </div>

          {/* Consultation Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-indigo-300/20 sticky top-8">
              <h3 className="text-xl font-semibold text-white mb-6">Consultation Summary</h3>

              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-indigo-300 text-sm mb-1">Business</div>
                  <div className="text-white font-medium">{data.businessName}</div>
                  <div className="text-indigo-300 text-sm">
                    {data.industry} - {data.niche}
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-indigo-300 text-sm mb-1">Selected Areas</div>
                  <div className="text-white font-bold text-lg">
                    {(data.selectedConsultationAreas || []).length} areas
                  </div>
                  <div className="text-indigo-300 text-sm">
                    {(data.selectedConsultationAreas || []).length > 0
                      ? "Ready for consultation"
                      : "Select areas above"}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-lg p-4">
                  <div className="text-green-300 text-sm mb-1">Focus Area Savings</div>
                  <div className="text-2xl font-bold text-green-300">
                    ${getTotalSelectedSavings().toFixed(2)}
                    <span className="text-sm">/month</span>
                  </div>
                  <div className="text-green-400 text-sm">${(getTotalSelectedSavings() * 12).toFixed(2)} annually</div>
                </div>

                <div className="bg-indigo-500/20 border border-indigo-400/30 rounded-lg p-4">
                  <div className="text-indigo-300 text-sm mb-2">What to Expect:</div>
                  <ul className="text-indigo-200 text-sm space-y-1">
                    <li>• 30-minute personalized consultation</li>
                    <li>• Custom AI implementation roadmap</li>
                    <li>• ROI projections for your business</li>
                    <li>• Next steps and timeline</li>
                  </ul>
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
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
