'use client';

import { useEffect } from 'react';
import type { Movie } from '@/lib/tmdb';
import MovieGrid from './MovieGrid';
import ClientPagination from '@/components/ui/ClientPagination';
import { useAtom } from 'jotai';
import { movieTypeAtom } from '@/lib/store';
import { useMovieFetch } from '@/lib/hooks/useMovieFetch';

interface PaginatedMovieListProps {
  initialMovies: Movie[];
  totalPages: number;
  category: 'popular' | 'upcoming' | 'top_rated';
  title?: string;
}

export default function PaginatedMovieList({
  initialMovies,
  totalPages,
  category,
  title = ''
}: PaginatedMovieListProps) {
  const [, setMovieType] = useAtom(movieTypeAtom);
  
  // Set initial movie type based on category
  useEffect(() => {
    setMovieType(category === 'top_rated' ? 'top-rated' : category as 'popular' | 'upcoming');
  }, [category, setMovieType]);

  const { movies, isLoading } = useMovieFetch(initialMovies);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-96 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <MovieGrid movies={movies} title={title} />
      {totalPages > 1 && (
        <div className="container mx-auto px-4 mb-8">
          <ClientPagination totalPages={totalPages} />
        </div>
      )}
    </>
  );
}
