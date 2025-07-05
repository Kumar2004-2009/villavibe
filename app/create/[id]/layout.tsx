import type { ReactNode } from "react";

export default function LayoutCreation({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#0D0D0D]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </div>
    </div>
  );
}