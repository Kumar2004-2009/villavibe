import Image from "next/image";
import Link from "next/link";
import { useCountries } from "../lib/getCountries";
import { AddToFavoriteButton, DeleteFromFavoriteButton } from "./SubmitButtons";
import { DeleteFromFavorite, addToFavorite } from "../action";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | null;
  isInFavoriteList: boolean;
  favoriteId: string;
  homeId: string;
  pathName: string;
}

const ListingCard = ({
  description,
  imagePath,
  location,
  price,
  userId,
  favoriteId,
  homeId,
  isInFavoriteList,
  pathName,
}: iAppProps) => {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);

  return (
    <div className="flex flex-col group transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/20 rounded-lg overflow-hidden">
      <div className="relative h-64 md:h-72 w-full aspect-video">
        <Image
          src={`https://ngiisizuilzftcobbluu.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt={`House in ${country?.label}`}
          fill
          className="rounded-t-lg object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

        {userId && (
          <div className="z-10 absolute top-3 right-3">
            {isInFavoriteList ? (
              <form action={DeleteFromFavorite}>
                <input type="hidden" name="favoriteId" value={favoriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>

      <Link 
        href={`/home/${homeId}`} 
        className="bg-gray-900 p-4 flex-1 flex flex-col rounded-b-lg"
      >
        <h3 className="font-medium text-lg text-white">
          {country?.flag} {country?.label} / {country?.region}
        </h3>
        <p className="text-gray-300 text-sm line-clamp-2 mt-1">
          {description}
        </p>
        <p className="mt-3 text-gray-300 text-sm">
          <span className="font-medium text-rose-500 text-lg">${price}</span> per night
        </p>
      </Link>
    </div>
  );
};

export default ListingCard;