'use client';

import { useState, useEffect, Suspense } from 'react';
import { FaSearch } from 'react-icons/fa';
import MovieGrid from '@/components/movies/MovieGrid';
import type { Movie } from '@/lib/tmdb';
import { toast } from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialQuery = searchParams.get('query') || '';
  const initialPage = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;
  
  const [query, setQuery] = useState(initialQuery);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(!!initialQuery);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  const performSearch = async (searchQuery: string, page: number) => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search term');
      return;
    }
    
    try {
      setLoading(true);
      
      const response = await fetch(`/api/movies/search?query=${encodeURIComponent(searchQuery)}&page=${page}`);
      
      if (!response.ok) {
        throw new Error('Failed to search movies');
      }
      
      const data = await response.json();
      setMovies(data.results || []);
      setTotalPages(Math.min(data.total_pages || 1, 500)); // TMDB API has a max of 500 pages
      setSearched(true);
      
      // Update URL with search parameters
      const params = new URLSearchParams();
      params.set('query', searchQuery);
      if (page > 1) {
        params.set('page', page.toString());
      }
      router.push(`/search?${params.toString()}`);
    } catch (error) {
      console.error('Error searching movies:', error);
      toast.error('Failed to search movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query, 1); // Reset to page 1 on new search
    setCurrentPage(1);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    performSearch(query, page);
  };
  
  // Perform search on initial load if query exists in URL
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      performSearch(initialQuery, initialPage);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Search Movies</h1>
      
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-12">
        <div className="flex w-full max-w-2xl mx-auto">
          <div className="relative flex-grow">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies..."
              className="w-full py-3 px-4 pl-12 bg-white border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaSearch />
            </div>
          </div>
          <button
            type="submit"            disabled={loading}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-8 py-3 rounded-r-full hover:opacity-90 transition-opacity disabled:opacity-70"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      
      {/* Results */}
      {loading ? (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching for movies...</p>
        </div>
      ) : searched ? (
        <>
          <h2 className="text-2xl font-bold mb-6">
            {movies.length === 0 
              ? 'No movies found' 
              : `Found ${movies.length} results for "${query}"`}
          </h2>
          <MovieGrid 
            movies={movies} 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="text-center py-16 bg-gray-100 rounded-lg">
          <FaSearch className="text-4xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Search for your favorite movies</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Enter a movie title to find movies, read reviews, and more.
          </p>
        </div>
      )}
    </div>
  );
}

// Wrap with Suspense to fix the build error with useSearchParams
export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading search...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
