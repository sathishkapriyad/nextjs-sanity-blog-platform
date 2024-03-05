'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import { Input } from '@/components/ui/input';
import { MenuIcon, XIcon } from 'lucide-react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full flex items-center justify-between px-4 py-5 bg-white shadow-md">
        {/* Hamburger icon (for mobile) */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Logo */}
        <Link href="/" passHref>
          <span className="ml-3 font-bold text-2xl cursor-pointer">
            <span className="uppercase">Byte</span>
            <span className="text-primary uppercase">Bridges</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center ml-8">
          <Link href="/">
            <span className="ml-5 text-gray-800 dark:text-gray-300 text-sm cursor-pointer">Latest Stories</span>
          </Link>
          <Link href="/">
            <span className="ml-5 text-gray-800 dark:text-gray-300 text-sm cursor-pointer">Product Reviews</span>
          </Link>
          <Link href="/">
            <span className="ml-5 text-gray-800 dark:text-gray-300 text-sm cursor-pointer">AI Stories</span>
          </Link>
          <Link href="/">
            <span className="ml-5 text-gray-800 dark:text-gray-300 text-sm cursor-pointer">Learn Programming</span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="flex-grow ml-8">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input placeholder="Find your byte..." className="pl-10 pr-4 py-2 w-full" />
            </div>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="ml-auto">
          <ModeToggle />
        </div>

        {/* Sidebar (for mobile) */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 flex bg-black bg-opacity-50 md:hidden">
            <aside className={`relative w-64 h-full bg-white transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              {/* Close icon */}
              <button
                className="absolute top-0 right-0 p-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <XIcon className="h-6 w-6" />
              </button>

              {/* Sidebar content */}
              <nav className="flex flex-col p-4"> 
                <Link href="/" className="py-3">
                  <span className="py-2 text-gray-800 dark:text-gray-300 cursor-pointer">Latest Stories</span>
                </Link>
                <Link href="/" className="py-3">
                  <span className="py-2 text-gray-800 dark:text-gray-300 cursor-pointer">Product Reviews</span>
                </Link>
                <Link href="/" className="py-3">
                  <span className="py-2 text-gray-800 dark:text-gray-300 cursor-pointer">AI Stories</span>
                </Link>
                <Link href="/" className="py-3">
                  <span className="py-2 text-gray-800 dark:text-gray-300 cursor-pointer">Learn Programming</span>
                </Link>
              </nav>

              {/* Mobile Search Bar */}
              <div className="mt-8 ml-3 mr-5"> 
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input placeholder="Find your byte..." className="pl-10 pr-4 py-2 w-full" />
                </div>
              </div>

            </aside>
          </div>
        )}
      </nav>
    </>
  );
}

