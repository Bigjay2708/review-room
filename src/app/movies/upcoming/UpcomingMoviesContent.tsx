'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import MovieGrid from '@/components/movies/MovieGrid';
import type { Movie } from '@/lib/tmdb';
import Pagination from '@/components/ui/Pagination';

interface UpcomingMoviesContentProps {
  initialMovies: Movie[];
  totalPages: number;
}

const UpcomingMoviesContent: React.FC<UpcomingMoviesContentProps> = ({ 
  initialMovies, 
  totalPages 
}) => {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [loading, setLoading] = useState(false);

  // Fetch movies for the current page (except page 1 which is pre-loaded)
  useEffect(() => {
    if (currentPage === 1) {
      setMovies(initialMovies);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/movies?category=upcoming&page=${currentPage}`);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage, initialMovies]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Movies</h1>
        <p className="text-gray-600 max-w-3xl">
          Stay ahead of the curve with the latest upcoming movie releases. From highly anticipated blockbusters to indie darlings, discover what&apos;s coming soon to theaters.
        </p>
      </div>
        {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-[400px]" />
          ))}
        </div>
      ) : (
        <MovieGrid 
          movies={movies} 
          title=""
        />
      )}
      
      {/* Pagination */}
      <div className="mt-8">
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
        />
      </div>
    </div>
  );
};

export default UpcomingMoviesContent;
