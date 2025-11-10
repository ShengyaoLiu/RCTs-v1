"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Zap, Target, Sparkles } from "lucide-react"
import React, { useEffect } from "react";

interface IntroductionSectionProps {
  onNext: () => void
}

type IntroModuleProps = {
  onStart: () => void;
  onNavStepChange?: (step: "start" | "video" | "cases" | "victory") => void;
};



export default function IntroductionSection({ onNext, onNavStepChange }: IntroductionSectionProps) {
	  
  
  useEffect(() => {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
  onNavStepChange?.("start");
}, [onNavStepChange]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          Interactive Learning Adventure
        </div>
        <h2 className="text-5xl font-bold text-balance bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Discover the Power of 
		  </h2>
		  <h2 className="text-5xl font-bold text-balance bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Randomised Clinical Trials (RCTs)
		  
        </h2>
        <p className="text-xl text-muted-foreground text-balance">
          Join us on an exciting journey to understand how scientists prove what really works in medicine
        </p>
      </div>

      <Card className="border-2 border-primary/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Your Mission</CardTitle>
          <CardDescription>Complete 1 video challenge and prove your knowledge</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3 p-4 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Level 1: What</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Discover what RCTs are and why they're the gold standard
              </p>
            </div>

            <div className="space-y-3 p-4 rounded-lg bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20">
              <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Target className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg">Level 2: How</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Learn the step-by-step process of running an RCT
              </p>
            </div>

            <div className="space-y-3 p-4 rounded-lg bg-gradient-to-br from-chart-3/5 to-chart-3/10 border border-chart-3/20">
              <div className="h-12 w-12 rounded-lg bg-chart-3/20 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-chart-3" />
              </div>
              <h3 className="font-semibold text-lg">Level 3: Why</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Understand the real-world impact on healthcare
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary-foreground">1</span>
              </div>
              <p className="text-sm leading-relaxed">Watch a short video explaining key concepts</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary-foreground">2</span>
              </div>
              <p className="text-sm leading-relaxed">Explore two real-world cases reveal the power and limits of RCTs</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary-foreground">3</span>
              </div>
              <p className="text-sm leading-relaxed">Answer questions to test your understanding and get instant feedback</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary-foreground">4</span>
              </div>
              <p className="text-sm leading-relaxed">Learn all 3 points to build a solid RCT foundation</p>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-center pt-4">
        <Button onClick={onNext} size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-all">
          Start Your Quest
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
