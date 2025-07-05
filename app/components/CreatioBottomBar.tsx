"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreationSubmit } from "./SubmitButtons";

export function CreatioBottomBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 bg-gray-900 border-t border-gray-800 h-20 shadow-lg">
      <div className="absolute inset-0 flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
        <Button 
          variant="outline" 
          size="lg" 
          asChild
          className="bg-transparent text-white border-gray-700 hover:bg-gray-800 hover:text-white"
        >
          <Link href="/">Cancel</Link>
        </Button>
        <CreationSubmit />
      </div>
    </div>
  );
}