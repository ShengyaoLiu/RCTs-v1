"use client";

import { useState, useRef, useEffect } from "react";
import { RctProgressNav } from "@/components/rct-progress-nav";//order matters
import IntroductionSection from "@/components/introduction-section"; // reuse yours
import MultiQuestionModule from "@/components/multi-question-module";
import ResultsSection from "@/components/results-section";







export default function AppV1() {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [navStep, setNavStep] = useState<"start" | "video" | "cases" | "victory">("start");




  const questions = [
    { question: "What is the main purpose of randomisation in an RCT?", options: ["To make the study more complicated",
      "To ensure groups are similar except for the treatment",
      "To save money on the study",
      "To make participants feel special"], correctIndex: 1, explanation: "Randomisation ensures that the groups being compared are similar in all ways except for the treatment they receive. This creates a fair comparison and reduces bias." },
    { question: "What is a placebo?", options: ["A new type of medication",
      "A fake treatment with no active ingredients",
      "A side effect of treatment",
      "A type of randomisation",], correctIndex: 1, explanation: "A placebo looks like the real treatment but contains no active ingredients. It helps check whether improvements are due to the treatment itself or expectations." },
    { question: "Which of the following is a key strength of RCTs?", options: ["They are always quick and cheap",
      "They work for every research question",
      "They can help establish cause-and-effect relationships",
      "They never have ethical concerns",], correctIndex: 2, explanation: "Thanks to randomisation and control, RCTs can support cause-and-effect conclusions, which is why they’re the gold standard." },
    { question: "Which of the following is a key weakness of RCTs?", options: [
    "They may not mirror real-world patients and settings",
    "They can be expensive and take a long time to run",
    "They can raise ethical challenges",
    "All of the above"], correctIndex: 3, explanation: "All of these are common weaknesses. RCTs often require large teams and long timelines, may not reflect everyday clinical practice, and sometimes face ethical limits on who can participate or what comparisons can be made."},
  ];

  const goNext = () => setCurrentStep(s => s + 1);
  const goBack = () => setCurrentStep(s => Math.max(0, s - 1));
  const restart = () => { setCurrentStep(0); setScore(0); };

//the order in below part matters
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
	
      <main className="mx-auto max-w-full sm:max-w-4xl px-4 sm:px-6 py-8">

	  <div className="mb-6">
      <RctProgressNav active={navStep} />
</div>
        {currentStep === 0 && (
          <IntroductionSection
            onNext={goNext}
            title="RCTs—one short video"
            subtitle="Watch once, then answer 2 quick questions."
			onNavStepChange={setNavStep}   // 👈 this line is required
          />
        )}

      
        {currentStep === 1 && (
          <MultiQuestionModule
            title="What are RCTs and How do they work?"
            videoTitle="RCTs in a Nutshell"
            onBack={goBack}
            transcript={`Welcome to our learning course.\n\nHave you ever seen a news headline about a new medical discovery or a new drug and thought, "Does this actually work?"\n\nScientists and doctors wonder the exact same thing whenever they develop a new medicine or treatment. Just like how you wouldn't buy a new car without knowing it's safe and works well, we wouldn't give new drugs to the public without testing them first.\n\nIn these clinical trials, to find the real and best answer for these treatments they use something called a Randomized Controlled Trialor RCT for short. It’s the gold standard for testing medical treatments. Just like with the test drive for a car, we also want to find out the GOAL which is is this a "good drug".\n\nHow can RCTS prove this in the most fair and ultimate test drive?\nStep 1, A large group of people apply and agree to help us with this test.
Step 2, we randomly assign these groups, with half the people getting the drug and the other half getting a sugar pill known as the "placebo" 
Before we continue, we must answer a few questions. Such as, What is a placebo?\n
A placebo is a fake drug given to participants that has no actual effect!
Why do we randomly assign the placebo and the drug? 
This is to ensure that the groups are as similar as possible. Using the example of the test drive, 
we would now have a mixed level of drivers, making the test more fair.
RCTs are blinded, no one knows who's on the placebo, this is important as if a participant knows they have the "drug" and not the placebo, they may believe that they expecting changes and feel that changes do happen. When in reality they did not happen. (this is known as the "placebo effect).\n
Once these steps are taken we can start the trials.
The researchers will now carefully monitor everyone with equal importance and collect all the necessary data on their health, symptoms and any side effects. 
We now have reached our desired goal of the trial.
\nBecause the groups were randomized and blinded, any difference we see in the results can be confidently explained by the drug itself.
In this case we can see that there was a significant increase in improving health in the patients in the drug group. This gives us great evidence that the drug actually works!
\nNow that we have reached the end of the video, I believe it is important to show a montage of some recent medical breakthroughs that used RCTs.
So remember, the next time you hear about a new medical breakthrough, make sure you listen for the keywords "Randomized controlled trials" to know that you can trust it.
\nThanks for watching.
`}
            questions={questions}
            onComplete={(correct, total) => { setScore(correct); setCurrentStep(2); 
			setNavStep("victory"); // ✅ show Victory when done
			}}
			onNavStepChange={setNavStep} // ✅ this lets the module drive the nav
          />
        )}

        {currentStep === 2 && (
          <ResultsSection
            score={score}
            totalQuestions={questions.length}
            onRestart={restart}
            onBack={goBack}
          />
        )}
      </main>
    </div>
  );
}
