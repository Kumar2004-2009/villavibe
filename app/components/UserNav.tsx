/* eslint-disable @next/next/no-img-element */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon, Home, Heart, Calendar, LogOut, LogIn, UserPlus } from "lucide-react";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { createAirbnbHome } from "../action";

export async function UserNav() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const createHomewithId = createAirbnbHome.bind(null, {
    userId: user?.id as string,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full border border-white px-2 py-1 flex items-center gap-x-2 hover:shadow-md transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2">
          <MenuIcon className="w-5 h-5 text-white" />
          <img
            src={
              user?.picture ??
              "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            alt="User profile"
            className="rounded-full h-7 w-7 hidden lg:block object-cover border-2 border-white shadow-sm"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 rounded-lg shadow-xl border border-gray-100 p-2"
      >
        {user ? (
          <>
            <DropdownMenuItem className="p-2 rounded-md hover:bg-gray-50">
              <form action={createHomewithId} className="w-full">
                <button 
                  type="submit" 
                  className="w-full text-start flex items-center cursor-pointer"
                >
                  <Home className="w-4 h-4 mr-2 text-rose-500" />
                  VillaVibe your Home
                </button>
              </form>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="p-2 rounded-md hover:bg-gray-50">
              <Link href="/my-homes" className="w-full flex items-center">
                <Home className="w-4 h-4 mr-2 text-gray-700" />
                My Listings
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="p-2 rounded-md hover:bg-gray-50">
              <Link href="/favorites" className="w-full flex items-center">
                <Heart className="w-4 h-4 mr-2 text-rose-500" />
                My Favorites
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="p-2 rounded-md hover:bg-gray-50">
              <Link href="/reservations" className="w-full flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-700" />
                My Reservations
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="bg-gray-300" />
            
            <DropdownMenuItem className="p-2 rounded-md hover:bg-gray-50 text-gray-700">
              <LogoutLink className="w-full flex items-center">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </LogoutLink>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem className="p-2 rounded-md hover:bg-gray-50">
              <RegisterLink className="w-full flex items-center">
                <UserPlus className="w-4 h-4 mr-2 text-rose-500" />
                Register
              </RegisterLink>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="p-2 rounded-md hover:bg-gray-50">
              <LoginLink className="w-full flex items-center">
                <LogIn className="w-4 h-4 mr-2 text-gray-700" />
                Login
              </LoginLink>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}