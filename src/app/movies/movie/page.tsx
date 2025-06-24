import { Suspense } from 'react';
import MoviePageClient from './MoviePageClient';

export default function MoviePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MoviePageClient />
    </Suspense>
  );
}
