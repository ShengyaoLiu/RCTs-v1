"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, CheckCircle2, Pause, Play, Sparkles, XCircle, ChevronDown } from "lucide-react";
import ExploreStrengthsLimitations from "@/components/explore-strengths-limitations";




type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

type Props = {
  title: string;
  videoTitle: string;
  onBack: () => void;
  onComplete: (correctCount: number, total: number) => void;
  onNavStepChange?: (step: "start" | "video" | "cases" | "victory") => void;
  transcript?: string | React.ReactNode;
  questions: Question[];
  onNavStepChange?: (step: "start" | "video" | "cases" | "victory") => void; // ← add this
};

export default function MultiQuestionModule({
  title,
  videoTitle,
  onBack,
  onComplete,
  transcript,
  questions,
  onNavStepChange, // 👈 include it
}: Props) {
  
  // --- video state ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasWatched, setHasWatched] = useState(false);
  const [step, setStep] = useState<"video" | "quiz">("video");
  const [canContinue, setCanContinue] = useState(false);

 // current question index

  // --- quiz state ---
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | undefined)[]>(() =>
    Array(questions.length).fill(undefined)
  );
  const [selected, setSelected] = useState<number | null>(null); // <— NEW: only current question
  const [showFeedback, setShowFeedback] = useState(false);

const videoRef = useRef<HTMLVideoElement | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

const isVideoBlock = index <= 1; // first two questions
const blockPosition = isVideoBlock ? index + 1 : index - 1; // 1-2, then 1-2
const blockTotal = 2;
const blockLabel = isVideoBlock ? "Questions on Video: " : "Questions on Cases: ";


  const current = questions[index];
  const isCorrect = selected === current.correctIndex;
  
const [showExplore, setShowExplore] = useState(false);
const [exploreDone, setExploreDone] = useState(false);

useEffect(() => {
  // When we enter this module (from intro), start at top & show Video in nav
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
  onNavStepChange?.("video");
}, [onNavStepChange]);



  // When question index changes, show its saved answer if any; otherwise clear selection
  useEffect(() => {
    setSelected(answers[index] ?? null);
    setShowFeedback(false);
  }, [index]); // eslint-disable-line

  // Confetti on correct (respect reduced-motion)
  useEffect(() => {
    if (!showFeedback || selected !== current.correctIndex) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const colors = ["#8b5cf6", "#10b981", "#3b82f6", "#f59e0b", "#ec4899"];
    const confettiCount = 50;
    const nodes: HTMLDivElement[] = [];

    for (let i = 0; i < confettiCount; i++) {
      const el = document.createElement("div");
      el.className = "confetti";
      el.style.position = "fixed";
      el.style.top = "-10px";
      el.style.left = Math.random() * 100 + "vw";
      el.style.width = "8px";
      el.style.height = "8px";
      el.style.borderRadius = "2px";
      el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      el.style.opacity = "0.9";
      el.style.transform = `translateY(0) rotate(${Math.random() * 360}deg)`;
      el.style.transition = `transform ${1.6 + Math.random()}s ease-out, opacity 0.3s ease-out ${1.5 + Math.random()}s`;
      document.body.appendChild(el);
      nodes.push(el);

      requestAnimationFrame(() => {
        el.style.transform = `translateY(${100 + Math.random() * 120}vh) rotate(${720 + Math.random() * 720}deg)`;
        el.style.opacity = "0";
      });
    }

    const t = setTimeout(() => nodes.forEach(n => n.remove()), 3200);
    return () => clearTimeout(t);
  }, [showFeedback, selected, current.correctIndex]);

  // video handlers
const handlePlayPause = () => {
  const el = videoRef.current;
  if (!el) return;

  if (el.paused) {
    el.play();
  } else {
    el.pause();
  }
};

const handleReplay = () => {
  const el = videoRef.current;
  if (!el) return;

  el.currentTime = 0;
  el.play();
};

const handleVideoEnded = () => {
  setIsPlaying(false);
  setHasWatched(true);
  setCanContinue(true); // allow continue after full watch
};

const handleVideoPlay = () => {
  setIsPlaying(true);
};

const handleVideoPause = () => {
  // fires when user presses Pause
  setIsPlaying(false);
  setCanContinue(true); // ✅ this triggers showing Replay + Continue
};

const handleFullscreen = () => {
  const el = videoRef.current;
  if (!el) return;

  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if ((el as any).webkitEnterFullscreen) {
    (el as any).webkitEnterFullscreen();
  }
};








  const goQuiz = () => {
    setStep("quiz");
    if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  setTimeout(() => headingRef.current?.focus(), 10);
  };

  // answer handlers
  const selectAnswer = (val: string) => {
    setSelected(parseInt(val, 10));
  };

  const submitAnswer = () => {
    // persist current selection into answers[] so it’s saved if the user comes back
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = selected === null ? undefined : selected;
      return next;
    });
    setShowFeedback(true);
  };
  
  const handleBackClick = () => {
  if (step === "quiz") {
    if (index > 0) {
      // Go to previous question
      setIndex((prev) => prev - 1);
    } else {
      // At first question: go back to video screen
      setStep("video");
      // scroll video view into place
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  } else {
    // On video screen: go back to previous page/step in parent
    onBack();
  }
};


const nextQuestion = () => {
  // 1. Save current answer
  const updated = [...answers];
  updated[index] = selected === null ? undefined : selected;
  setAnswers(updated);

  // 2. After Q2 (index === 1), show Explore once
  if (index === 1 && !exploreDone) {
    setShowExplore(true);
    setShowFeedback(false);
	onNavStepChange?.("cases");
	if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
    return; // ⬅️ IMPORTANT: stop here, don't go to Q3 yet
  }

  // 3. Normal next-question logic
  if (index + 1 < questions.length) {
    const nextIndex = index + 1;
    setIndex(nextIndex);

    const saved = updated[nextIndex];
    setSelected(typeof saved === "number" ? saved : null);
    setShowFeedback(false);
	
    if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

    setTimeout(() => headingRef.current?.focus(), 10);
  } else {
    // 4. Finish: calculate score
    const totalCorrect = updated.reduce(
      (acc, a, i) => acc + (a === questions[i].correctIndex ? 1 : 0),
      0
    );
    onComplete(totalCorrect, questions.length);
  }
};


  // --- RENDER ---

  if (step === "video") {
    return (
      <div ref={rootRef} className="mx-auto max-w-full sm:max-w-4xl px-4 sm:px-6 space-y-6 sm:space-y-8">
        <Button onClick={handleBackClick} variant="ghost" className="gap-2">
  <ArrowLeft className="h-4 w-4" />
  Back
</Button>


        <div className="text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium">
            Single-module version
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-balance">{title}</h2>
          <p className="text-base sm:text-xl text-muted-foreground text-balance">Watch this video, then answer 2 quick questions.</p>
        </div>

        <Card className="border sm:border-2 border-primary/20 shadow-lg sm:shadow-xl">
          <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
            <CardTitle className="text-xl sm:text-2xl">{videoTitle}</CardTitle>
            <CardDescription className="text-sm sm:text-base">A short explainer</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-5 sm:pb-6 space-y-5 sm:space-y-6">
            
			
			
			
			<div className="space-y-3">
  {/* Actual video */}
  <div className="relative aspect-video rounded-md sm:rounded-lg overflow-hidden border border-primary/20 sm:border-2 bg-black">
    <video
      ref={videoRef}
      src="rct-intro.mp4"      // 👈 update if your path is different
      poster="rct-cover.png"   // 👈 your cover image
      className="w-full h-full object-cover"
      onEnded={handleVideoEnded}
      onPlay={handleVideoPlay}
      onPause={handleVideoPause}
      controls={false}          // we’re using our own buttons
    />
  </div>

  {/* Controls row UNDER the video */}
  <div className="flex flex-wrap items-center justify-between gap-3">
    {/* Left side: status text */}
    <p className="text-xs sm:text-sm text-muted-foreground">
      {isPlaying
        ? "Video playing..."
        : hasWatched
        ? "You’ve watched this explainer."
        : canContinue
        ? "Paused. You can replay or continue."
        : "Watch the short explainer, then continue."}
    </p>

    {/* Right side: buttons */}
    <div className="flex flex-wrap gap-2">
      {isPlaying ? (
        // 🔹 While playing: show Pause + Fullscreen
        <>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePlayPause}
            className="gap-1"
          >
            <Pause className="h-3 w-3" />
            Pause
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleFullscreen}
            className="gap-1"
          >
            <Sparkles className="h-3 w-3" />
            Full screen
          </Button>
        </>
      ) : (
        // 🔹 Not playing (initial, or after pause/end)
        <>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={hasWatched ? handleReplay : handlePlayPause}
            className="gap-1"
          >
            <Play className="h-3 w-3" />
            {hasWatched ? "Replay video" : "Play video"}
          </Button>

          {/* Show Continue only AFTER pause or end */}
          {canContinue && (
            <Button
              type="button"
              size="sm"
              onClick={goQuiz}
              className="gap-1 shadow-md"
            >
              Continue to questions
              <ArrowRight className="h-3 w-3" />
            </Button>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleFullscreen}
            className="gap-1"
          >
            <Sparkles className="h-3 w-3" />
            Full screen
          </Button>
        </>
      )}
    </div>
  </div>
</div>




            {transcript ? (
              <details className="group rounded-lg border border-border bg-card">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-[15px] sm:text-sm font-medium hover:bg-muted/50">
                  <span>Transcript</span>
                  <ChevronDown className="h-5 w-5 sm:h-4 sm:w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 pt-0 text-sm sm:text-[15px] leading-7 text-muted-foreground whitespace-pre-wrap">
                  {transcript}
                </div>
              </details>
            ) : null}
          </CardContent>
        </Card>
      </div>
    );
  }

  // QUIZ VIEW
  return (
    <div ref={rootRef} className="mx-auto max-w-full sm:max-w-4xl px-4 sm:px-6 space-y-6 sm:space-y-8">
      <Button onClick={handleBackClick} variant="ghost" className="gap-2">
  <ArrowLeft className="h-4 w-4" />
  Back
</Button>

    {showExplore && !exploreDone && (
      <ExploreStrengthsLimitations
        onComplete={() => {
          // when user finishes the Explore lab

          setExploreDone(true);
          setShowExplore(false);

          // jump to Question 3 (index 2)
          const nextIndex = 2;
          setIndex(nextIndex);

          const saved = answers[nextIndex];
          setSelected(typeof saved === "number" ? saved : null);
          setShowFeedback(false);

//onNavStepChange?.("video"); // 👈 we're back in the quiz flow

// ⬇️ keep nav on "cases" for Q3 & Q4
      onNavStepChange?.("cases");

          if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
	  setTimeout(() => headingRef.current?.focus(), 10);
        }}
      />
    )}


{!showExplore && (
      <Card className="border sm:border-2 border-primary/20 shadow-lg sm:shadow-xl">
        <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
          
		  <CardTitle
  ref={headingRef as any}
  tabIndex={-1}
  className="text-xl sm:text-2xl outline-none"
>
  {blockLabel} question {blockPosition} of {blockTotal}
</CardTitle>
 

          <CardDescription className="text-sm sm:text-base">{current.question}</CardDescription>
        </CardHeader>

        <CardContent className="px-4 sm:px-6 pb-5 sm:pb-6 space-y-5 sm:space-y-6">
          <RadioGroup
            // Controlled strictly by `selected`
            value={selected !== null ? selected.toString() : ""}
            onValueChange={selectAnswer}
            disabled={showFeedback}
          >
            <div className="space-y-3">
              {current.options.map((opt, i) => {
                const chosen = selected === i;
                const correct = i === current.correctIndex;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all min-h-[56px] sm:min-h-[52px]
                    ${
                      showFeedback
                        ? correct
                          ? "border-accent bg-accent/10 shadow-lg"
                          : chosen
                            ? "border-destructive bg-destructive/10"
                            : "border-border"
                        : chosen
                          ? "border-primary bg-primary/10 shadow-md"
                          : "border-border hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    <RadioGroupItem value={i.toString()} id={`q${index}-${i}`} className="h-5 w-5 sm:h-4 sm:w-4" />
                    <Label htmlFor={`q${index}-${i}`} className="flex-1 cursor-pointer text-[15px] sm:text-sm leading-relaxed">
                      {opt}
                    </Label>
                    {showFeedback && correct && <CheckCircle2 className="h-5 w-5 text-accent" />}
                    {showFeedback && chosen && !correct && <XCircle className="h-5 w-5 text-destructive" />}
                  </div>
                );
              })}
            </div>
          </RadioGroup>

          {showFeedback && current.explanation && (
  <div
    className={`mt-2 rounded-2xl border px-4 sm:px-6 py-4 sm:py-5 flex items-start gap-3 sm:gap-4
      ${
        isCorrect
          ? "border-emerald-400 bg-emerald-50"
          : "border-red-300 bg-red-50"
      } animate-in slide-in-from-bottom duration-300`}
  >
    {isCorrect ? (
      <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-500 mt-0.5" />
    ) : (
      <XCircle className="h-6 w-6 sm:h-7 sm:w-7 text-red-500 mt-0.5" />
    )}

    <div className="space-y-1">
      <p className="text-sm sm:text-base font-semibold text-slate-900">
        {isCorrect
          ? "Amazing! You got it right!"
          : "Not quite, but that’s okay!"}
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
        {current.explanation}
      </p>
    </div>
  </div>
)}


          <div className="flex justify-end gap-3">
            {!showFeedback ? (
              <Button onClick={submitAnswer} disabled={selected === null} className="shadow-lg">
                Submit
              </Button>
            ) : (
              <Button onClick={nextQuestion} className="gap-2 shadow-lg">
                {index + 1 < questions.length ? <>Next <ArrowRight className="h-4 w-4" /></> : "Finish"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
)}
    </div>
  );
}
