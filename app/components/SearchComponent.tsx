"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";
import { useCountries } from "../lib/getCountries";
import { HomeMap } from "./HomeMap";
import { Button } from "@/components/ui/button";
import { CreationSubmit } from "./SubmitButtons";
import { Card, CardHeader } from "@/components/ui/card";
import { Counter } from "./Counter";

export function SearchComponent() {
  const [step, setStep] = useState(1);
  const [locationValue, setLocationValue] = useState("");
  const { getAllCountries } = useCountries();

  function SubmitButtonLocal() {
    return (
      <Button 
        type="button"
        onClick={() => setStep(step + 1)}
        className={`${step === 2 ? "w-full" : ""}`}
      >
        {step === 1 ? "Next" : "Search"}
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full py-2 px-4 border flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 bg-white">
          <div className="flex h-full divide-x text-sm">
            <p className="px-3 font-medium text-gray-700">Anywhere</p>
            <p className="px-3 font-medium text-gray-700">Any Week</p>
            <p className="px-3 font-medium text-gray-500">Add Guests</p>
          </div>

          <div className="ml-2 p-1 bg-rose-500 rounded-full text-white hover:bg-rose-600 transition-colors">
            <Search className="h-4 w-4" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] rounded-lg">
        <form className="gap-4 flex flex-col">
          <input type="hidden" name="country" value={locationValue} />
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-800">
                  Where would you like to go?
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Select a country to find the perfect destination
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <Select
                  required
                  onValueChange={(value) => setLocationValue(value)}
                  value={locationValue}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    <SelectGroup>
                      <SelectLabel className="text-gray-700">Countries</SelectLabel>
                      {getAllCountries().map((item) => (
                        <SelectItem 
                          key={item.value} 
                          value={item.value}
                          className="hover:bg-gray-100"
                        >
                          <span className="mr-2">{item.flag}</span>
                          {item.label} <span className="text-gray-500 ml-1">({item.region})</span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                
                <div className="h-[300px] rounded-lg overflow-hidden border">
                  <HomeMap locationValue={locationValue} />
                </div>
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-800">
                  Customize your stay
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Select your preferences to find the perfect accommodation
                </DialogDescription>
              </DialogHeader>

              <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-col gap-y-5 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="font-medium text-gray-800">Guests</h3>
                      <p className="text-gray-500 text-sm">
                        How many guests are coming?
                      </p>
                    </div>
                    <Counter name="guest" />
                  </div>
                  
                  <div className="border-t border-gray-100 my-2"></div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="font-medium text-gray-800">Rooms</h3>
                      <p className="text-gray-500 text-sm">
                        How many rooms do you need?
                      </p>
                    </div>
                    <Counter name="room" />
                  </div>
                  
                  <div className="border-t border-gray-100 my-2"></div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="font-medium text-gray-800">Bathrooms</h3>
                      <p className="text-gray-500 text-sm">
                        How many bathrooms should it have?
                      </p>
                    </div>
                    <Counter name="bathroom" />
                  </div>
                </CardHeader>
              </Card>
            </>
          )}

          <div className="flex justify-between items-center pt-2">
            {step === 2 && (
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => setStep(step - 1)}
                className="text-gray-700"
              >
                Back
              </Button>
            )}
            <div className={`${step === 2 ? "w-full ml-4" : "ml-auto"}`}>
              <SubmitButtonLocal />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}