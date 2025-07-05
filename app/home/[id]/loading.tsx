import { Skeleton } from "@/components/ui/skeleton";

export default function Homepageloading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-10 w-2/3 mb-3" />
          <Skeleton className="h-5 w-1/2" />
        </div>

        {/* Main Image Skeleton */}
        <Skeleton className="w-full h-[500px] rounded-xl mb-8" />

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-2/3 space-y-8">
            {/* Features */}
            <div className="flex gap-4">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-20" />
            </div>

            {/* Host Info */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>

            <Skeleton className="w-full h-px my-6" />

            {/* Category */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-10 w-32" />
            </div>

            <Skeleton className="w-full h-px my-6" />

            {/* Description */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <Skeleton className="w-full h-px my-6" />

            {/* Map */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="w-full h-80 rounded-xl" />
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <div className="space-y-6 p-6 bg-gray-800 rounded-xl">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="w-full h-48" />
                <Skeleton className="w-full h-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}