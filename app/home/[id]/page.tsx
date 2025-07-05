import { createReservation } from "@/app/action";
import CategoryShowcase from "@/app/components/CategoryShowcase";
import { HomeMap } from "@/app/components/HomeMap";
import { SelectCalender } from "@/app/components/SelectCalender";
import { ReservationSubmitButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { useCountries } from "@/app/lib/getCountries";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

async function getData(homeid: string) {
  noStore();
  const data = await prisma.home.findUnique({
    where: {
      id: homeid,
    },
    select: {
      photo: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      categoryName: true,
      price: true,
      country: true,
      createdAt: true,
      Reservation: {
        where: {
          homeId: homeid,
        },
      },
      User: {
        select: {
          profileImage: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  return data;
}

const Page = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Property Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{data?.title}</h1>
          <div className="flex items-center text-gray-200">
            <span className="mr-2">{country?.flag}</span>
            <span>
              {country?.label}, {country?.region}
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:w-2/3">
            {/* Property Image */}
            <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
              <Image
                alt="Image of Home"
                src={`https://ngiisizuilzftcobbluu.supabase.co/storage/v1/object/public/images/${data?.photo}`}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Property Features */}
            <div className="flex gap-4 text-gray-300 mb-6">
              <span>{data?.guests} guests</span>
              <span>•</span>
              <span>{data?.bedrooms} bedrooms</span>
              <span>•</span>
              <span>{data?.bathrooms} bathrooms</span>
            </div>

            {/* Host Information */}
            <div className="flex items-center mb-8">
              <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                <Image
                  src={
                    data?.User?.profileImage ??
                    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                  }
                  alt="Host profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-white">
                  Hosted by {data?.User?.firstName} {data?.User?.lastName}
                </h3>
                <p className="text-gray-300 text-sm">
                  Hosting since {data?.createdAt?.getFullYear()}
                </p>
              </div>
            </div>

            <Separator className="bg-gray-200 my-6" />

            {/* Category */}
            <CategoryShowcase categoryName={data?.categoryName as string} />

            <Separator className="bg-gray-200 my-6" />

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">About this place</h2>
              <p className="text-gray-300 whitespace-pre-line">
                {data?.description}
              </p>
            </div>

            <Separator className="bg-gray-200 my-6" />

            {/* Map */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">Location</h2>
              <div className="h-80 rounded-xl overflow-hidden">
                <HomeMap locationValue={country?.value as string} />
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <div className="border border-gray-200 rounded-xl shadow-md p-6 bg-white">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-semibold">
                    ${data?.price} <span className="text-gray-500 text-base font-normal">night</span>
                  </span>
                </div>

                <form action={createReservation}>
                  <input type="hidden" name="homeId" value={params.id} />
                  <input type="hidden" name="userId" value={user?.id as string} />

                  <SelectCalender reservation={data?.Reservation} />

                  {user?.id ? (
                    <ReservationSubmitButton />
                  ) : (
                    <Button className="w-full mt-4" asChild>
                      <Link href="/api/auth/login">Sign in to book</Link>
                    </Button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;