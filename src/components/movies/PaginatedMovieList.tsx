'use client';

import { useState, useEffect } from 'react';
import type { Movie } from '@/lib/tmdb';
import MovieGrid from './MovieGrid';
import ClientPagination from '@/components/ui/ClientPagination';
import { useSearchParams } from 'next/navigation';

interface PaginatedMovieListProps {
  initialMovies: Movie[];
  totalPages: number;
  category: 'popular' | 'upcoming' | 'top-rated';
  title?: string;
}

export default function PaginatedMovieList({
  initialMovies,
  totalPages,
  category,
  title = ''
}: PaginatedMovieListProps) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If we're on page 1, use the initial movies
    if (currentPage === 1) {
      setMovies(initialMovies);
      return;
    }

    // Otherwise fetch the movies for the current page
    async function fetchMovies() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/movies?category=${category}&page=${currentPage}`);
        const data = await response.json();
        if (data.results) {
          setMovies(data.results);
        }
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [currentPage, category, initialMovies]);

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
          <ClientPagination totalPages={totalPages} defaultPage={currentPage} />
        </div>
      )}
    </>
  );
}
