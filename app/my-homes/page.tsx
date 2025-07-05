import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import ListingCard from "../components/ListingCard";
import { NoItems } from "../components/NoItem";

async function getData(userId: string) {
    const data = await prisma.home.findMany({
        where: {
            userId: userId,
            addedCategory: true,
            addedLoaction: true,
            addedDescription: true,
        },
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
        orderBy: {
            createdAt: "desc",
        },
    });

    return data;
}

const Page = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/");
    }
    const data = await getData(user.id as string);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
            <section className="container mx-auto px-4 sm:px-6 py-12">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                        Your Homes
                    </h2>
                    <p className="text-gray-400 mb-8">
                        Manage your listed properties
                    </p>

                    {data.length === 0 ? (
                        <div className="flex items-center justify-center min-h-[50vh]">
                            <NoItems
                                title="You don't have any homes listed yet"
                                description="Please add homes to see them listed here"
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {data.map((item) => (
                                <ListingCard
                                    key={item.id}
                                    description={item.description as string}
                                    imagePath={item.photo as string}
                                    location={item.country as string}
                                    price={item.price as number}
                                    userId={user.id}
                                    pathName="/my-homes"
                                    homeId={item.id as string}
                                    favoriteId={item.Favorite[0]?.id}
                                    isInFavoriteList={item.Favorite.length > 0}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Page;