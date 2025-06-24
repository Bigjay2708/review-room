'use client';

import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import type { Movie } from '@/lib/tmdb';

interface SimilarMoviesProps {
  movieId: number;
}

const SimilarMovies = ({ movieId }: SimilarMoviesProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchSimilarMovies = async () => {
      if (!movieId) return;
      
      try {
        setLoading(true);
        const response = await fetch(`/api/movies/similar?id=${movieId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch similar movies');
        }
        
        const data = await response.json();
        setMovies(data.results?.slice(0, 4) || []);
      } catch (err) {
        console.error('Error fetching similar movies:', err);
        setError('Failed to load similar movies');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSimilarMovies();
  }, [movieId]);
  
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-gray-200 rounded-lg h-72 animate-pulse" />
        ))}
      </div>
    );
  }
  
  if (error || !movies.length) {
    return null; // Don't show anything if there's an error or no similar movies
  }
  
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">You Might Also Like</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SimilarMovies;
