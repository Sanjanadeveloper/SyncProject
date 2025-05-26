import React from 'react';
import { Facebook, Twitter, Linkedin } from 'lucide-react'; // Importing from lucide-react

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 w-[100%] mt-3.5">
      <div className="container mx-auto text-center">
        {/* Social media icons */}
        <div className="flex justify-center space-x-6 mb-6">
          <a 
            href="https://facebook.com" 
            className="text-white hover:text-blue-400 transition-all" 
            aria-label="Facebook"
          >
            <Facebook className="w-6 h-6" />
          </a>
          <a 
            href="https://twitter.com" 
            className="text-white hover:text-blue-400 transition-all" 
            aria-label="Twitter"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a 
            href="https://linkedin.com" 
            className="text-white hover:text-blue-400 transition-all" 
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </div>

        {/* Copyright text */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} SocialSync. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
