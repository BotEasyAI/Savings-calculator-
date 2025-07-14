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

import AppShell from "@/components/app-shell" // NEW wrapper
import AnimatedBackgroundWrapper from "@/components/animated-background-wrapper"

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackgroundWrapper />
      <AppShell /> {/* all interactive logic lives here */}
    </div>
  )
}
