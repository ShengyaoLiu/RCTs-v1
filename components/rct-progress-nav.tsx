"use client";

import React from "react";
import { Sparkles, PlayCircle, Layers, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

type StepId = "start" | "video" | "cases" | "victory";

type Props = {
  active: StepId;
};

const steps: { id: StepId; label: string; icon: React.ElementType }[] = [
  { id: "start", label: "Start", icon: Sparkles },
  { id: "video", label: "Video", icon: PlayCircle },
  { id: "cases", label: "Cases", icon: Layers },
  { id: "victory", label: "Victory", icon: Trophy },
];

export function RctProgressNav({ active }: Props) {
  const activeIndex = steps.findIndex((s) => s.id === active);
  const progress =
    activeIndex <= 0
      ? 0
      : activeIndex >= steps.length - 1
      ? 100
      : Math.round((activeIndex / (steps.length - 1)) * 100);

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">RCT Quest</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Unlock the secrets of Randamised Controlled Trial
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = step.id === active;
            const isDone = idx < activeIndex;

            return (
              <div
                key={step.id}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-colors",
                  isActive
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : isDone
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "bg-slate-100 text-slate-500 border-slate-200"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
