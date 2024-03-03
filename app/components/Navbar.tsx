import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { BeakerIcon } from '@heroicons/react/24/solid'
import { CoffeeIcon } from "lucide-react";
import { Input } from "@/components/ui/input"


export default function Navbar() {
    return (
        <nav className="w-full relative flex items-center justify-between max-w-5xl mx-auto px-4 py-5 pb-8">
           <Link href="/" className="font-bold text-3xl">
           <span className="uppercase whitespace-normal">Byte</span><span className="text-primary uppercase">Bridges</span>
                <p className="text-sm">Connecting Ideas in the Digital Realm</p>
           </Link>
           {/* <Link href="/about" >
                <p className="text-md font-semibold text-left">About</p>
           </Link> */}
        
           <Link href="/" className="grid w-full max-w-xl items-center">
           <Input placeholder="Find your byte..."/>
           </Link>
           <ModeToggle/>
        </nav>

    );
}