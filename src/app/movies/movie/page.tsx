'use client';

import { useSearchParams } from 'next/navigation';
import MoviePageContent from './MoviePageContent';

export default function MoviePage() {
  const searchParams = useSearchParams();
  const movieIdParam = searchParams.get('id');
  const movieId = movieIdParam ? parseInt(movieIdParam) : 0;
  
  return <MoviePageContent movieId={movieId} />;
}
