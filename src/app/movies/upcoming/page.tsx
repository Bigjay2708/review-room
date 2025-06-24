import { getUpcomingMovies } from '@/lib/tmdb';
import type { Movie } from '@/lib/tmdb';
import type { Metadata } from 'next';
import PaginatedMovieList from '@/components/movies/PaginatedMovieList';

export const metadata: Metadata = {
  title: 'Upcoming Movies - Review Room',
  description: 'Stay ahead with the latest upcoming movie releases and premieres on Review Room. Find release dates, watch trailers, and get excited for what\'s coming to theaters.',
};

export default async function UpcomingMoviesPage() {
  // Fetch the first page of data for initial render
  const initialData = await getUpcomingMovies(1);
  const initialMovies: Movie[] = initialData.results;
  const totalPages = initialData.total_pages > 500 ? 500 : initialData.total_pages;
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Movies</h1>
        <p className="text-gray-600 max-w-3xl">
          Stay ahead of the curve with the latest upcoming movie releases. From highly anticipated blockbusters to indie darlings, discover what&apos;s coming soon to theaters.
        </p>
      </div>
      
      <PaginatedMovieList
        initialMovies={initialMovies}
        totalPages={totalPages}
        category="upcoming"
      />
    </div>
  );
}
