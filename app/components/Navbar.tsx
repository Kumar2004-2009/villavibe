import Image from "next/image";
import Link from "next/link";
import DesktopLogo from "../../public/desktop.png";
import MobileLogo from "../../public/mobile.png";
import { UserNav } from "./UserNav";
import { SearchComponent } from "./SearchComponent";

export function Navbar() {
  return (
    <nav className="w-full border-0 shadow-amber-50 shadow-sm bg-[#0D0D0D] backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between container mx-auto px-4 lg:px-8 py-3 lg:py-4">
        <Link href="/" className="flex items-center">
          <Image
            src={DesktopLogo}
            alt="Desktop Logo"
            className="hidden lg:block h-15 w-auto transition-transform hover:scale-105"
            priority
          />
          <Image
            src={MobileLogo}
            alt="Mobile Logo"
            className="block lg:hidden h-8 w-auto transition-transform hover:scale-105"
            priority
          />
        </Link>
        
        <div className="hidden md:block flex-1 max-w-md mx-auto">
          <SearchComponent />
        </div>

        <div className="flex items-center">
          <UserNav />
        </div>
      </div>
    </nav>
  );
}