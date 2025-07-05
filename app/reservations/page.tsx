import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ListingCard from "../components/ListingCard";
import { NoItems } from "../components/NoItem";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  noStore();
  const data = await prisma.reservation.findMany({
    where: {
      userId: userId,
    },
    select: {
      Home: {
        select: {
          id: true,
          country: true,
          photo: true,
          description: true,
          price: true,
          Favorite: {
            where: {
              userId: userId,
            },
          },
        },
      },
    },
  });
  return data;
}

export default async function ReservationsRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user?.id) return redirect("/");
  const data = await getData(user.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <section className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              Your Reservations
            </h2>
            <p className="text-gray-400 mt-2">
              {data.length} upcoming {data.length === 1 ? "stay" : "stays"}
            </p>
          </div>

          {data.length === 0 ? (
            <div className="flex items-center justify-center min-h-[50vh]">
              <NoItems
                title="No upcoming reservations"
                description="Book a stay to see your reservations here"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.map((item) => (
                <ListingCard
                  key={item.Home?.id}
                  description={item.Home?.description as string}
                  location={item.Home?.country as string}
                  pathName="/favorites"
                  homeId={item.Home?.id as string}
                  imagePath={item.Home?.photo as string}
                  price={item.Home?.price as number}
                  userId={user.id}
                  favoriteId={item.Home?.Favorite[0]?.id as string}
                  isInFavoriteList={(item.Home?.Favorite?.length || 0) > 0}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}