"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Video, Trophy } from "lucide-react"
import IntroductionSection from "@/components/introduction-section"
import VideoQuizModule from "@/components/video-quiz-module"
import ResultsSection from "@/components/results-section"



export default function RCTLearningModule() {
  
  const [currentStep, setCurrentStep] = useState(0)
  const [moduleScores, setModuleScores] = useState<{ [key: number]: boolean }>({})
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const steps = [
    { id: 0, title: "Start", icon: Sparkles },
    { id: 1, title: "What", icon: Video },
    { id: 2, title: "How", icon: Video },
    { id: 3, title: "Why", icon: Video },
    { id: 4, title: "Victory", icon: Trophy },
  ]

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep])
    }
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleModuleComplete = (moduleIndex: number, isCorrect: boolean) => {
    setModuleScores({ ...moduleScores, [moduleIndex]: isCorrect })
    handleNext()
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setModuleScores({})
    setCompletedSteps([])
  }

  const progress = (currentStep / (steps.length - 1)) * 100
  const totalCorrect = Object.values(moduleScores).filter(Boolean).length

	  // ⬇️ add this effect
  useEffect(() => {
    // instant jump (reliable). Use behavior: 'smooth' if you prefer.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">RCTs Quest</h1>
              <p className="text-sm text-muted-foreground">Unlock the secrets of clincial trials</p>
            </div>
            <div className="flex items-center gap-2">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                      currentStep === index
                        ? "bg-primary text-primary-foreground scale-110 shadow-lg"
                        : completedSteps.includes(index)
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium hidden md:inline">{step.title}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentStep === 0 && <IntroductionSection onNext={handleNext} />}
        {currentStep === 1 && (
          <VideoQuizModule
            moduleIndex={0}
            title="What Are RCTs?"
            videoTitle="The Basics of Randomised Controlled Trials"
            onComplete={handleModuleComplete}
            onBack={handleBack}
			transcript={`[00:00] In this video, we explain what an RCT is...
[00:12] An RCT is a fair test where people are assigned by chance...
[01:04] Why this matters for everyday healthcare decisions...`}
          />
        )}
        {currentStep === 2 && (
          <VideoQuizModule
            moduleIndex={1}
            title="How Do RCTs Work?"
            videoTitle="The RCT Process Step-by-Step"
            onComplete={handleModuleComplete}
            onBack={handleBack}
			transcript={`[00:00] In this video, we explain what an RCT is...
[00:12] An RCT is a fair test where people are assigned by chance...
[01:04] Why this matters for everyday healthcare decisions...`}
          />
        )}
        {currentStep === 3 && (
          <VideoQuizModule
            moduleIndex={2}
            title="Why Do RCTs Matter?"
            videoTitle="The Impact of RCTs on Healthcare"
            onComplete={handleModuleComplete}
            onBack={handleBack}
			transcript={`[00:00] In this video, we explain what an RCT is...
[00:12] An RCT is a fair test where people are assigned by chance...
[01:04] Why this matters for everyday healthcare decisions...`}
          />
        )}
{currentStep === 4 && (
  <>
    <ResultsSection
      score={totalCorrect}
      totalQuestions={3}
      onRestart={handleRestart}
      onBack={handleBack}
    />


  </>
)}

      </main>
    </div>
  )
}
