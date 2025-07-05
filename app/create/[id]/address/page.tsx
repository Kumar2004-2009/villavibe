"use client";

import { createLocation } from "@/app/action";
import { CreatioBottomBar } from "@/app/components/CreatioBottomBar";
import { useCountries } from "@/app/lib/getCountries";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@radix-ui/react-select";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useState, use } from "react";

export default function AddressRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { getAllCountries } = useCountries();
  const countries = getAllCountries();
  const [locationValue, setLocationValue] = useState("");
  const selectedCountry = countries.find((c) => c.value === locationValue);
  console.log(locationValue);

  const LazyMap = dynamic(() => import("@/app/components/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  });
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10 text-white">
          Where is your Home located?
        </h2>
      </div>

      {/* Move Select OUTSIDE form! */}
      <div className="w-3/5 mx-auto mb-5">
        <Select
          required
          value={locationValue}
          onValueChange={(value) => setLocationValue(value)}
        >
          <SelectTrigger className="w-full p-2 border rounded-md text-start text-white">
            {selectedCountry ? (
              <span>
                {selectedCountry.flag} {selectedCountry.label} /{" "}
                {selectedCountry.region}
              </span>
            ) : (
              <span className="text-gray-400">Select a Country</span>
            )}
          </SelectTrigger>
          <SelectContent className="bg-white border rounded-md shadow-lg mt-1 max-h-[300px] h-[600px] overflow-y-auto relative z-20">
            <SelectGroup>
              <SelectLabel className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border-b z-10">
                Countries
              </SelectLabel>
              {getAllCountries().map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer relative z-0"
                >
                  {item.flag} {item.label} / {item.region}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <form action={createLocation}>
        <input type="hidden" name="homeId" value={resolvedParams.id} />
        <input type="hidden" name="countryValue" value={locationValue} />
        <div className="w-3/5 mx-auto mb-36">
          <LazyMap locationValue={locationValue} />
        </div>
        <CreatioBottomBar />
      </form>
    </>
  );
}
