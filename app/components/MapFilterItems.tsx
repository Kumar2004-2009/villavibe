"use client";
import { categoryItems } from '../lib/categoryItems'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from "react";
import { cn } from "@/lib/utils";

const MapFilterItems = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("filter");
  const pathname = usePathname();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex gap-x-4 md:gap-x-8 mt-5 w-full overflow-x-auto no-scrollbar px-4 py-2">
      {categoryItems.map((item) => (
        <Link 
          key={item.id} 
          href={pathname + "?" + createQueryString("filter", item.name)}
          className={cn(
            search === item.name
              ? "border-b-2 border-white pb-2 flex-shrink-0"
              : "opacity-70 flex-shrink-0",
            "flex flex-col gap-y-2 md:gap-y-3 items-center group transition-all duration-200"
          )}
        >
          <div className="relative w-6 h-6 md:w-8 md:h-8 transition-transform duration-200 group-hover:scale-120">
            <Image
              src={item.imageUrl}
              alt={item.title}
              className="object-contain filter brightness-0 invert"
              width={32}
              height={32}
            />
          </div>
          <p className="text-xs md:text-sm font-medium text-white group-hover:text-opacity-100 transition-all duration-200">
            {item.title}
          </p>
        </Link>
      ))}
    </div>
  )
}

export default MapFilterItems;