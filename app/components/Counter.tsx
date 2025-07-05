"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export function Counter({ name }: { name: string }) {
  const [amount, setAmount] = useState(0);

  const increase = () => setAmount((prev) => prev + 1);

  const decrease = () => {
    if (amount > 0) setAmount((prev) => prev - 1);
  };

  return (
    <div className="flex items-center gap-x-4 ml-10">
      <input type="hidden" name={name} value={amount} />

      <Button
        variant="outline"
        size="icon"
        type="button"
        onClick={decrease}
        aria-label="Decrease count"
        className="h-8 w-8"
      >
        <Minus className="w-4 h-4 text-primary" />
      </Button>

      <p className="font-medium text-lg w-8 text-center text-white">{amount}</p>

      <Button
        variant="outline"
        size="icon"
        type="button"
        onClick={increase}
        aria-label="Increase count"
        className="h-8 w-8"
      >
        <Plus className="w-4 h-4 text-primary" />
      </Button>
    </div>
  );
}