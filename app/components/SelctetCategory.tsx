"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { categoryItems } from "../lib/categoryItems";
import Image from "next/image";
import { useState } from "react";

export function SelctetCategory() {
  const [selectedCategory, setSelectredCategory] = useState<string | undefined>(undefined);

  return (
    <div className=" min-h-screen py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full max-w-6xl mx-auto px-4 sm:px-6">
        <input
          type="hidden"
          name="categoryName"
          value={selectedCategory as string ?? ""}
        />
        {categoryItems.map((item) => (
          <div key={item.id} className="cursor-pointer">
            <Card
              className={`bg-white border border-gray-200 hover:border-primary transition-all duration-200 shadow-sm hover:shadow-md ${
                selectedCategory === item.name 
                  ? "border-primary ring-2 ring-primary/30 bg-primary/5" 
                  : ""
              }`}
              onClick={() => setSelectredCategory(item.name)}
            >
              <CardHeader className="flex flex-col items-center gap-3 p-6">
                <div className="p-4 bg-gray-100 rounded-full">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    height={40}
                    width={40}
                    className="w-8 h-8 sm:w-10 sm:h-10"
                  />
                </div>
                <h3 className={`font-medium text-gray-900 text-base sm:text-lg text-center ${selectedCategory === item.name ? "text-white" : ""}`}>
                  {item.title}
                </h3>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}