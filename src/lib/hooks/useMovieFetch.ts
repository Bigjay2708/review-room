import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { currentPageAtom, movieTypeAtom } from '@/lib/store';
import type { Movie } from '@/lib/tmdb';

interface UseMovieFetchResult {
  movies: Movie[];
  isLoading: boolean;
  error: Error | null;
}

export function useMovieFetch(initialMovies: Movie[]): UseMovieFetchResult {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [currentPage] = useAtom(currentPageAtom);
  const [movieType] = useAtom(movieTypeAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If we're on page 1, use the initial movies
    if (currentPage === 1) {
      setMovies(initialMovies);
      setError(null);
      return;
    }

    // Otherwise fetch the movies for the current page
    async function fetchMovies() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/movies/${movieType}?page=${currentPage}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        if (data.results) {
          setMovies(data.results);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
        console.error('Failed to fetch movies:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [currentPage, movieType, initialMovies]);

  return { movies, isLoading, error };
}
