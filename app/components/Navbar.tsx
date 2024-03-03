import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
    return (
        <nav className="w-full relative flex items-center justify-between max-w-5xl mx-auto px-4 py-5 pb-8">
           <Link href="/" className="font-bold text-3xl">
           <span className="uppercase whitespace-normal">Byte</span><span className="text-primary uppercase">Bridges</span>
                <p className="text-sm">Connecting Ideas in the Digital Realm</p>
           </Link>

           <ModeToggle/>
        </nav>
    );
}