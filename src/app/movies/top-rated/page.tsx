import { getTopRatedMovies } from '@/lib/tmdb';
import type { Movie } from '@/lib/tmdb';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import PaginatedMovieList from '@/components/movies/PaginatedMovieList';

export const metadata: Metadata = {
  title: 'Top Rated Movies - Review Room',
  description: 'Browse the highest-rated movies of all time on Review Room. Read reviews, watch trailers, and rate your favorites.',
};

export default async function TopRatedMoviesPage() {
  // In Next.js 15, we need to completely avoid using searchParams directly
  // Use default page 1 for server-side initial data
  const page = 1;
  
  // Fetch data for the first page only (client pagination will handle the rest)
  const data = await getTopRatedMovies(page);
  const initialMovies: Movie[] = data.results;
  const totalPages = data.total_pages > 500 ? 500 : data.total_pages;
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Top Rated Movies</h1>
        <p className="text-gray-600 max-w-3xl">
          Discover the highest-rated movies of all time, loved by audiences and critics alike. These films have earned their place among the best in cinema history.
        </p>
      </div>
      
      <Suspense fallback={<div>Loading movies...</div>}>
        <PaginatedMovieList
          initialMovies={initialMovies}
          totalPages={totalPages}
          category="top_rated"
        />
      </Suspense>
    </div>
  );
}
