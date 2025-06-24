import Link from 'next/link';
import { FaSearch, FaFilm, FaStar, FaCalendarAlt } from 'react-icons/fa';

const NavBar = () => {
  return (
    <nav className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
            <FaFilm className="text-2xl" />
            <span>Review Room</span>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="flex items-center hover:text-pink-200 transition-colors">
              <FaFilm className="mr-1" /> Popular
            </Link>
            <Link href="/movies/top-rated" className="flex items-center hover:text-pink-200 transition-colors">
              <FaStar className="mr-1" /> Top Rated
            </Link>
            <Link href="/movies/upcoming" className="flex items-center hover:text-pink-200 transition-colors">
              <FaCalendarAlt className="mr-1" /> Upcoming
            </Link>
          </div>
          
          {/* Search */}
          <div>
            <Link href="/search" className="flex items-center p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
              <FaSearch className="text-white" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
