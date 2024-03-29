'use client'; 
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import { Input } from '@/components/ui/input';
import { MenuIcon, XIcon } from 'lucide-react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { client } from '../lib/sanity';
import SearchResults from '../components/SearchResults'; 

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]); 
  const [allBlogPosts, setAllBlogPosts] = useState([]);

  // Fetch blog posts on initial load
  useEffect(() => {
    const fetchData = async () => {
      const query = '*[_type == "blog"]{ title, _id, slug, content }'; 
      const posts = await client.fetch(query);
      setAllBlogPosts(posts);
    };
    fetchData();
  }, []);

  // Search Logic
  useEffect(() => {
    const performSearch = async () => {
      if (searchTerm) {
        const query = `
          *[_type == "blog" && 
            (title match "${searchTerm}*" || content match "${searchTerm}*")]
           { title, _id, slug } 
        `;
        const results = await client.fetch(query);
        setSearchResults(results);
      } else {
        setSearchResults([]); // Clear results
      }
    };

    performSearch(); 
  }, [searchTerm]);
    
  return (
    <nav className="sticky top-0 z-50 w-full flex items-center justify-between px-4 py-5 bg-white shadow-md">
      {/* Left Section: Logo & Links */}
      <div className="flex items-center"> 
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
        <div className="hidden md:flex items-center ml-8 desktop-navbar">
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
          {/* ... more links */}
        </div>
      </div>

      {/* Right Section: Search Bar & Mode Toggle */}
      <div className="flex items-center ml-8 space-x-4"> 
        {/* Desktop Search Bar */}
        <div className="hidden md:flex">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input 
            placeholder="Find an article..." 
            className="pl-10 pr-4 py-2 w-full" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <SearchResults results={searchResults} searchTerm={searchTerm} />
        </div>
        </div>

        {/* Mode Toggle */}
        <div className="ml-auto">
          <ModeToggle />
        </div>
      </div>

      {/* Sidebar (for mobile) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 flex bg-black bg-opacity-50 md:hidden">
          <aside className={`relative w-64 h-full bg-white transition-all duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            {/* Close icon */}
            <button className="absolute top-0 right-0 p-4" onClick={() => setIsMenuOpen(false)}>
              <XIcon className="h-6 w-6" />
            </button>

            {/* Sidebar content */}
            <nav className="flex flex-col p-4">
              {/* Navigation Links */}
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

              {/* Mobile Search Bar */}
              <div className="mt-8 ml-3 mr-5"> 
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input placeholder="Find an article..." className="pl-10 pr-4 py-2 w-full" />
                </div>
              </div>
            </nav>
          </aside>
        </div>
      )}
    </nav>
  );
}
function setSearchResults(results: any) {
  throw new Error('Function not implemented.');
}

