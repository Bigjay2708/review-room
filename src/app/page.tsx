import { getPopularMovies } from '@/lib/tmdb';
import type { Movie } from '@/lib/tmdb';
import HeroBanner from '@/components/movies/HeroBanner';
import Link from 'next/link';
import PaginatedMovieList from '@/components/movies/PaginatedMovieList';

export default async function Home() {
  // Fetch data for the first page only (client pagination will handle the rest)
  const popularMoviesData = await getPopularMovies(1);
  const movies: Movie[] = popularMoviesData.results;
  const totalPages = popularMoviesData.total_pages > 500 ? 500 : popularMoviesData.total_pages;
  
  // Select the first movie for the hero banner
  const featuredMovie = movies[0];
  const restOfMovies = movies.slice(1);
  
  return (
    <div>
      {/* Hero Banner */}
      <HeroBanner movie={featuredMovie} />
      
      {/* Popular Movies with Pagination */}
      <div className="container mx-auto px-4">
        <PaginatedMovieList 
          initialMovies={restOfMovies}
          totalPages={totalPages}
          category="popular"
          title="Popular Movies"
        />
      </div>
      
      {/* Featured Categories */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl p-6 text-white shadow-lg transform transition-transform hover:scale-105">
            <h3 className="text-xl font-bold mb-2">Top Rated Movies</h3>
            <p className="mb-4">Discover the highest-rated films loved by audiences and critics alike.</p>
            <Link href="/movies/top-rated" className="inline-block bg-white text-purple-600 font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">
              Explore →
            </Link>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl p-6 text-white shadow-lg transform transition-transform hover:scale-105">
            <h3 className="text-xl font-bold mb-2">Upcoming Releases</h3>
            <p className="mb-4">Stay ahead with the latest upcoming movie releases and premieres.</p>
            <Link href="/movies/upcoming" className="inline-block bg-white text-blue-600 font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">
              Explore →
            </Link>
          </div>
          
          <div className="bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg transform transition-transform hover:scale-105">
            <h3 className="text-xl font-bold mb-2">Write Reviews</h3>
            <p className="mb-4">Share your thoughts and rate your favorite movies with our community.</p>
            <Link href="/search" className="inline-block bg-white text-amber-600 font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">
              Get Started →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
