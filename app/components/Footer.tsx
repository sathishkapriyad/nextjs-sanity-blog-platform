// components/Footer.js
import React from 'react';
import { Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import Link from 'next/dist/client/link';


function Footer() {
  return (
    <footer className="footer bg-gray-900 text-white py-8 site-container">
    <div className="container flex flex-col md:flex-row justify-between items-center mx-auto px-4">
      <div className="social flex space-x-4 mt-4 md:mt-0">
      <Linkedin size={20} color="#333333" />
      <Facebook size={20} color="#333333" />
      <Instagram size={20} color="#333333" />
      </div>

      <div className="mt-6 md:mt-0">
      <Link href="/" passHref>
          <span className="ml-3 font-bold text-2xl cursor-pointer">
            <span className="uppercase">Byte</span>
            <span className="text-primary uppercase">Bridges</span>
          </span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 text-center md:text-left mt-4 md:mt-0">
        <div className="flex-1">
          <a href="#" className="text-sm text-gray-500 hover:text-black">Privacy</a>
          <a href="#" className="text-sm text-gray-500 hover:text-black ml-4">Terms</a>
          <a href="#" className="text-sm text-gray-500 hover:text-black ml-4">About Byte Bridges</a>
        </div>
        </div>
    </div>
  </footer>
  
  );
}

export default Footer;
