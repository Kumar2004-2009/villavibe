import { CreateDescription } from "@/app/action";
import { Counter } from "@/app/components/Counter";
import { CreatioBottomBar } from "@/app/components/CreatioBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";

export default function DescriptionPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pt-8 md:pt-12">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white text-center">
            Please describe your home as good as you can!
          </h2>
        </div>

        <form action={CreateDescription}>
          <input type="hidden" name="homeId" value={params.id} />

          <div className="max-w-4xl mx-auto mt-8 md:mt-12 flex flex-col gap-y-6 mb-20 md:mb-36">
            {/* Title */}
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="title" className="text-white text-sm sm:text-base">Title</Label>
              <Input
                id="title"
                name="title"
                type="text"
                required
                className="h-12 text-white bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Short and simple..."
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="description" className="text-white text-sm sm:text-base">Description</Label>
              <Textarea
                id="description"
                name="description"
                className="text-white bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                required
                placeholder="Please describe your home..."
              />
            </div>

            {/* Price */}
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="price" className="text-white text-sm sm:text-base">Price</Label>
              <Input
                id="price"
                className="h-12 text-white bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                name="price"
                type="number"
                required
                placeholder="Price per Night in USD"
                min={10}
              />
            </div>

            {/* Image Upload */}
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="image" className="text-white text-sm sm:text-base">Image</Label>
              <Input 
                id="image" 
                name="image" 
                type="file" 
                required 
                className="h-10 text-gray-300 bg-gray-700 border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:text-white cursor-pointer"
                accept="image/*"
              />
            </div>

            {/* Counters Card */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-col gap-y-6 p-6">
                {/* Guests */}
                <div className="flex flex-col sm:flex-row w-full items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-white">Guests</h3>
                    <p className="text-sm text-gray-400">
                      How many guests do you want?
                    </p>
                  </div>
                  <Counter name="guest" />
                </div>

                {/* Rooms */}
                <div className="flex flex-col sm:flex-row w-full items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-white">Rooms</h3>
                    <p className="text-sm text-gray-400">
                      How many rooms do you have?
                    </p>
                  </div>
                  <Counter name="room" />
                </div>

                {/* Bathrooms */}
                <div className="flex flex-col sm:flex-row w-full items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-white">Bathrooms</h3>
                    <p className="text-sm text-gray-400">
                      How many bathrooms do you have?
                    </p>
                  </div>
                  <Counter name="bathroom" />
                </div>
              </CardHeader>
            </Card>
          </div>

          <CreatioBottomBar />
        </form>
      </div>
    </div>
  );
}