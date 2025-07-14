"use client"

import { useState, useCallback } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import LeadCapture from "@/components/lead-capture"
import IndustrySelection from "@/components/industry-selection"
import AIOpportunities from "@/components/ai-opportunities"
import SpendingInput from "@/components/spending-input"
import SavingsDashboard from "@/components/savings-dashboard"
import ConsultationSetup from "@/components/consultation-setup"

export interface BusinessData {
  businessName: string
  ownerName: string
  email: string
  industry: string
  niche: string
  aiOpportunities: string[]
  spending: Record<string, number>
  selectedConsultationAreas: string[]
}

export default function AppShell() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<BusinessData>({
    businessName: "",
    ownerName: "",
    email: "",
    industry: "",
    niche: "",
    aiOpportunities: [],
    spending: {},
    selectedConsultationAreas: [],
  })

  const update = useCallback((d: Partial<BusinessData>) => setData((p) => ({ ...p, ...d })), [])

  const next = useCallback(() => setStep((p) => Math.min(p + 1, 6)), [])
  const back = useCallback(() => setStep((p) => Math.max(p - 1, 1)), [])

  const segment = [
    <LeadCapture key={1} data={data} onUpdate={update} onNext={next} />,
    <IndustrySelection key={2} data={data} onUpdate={update} onNext={next} onPrev={back} />,
    <AIOpportunities key={3} data={data} onUpdate={update} onNext={next} onPrev={back} />,
    <SpendingInput key={4} data={data} onUpdate={update} onNext={next} onPrev={back} />,
    <SavingsDashboard key={5} data={data} onNext={next} onPrev={back} />,
    <ConsultationSetup key={6} data={data} onUpdate={update} onPrev={back} />,
  ][step - 1]

  return (
    <>
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* progress bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-background/20 backdrop-blur-sm border-b border-border/20">
        <div
          className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
          style={{ width: `${(step / 6) * 100}%` }}
        />
        <div className="px-4 py-3 text-center text-muted-foreground text-sm">Step {step} of 6</div>
      </div>

      <div className="pt-16">{segment}</div>
    </>
  )
}
