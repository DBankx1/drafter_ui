"use client";

import { useState } from "react";

export default function PricingToggle() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="flex items-center gap-6">
      <span
        className={`cursor-pointer font-medium ${
          billing === "monthly" ? "text-indigo-600" : "text-slate-500"
        }`}
        onClick={() => setBilling("monthly")}
      >
        Monthly
      </span>
      <span
        className={`cursor-pointer font-medium ${
          billing === "yearly" ? "text-indigo-600" : "text-slate-500"
        }`}
        onClick={() => setBilling("yearly")}
      >
        Yearly (save 20%)
      </span>
    </div>
  );
}
