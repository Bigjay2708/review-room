import MovieCard from './MovieCard';
import type { Movie } from '@/lib/tmdb';
import PaginationWrapper from '@/components/ui/PaginationWrapper';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const MovieGrid = ({ 
  movies, 
  title, 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange 
}: MovieGridProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">{title}</h2>
      )}
      
      {movies.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-500 text-xl">No movies found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
            {totalPages > 1 && (
            <PaginationWrapper 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={onPageChange} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default MovieGrid;
