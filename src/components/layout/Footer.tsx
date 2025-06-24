import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Review Room</h3>
            <p className="text-gray-400 mt-2">Your destination for movie reviews and ratings</p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Discover</h4>
              <ul className="space-y-1">
                <li><Link href="/" className="text-gray-400 hover:text-pink-400 transition-colors">Popular Movies</Link></li>
                <li><Link href="/movies/top-rated" className="text-gray-400 hover:text-pink-400 transition-colors">Top Rated</Link></li>
                <li><Link href="/movies/upcoming" className="text-gray-400 hover:text-pink-400 transition-colors">Upcoming</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2">Resources</h4>
              <ul className="space-y-1">
                <li><Link href="#" className="text-gray-400 hover:text-pink-400 transition-colors">About Us</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Contact</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
          <p>© {currentYear} Review Room. All rights reserved.</p>
          <p className="mt-1 text-sm">Powered by TMDB API. This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
