"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Lightbulb, CheckCircle2, Sparkles } from "lucide-react";
import { RctProgressNav } from "@/components/rct-progress-nav";


type ExploreStrengthsLimitationsProps = {
  onComplete: () => void;
  onBack?: () => void;
};

const scenarios = [
  {
    title: "Scenario 1: Testing a New Heart Medication",
    description:
      "Researchers want to test if a new medication reduces heart attacks better than the current standard treatment.",
    question: "Flip each card to reveal how RCTs help us answer this fairly.",
    cards: [
      {
        id: 1,
        text: "Show cause-and-effect relationship",
        type: "strength" as const,
        explanation:
          "RCTs can show that the medication itself is likely responsible for reducing heart attacks, because randomisation balances other factors between groups.",
      },
      {
        id: 2,
        text: "Reduces researcher bias",
        type: "strength" as const,
        explanation:
          "Blinding means neither doctors nor patients know who gets which treatment, helping prevent expectations from influencing results.",
      },
      {
        id: 3,
        text: "Expensive and time-consuming",
        type: "limitation" as const,
        explanation:
          "Large trials with long follow-up and close monitoring can be costly and slow to run.",
      },
      {
        id: 4,
        text: "Strict inclusion criteria may limit applicability",
        type: "limitation" as const,
        explanation:
          "Because some people are excluded, the results might not represent every patient seen in everyday clinical practice.",
      },
    ],
  },
  {
    title: "Scenario 2: Studying Smoking and Lung Cancer",
    description:
      "Scientists want to understand if smoking causes lung cancer by randomly assigning people to either smoke or not smoke for 20 years.",
    question: "Flip each card to see why an RCT is not always the right approach.",
    cards: [
      {
        id: 5,
        text: "Cannot randomly assign harmful exposures",
        type: "limitation" as const,
        explanation:
          "It would be unethical to force people to smoke. For harmful exposures, we rely on observational studies instead of RCTs.",
      },
      {
        id: 6,
        text: "Expensive to run for 20 years",
        type: "limitation" as const,
        explanation:
          "Long-term follow-up is challenging, but the key issue here is ethics, not just cost.",
      },
      {
        id: 7,
        text: "Would provide strongest evidence\n(only if ethical)",
        type: "strength" as const,
        explanation:
          "Randomisation could give very strong evidence, but ethical principles always come first.",
      },
      {
        id: 8,
        text: "Difficult to find volunteers",
        type: "limitation" as const,
        explanation:
          "Even if people volunteered, we still could not deliberately expose them to serious harm for research.",
      },
    ],
  },
];

export default function ExploreStrengthsLimitations({
  onComplete,
  onBack,
}: ExploreStrengthsLimitationsProps) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const scenario = scenarios[currentScenario];
  const allFlipped = flippedCards.length === scenario.cards.length;
  const isLastScenario = currentScenario === scenarios.length - 1;

  const handleCardFlip = (cardId: number) => {
    if (!flippedCards.includes(cardId)) {
      setFlippedCards((prev) => [...prev, cardId]);
    }
  };

  const handleNext = () => {
    if (!allFlipped) return;
    if (!isLastScenario) {
      setCurrentScenario((prev) => prev + 1);
      setFlippedCards([]);
    } else {
      onComplete();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
	
      {onBack && (
        <Button onClick={onBack} variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      )}

      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Lightbulb className="h-4 w-4" />
          Real-world cases
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-balance">
          Explore Strengths &amp; Limitations
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground text-balance">
          Flip each card to see what RCTs are great for and where they fall short, with a short explanation.
		  <br />
          No need to choose answers, just explore!
        </p>
      </div>

      {/* Scenario Card */}
      <Card className="border-2 border-primary/20 shadow-xl">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-xl sm:text-2xl text-balance">
                {scenario.title}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base leading-relaxed">
                {scenario.description}
              </CardDescription>
            </div>
            <div className="text-xs sm:text-sm font-medium text-muted-foreground whitespace-nowrap">
              Set {currentScenario + 1} of {scenarios.length}
            </div>
          </div>
          
        </CardHeader>


		<CardContent className="space-y-6">
  {/* coloured question box */}
  <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
    <p className="font-medium text-center text-balance text-sm sm:text-base">
      {scenario.question}
    </p>
  </div>


          {/* Cards grid (layout kept) */}
          <div className="grid md:grid-cols-2 gap-4">
            {scenario.cards.map((card) => {
              const isFlipped = flippedCards.includes(card.id);

              return (
                <div key={card.id} className="space-y-3">
                  {/* Flip Card */}
                  <div
                    className={`relative h-40 sm:h-44 cursor-pointer transition-all duration-500 preserve-3d ${
                      isFlipped ? "rotate-y-180" : ""
                    }`}
                    onClick={() => handleCardFlip(card.id)}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front */}
                    <div
                      className={`absolute inset-0 backface-hidden rounded-lg border-2 border-primary/15 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4 ${
                        isFlipped ? "invisible" : ""
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2 text-center">
                        <Sparkles className="h-6 w-6 text-primary" />
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                          Tap to reveal
                        </p>
                      </div>
                    </div>

                    {/* Back */}
                    <div
                      className={`absolute inset-0 backface-hidden rounded-lg border-2 bg-card flex flex-col items-center justify-center text-center p-4 gap-2 rotate-y-180 ${
                        !isFlipped ? "invisible" : ""
                      }`}
                    >
                      {/* Strength / Limitation label */}
                      <div
                        className={`px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide ${
                          card.type === "strength"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {card.type === "strength" ? "STRENGTH" : "LIMITATION"}
                      </div>

                      {/* Main statement */}
                      <p className="text-sm sm:text-base font-semibold text-foreground leading-snug whitespace-pre-line">
  {card.text}
</p>


                      {/* Explanation */}
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {card.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress / Continue */}
          <div className="flex items-center justify-between pt-4 border-t">
            <p className="text-xs sm:text-sm text-muted-foreground">
              {allFlipped
                ? "Great — you’ve seen all the key points in this set."
                : `Flip each card to see why it is a strength or limitation (${flippedCards.length}/${scenario.cards.length})`}
            </p>
            <Button
              onClick={handleNext}
              size="sm"
              className="gap-2 shadow-lg"
              disabled={!allFlipped}
            >
              {isLastScenario ? "Continue to next questions" : "Next set"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
