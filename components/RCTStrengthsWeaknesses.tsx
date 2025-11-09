"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Scale, Users, Activity, FlaskConical,
  Clock3, AlertTriangle, BrainCircuit, DollarSign, XCircle, ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils"; // shadcn helper; if you don't have it, replace cn(...) with template strings

type Point = { title: string; detail: string; icon?: React.ReactNode };

const strengths: Point[] = [
  { title: "Reduces bias (randomisation)", detail: "Random allocation balances known and unknown factors across groups, improving internal validity.", icon: <ShieldCheck className="h-4 w-4" aria-hidden /> },
  { title: "Supports causal inference",     detail: "Differences in outcomes can be attributed to the intervention rather than confounders.",            icon: <Scale className="h-4 w-4" aria-hidden /> },
  { title: "Comparable groups",             detail: "Baseline equivalence simplifies interpretation (risk ratios, mean differences).",                  icon: <Users className="h-4 w-4" aria-hidden /> },
  { title: "Blinding lowers bias",          detail: "Participant/assessor blinding reduces performance/detection bias, especially for subjective outcomes.", icon: <Activity className="h-4 w-4" aria-hidden /> },
  { title: "Transparent & replicable",      detail: "Preregistration and CONSORT-style reporting improve trust and synthesis.",                         icon: <FlaskConical className="h-4 w-4" aria-hidden /> },
];

const weaknesses: Point[] = [
  { title: "Costly & time-consuming",       detail: "Recruitment, monitoring, and oversight require substantial resources and time.",                   icon: <Clock3 className="h-4 w-4" aria-hidden /> },
  { title: "Ethical/practical limits",      detail: "Not all questions can be randomised or blinded; equipoise and standards constrain design.",        icon: <AlertTriangle className="h-4 w-4" aria-hidden /> },
  { title: "Limited generalisability",      detail: "Strict criteria and controlled settings may not reflect real-world practice.",                     icon: <BrainCircuit className="h-4 w-4" aria-hidden /> },
  { title: "Attrition & non-adherence",     detail: "Differential follow-up and compliance can bias estimates (ITT vs per-protocol).",                  icon: <XCircle className="h-4 w-4" aria-hidden /> },
  { title: "Operational complexity",        detail: "Concealment, blinding, protocol fidelity, and data integrity are demanding.",                      icon: <DollarSign className="h-4 w-4" aria-hidden /> },
];

function ExpandList({ items, className }: { items: Point[]; className?: string }) {
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);
  const toggle = (i: number) => setOpenIdx(prev => (prev === i ? null : i));

  return (
    <ul className={cn("space-y-2", className)}>
      {items.map((p, i) => {
        const active = openIdx === i;
        return (
          <li key={i} className="rounded-md border border-border bg-card">
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={active}
              className={cn(
                "w-full px-3 py-2 text-left flex items-start gap-2 hover:bg-muted/50 transition",
                active && "ring-1 ring-primary/30 rounded-md"
              )}
            >
              {/* left icon (tiny, optional) */}
              {p.icon ? <span className="text-primary mt-0.5">{p.icon}</span> : null}

              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium text-foreground text-sm md:text-[15px]">{p.title}</div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                      active && "rotate-180"
                    )}
                    aria-hidden
                  />
                </div>

                <AnimatePresence initial={false}>
                  {active && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden text-xs md:text-sm text-muted-foreground pt-1"
                    >
                      {p.detail}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default function RCTStrengthsWeaknessesResults({
  className,
  maxWidth = "max-w-3xl",   // tweak width here (max-w-3xl / 4xl / 5xl)
  showIcons = true,         // set false to hide left icons entirely
}: {
  className?: string;
  maxWidth?: string;
  showIcons?: boolean;
}) {
  // optionally strip icons if you want text-only bullets
  const s = showIcons ? strengths : strengths.map(({ title, detail }) => ({ title, detail }));
  const w = showIcons ? weaknesses : weaknesses.map(({ title, detail }) => ({ title, detail }));

  return (
    <section className={cn("mt-6 w-full", className)}>
      {/* harmonised heading style */}
      <h3 className="text-sm font-semibold text-foreground/90">Strengths & Weaknesses</h3>
      <p className="text-xs md:text-sm text-muted-foreground mb-3">
        Use this as a quick context check when interpreting your quiz results.
      </p>

      {/* same container width as results body, but optionally tightened via maxWidth */}
      <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-2", maxWidth, "mx-auto")}>
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Strengths</div>
          <ExpandList items={s as Point[]} />
        </div>
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Weaknesses</div>
          <ExpandList items={w as Point[]} />
        </div>
      </div>
    </section>
  );
}
