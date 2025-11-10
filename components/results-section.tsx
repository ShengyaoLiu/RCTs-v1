"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, RotateCcw, CheckCircle2, ExternalLink, BookOpen, ArrowLeft, ChevronDown,
  ShieldCheck, Scale, Users, Activity, FlaskConical, Clock3, AlertTriangle, BrainCircuit, DollarSign, XCircle
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import React, { useEffect, useRef, useState } from "react";


interface ResultsSectionProps {
  score: number
  totalQuestions: number
  onRestart: () => void
  onBack: () => void
}

type IntroModuleProps = {
  
  onNavStepChange?: (step: "start" | "video" | "cases" | "victory") => void;
};

const references = [
  {
    title: "Understanding Health Research",
    description: "A comprehensive guide to interpreting medical research for the public",
    url: "https://www.understandinghealthresearch.org/",
    type: "Website",
  },
  {
    title: "Cochrane Library",
    description: "High-quality, independent evidence to inform healthcare decision-making",
    url: "https://www.cochranelibrary.com/",
    type: "Database",
  },

  {
    title: "Testing Treatments Interactive",
    description: "An interactive textbook about fair tests of treatments in health care",
    url: "https://www.testingtreatments.org/",
    type: "Interactive Book",
  },
  {
    title: "NIHR Research Design Service",
    description: "Resources and guidance on research methodology including RCTs",
    url: "https://www.nihr.ac.uk/explore-nihr/support/research-design-service.htm",
    type: "Educational Resource",
  },
]


export default function ResultsSection({ score, totalQuestions, onRestart, onBack, onNavStepChange }: ResultsSectionProps) {
  const percentage = (score / totalQuestions) * 100
  const passed = percentage >= 67 // 2 out of 3

type Point = { title: string; detail: string; icon: React.ReactNode }

  useEffect(() => {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
  onNavStepChange?.("start");
}, [onNavStepChange]);

const strengths = React.useMemo<Point[]>(
  () => [
    {
      title: "Fair split (randomised)",
      detail: "People are put into groups by chance so the groups start off similar. That makes the test fair.",
      icon: <ShieldCheck className="h-4 w-4" aria-hidden />,
    },
    {
      title: "Shows cause and effect",
      detail: "If the two groups end up different, it’s likely because of the treatment, not something else.",
      icon: <Scale className="h-4 w-4" aria-hidden />,
    },
    {
      title: "Blinding reduces bias",
      detail: "When patients and staff don’t know who gets the real treatment, expectations are less likely to sway the results.",
      icon: <Activity className="h-4 w-4" aria-hidden />,
    },
    {
      title: "Clear and checkable",
      detail: "Plans are written in advance and results follow standard checklists, so others can check or repeat the study.",
      icon: <FlaskConical className="h-4 w-4" aria-hidden />,
    },
  ],
  []
);

const weaknesses = React.useMemo<Point[]>(
  () => [
    {
      title: "Takes time and money",
      detail: "Finding volunteers, running visits, and checking data carefully takes a lot of resources.",
      icon: <Clock3 className="h-4 w-4" aria-hidden />,
    },
    {
      title: "Not always possible or fair",
      detail: "Sometimes you can’t randomise or hide treatments—for safety, ethics, or practical reasons.",
      icon: <AlertTriangle className="h-4 w-4" aria-hidden />,
    },
    {
      title: "May not match real life",
      detail: "Trial participants and procedures can differ from everyday care, so results may not reflect everyday clinical practice.",
      icon: <BrainCircuit className="h-4 w-4" aria-hidden />,
    },
    {
      title: "Drop-outs and not sticking to plans",
      detail: "People may miss visits or not take the treatment as planned, which can tilt results.",
      icon: <XCircle className="h-4 w-4" aria-hidden />,
    },
  ],
  []
);



  // independent expand state for each column
  const [openStrength, setOpenStrength] = React.useState<number | null>(null)
  const [openWeakness, setOpenWeakness] = React.useState<number | null>(null)
//const [openKey, setOpenKey] = React.useState<string | null>(null);

// NEW: remember which row was clicked last (e.g., "S-0", "W-2")
const [lastToggled, setLastToggled] = React.useState<string | null>(null);


const EASE: [number, number, number, number] = [0.22, 1, 0.3, 1];
const EXPAND_SEC = 0.8; // tweak as you like

// Remember previous value of a prop
function usePrevious<T>(v: T) {
  const r = React.useRef(v);
  React.useEffect(() => { r.current = v; }, [v]);
  return r.current;
}

type RowProps = {
  point: { title: string; detail: string; icon?: React.ReactNode };
  active: boolean;
  onToggle: () => void;
  animateMe: boolean;            // NEW
};

const Row = function Row({ point, active, onToggle, animateMe }: RowProps) {
  const innerRef = React.useRef<HTMLDivElement>(null);
  const [h, setH] = React.useState(0);

  // Measure only when this row's 'active' changes
  React.useLayoutEffect(() => {
    if (innerRef.current) setH(active ? innerRef.current.scrollHeight : 0);
  }, [active]);

  // Only the clicked row should animate; others snap (duration 0)
  const transition = { duration: animateMe ? EXPAND_SEC : 0, ease: EASE };

  return (
    <li className="rounded-md border border-border bg-card">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={active}
        className={`w-full px-3 py-2 text-left flex items-start gap-2 hover:bg-muted/50 focus:outline-none ${
          active ? "ring-1 ring-primary/30 rounded-md" : ""
        }`}
      >
        {point.icon ? <span className="text-primary mt-0.5">{point.icon}</span> : null}

        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <div className="font-medium text-sm md:text-[15px]">{point.title}</div>
            <motion.svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 text-muted-foreground"
              animate={{ rotate: active ? 180 : 0 }}
              transition={transition}   // rotate only if this row was clicked
            >
              <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </div>

          <motion.div
            style={{ overflow: "hidden" }}
            initial={false}
            animate={{ height: h, opacity: active ? 1 : 0 }}
            transition={transition}    // expand only if this row was clicked
          >
            <div ref={innerRef} className="pt-1 pb-1">
              <p className="text-xs md:text-sm text-muted-foreground">{point.detail}</p>
            </div>
          </motion.div>
        </div>
      </button>
    </li>
  );
};








  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <Button onClick={onBack} variant="ghost" className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="text-center space-y-4">
        <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl">
          <Trophy className="h-12 w-12 text-white" />
        </div>
        <h2 className="text-5xl font-bold text-balance bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {passed ? "Quest Complete!" : "Good Try!"}
        </h2>
        <p className="text-xl text-muted-foreground text-balance">
          {passed
            ? "You've mastered the basics of Randomised Controlled Trials. Well done!"
            : "You've completed the quest. Review and try again to improve!"}
        </p>
      </div>

      <Card className="border-2 border-primary/20 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Your Score</CardTitle>
          <CardDescription>
            You answered {score} out of {totalQuestions} questions correctly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              {score}/{totalQuestions}
            </div>
            <p className="text-sm text-muted-foreground">{passed ? "Excellent work!" : "Keep learning!"}</p>
          </div>

          <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
            <div
              className="h-full transition-all duration-1000 bg-gradient-to-r from-primary to-accent"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* WHAT YOU'VE LEARNED */}
      <Card>
        <CardHeader>
          <CardTitle>What You've Learned</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-sm leading-relaxed">
                What RCTs are and why they're the gold standard in research
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-sm leading-relaxed">
                How RCTs work, including randomisation, control groups, and blinding
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-sm leading-relaxed">
                Why RCTs matter for evidence-based medicine and healthcare decisions
              </span>
            </li>
          </ul>

          {/* subtle divider that matches your theme */}
          <div className="h-px bg-border my-6" />

          {/* STRENGTHS & WEAKNESSES (inside the same card) */}
          <div>
            <h4 className="text-base font-semibold text-foreground/90">Strengths & Weaknesses of Randomised Clinical Trials</h4>
            <p className="text-sm text-muted-foreground mb-7">
			{/*Use this as a quick context check when interpreting your results.*/}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Strengths */}
              <div>
<div className="mb-1 text-s font-semibold tracking-wide text-muted-foreground">
  Strengths:
</div>
<p className="mb-3 -mt-1 text-[14px] text-muted-foreground">
  Why RCTs are the gold standard
</p>

				
                
<ul className="space-y-2">
  {strengths.map((p, i) => {
    const key = `S-${i}`;
    return (
      <Row
        key={key}
        point={p}
        active={openStrength === i}
        animateMe={lastToggled === key}        // NEW
        onToggle={() => {
          setLastToggled(key);                 // NEW
          setOpenStrength(prev => (prev === i ? null : i));
        }}
      />
    );
  })}
</ul>


              </div>

              {/* Weaknesses */}
              <div>
<div className="mb-1 text-s font-semibold tracking-wide text-muted-foreground">
  Weaknesses:
</div>
<p className="mb-3 -mt-1 text-[14px] text-muted-foreground">
  Where care and context are needed
</p>
                
<ul className="space-y-2">
  {weaknesses.map((p, i) => {
    const key = `W-${i}`;
    return (
      <Row
        key={key}
        point={p}
        active={openWeakness === i}
        animateMe={lastToggled === key}        // NEW
        onToggle={() => {
          setLastToggled(key);                 // NEW
          setOpenWeakness(prev => (prev === i ? null : i));
        }}
      />
    );
  })}
</ul>

              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-accent/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-accent" />
            <CardTitle>Want to Learn More?</CardTitle>
          </div>
          <CardDescription>Explore these trusted resources to deepen your understanding</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {references.map((ref, index) => (
              <a
                key={index}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold group-hover:text-accent transition-colors">{ref.title}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{ref.type}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{ref.description}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent flex-shrink-0 mt-1" />
                </div>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4 pt-4">
        <Button onClick={onRestart} variant="outline" size="lg" className="gap-2 shadow-lg bg-transparent">
          <RotateCcw className="h-4 w-4" />
          Restart Quest
        </Button>
      </div>
    </div>
  )
}
