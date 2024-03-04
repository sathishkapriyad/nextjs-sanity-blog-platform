import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'; // Assuming you have this icon
import { Input } from "@/components/ui/input";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full flex items-center justify-between px-4 py-5 bg-white shadow-md">
      <div className="flex items-center">
       {/* Your logo icon */}
        <Link href="/" passHref>
          <span className="ml-3 font-bold text-2xl cursor-pointer">
            <span className="uppercase">Byte</span>
            <span className="text-primary uppercase">Bridges</span>
          </span>
        </Link>
      </div>
      <div className="flex-grow px-4 max-w-2xl">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input placeholder="Find your byte..." className="pl-10 pr-4 py-2 w-full" />
        </div>
      </div>
      <div className="flex items-center">
        <ModeToggle />
      </div>
    </nav>
  );
}
