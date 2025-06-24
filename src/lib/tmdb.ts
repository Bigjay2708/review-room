import axios from 'axios';
import { posterPlaceholder, backdropPlaceholder } from './placeholders';

// Use either the server-side env var or the public one
const TMDB_API_KEY = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = process.env.TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

if (!TMDB_API_KEY) {
  throw new Error('TMDB_API_KEY is not defined in environment variables');
}

// Create axios instance for TMDB API
const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  genres?: { id: number; name: string }[];
}

export interface MovieDetails extends Movie {
  runtime: number;
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  homepage: string;
  production_companies: { id: number; name: string; logo_path: string }[];
}

export interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

// Function to get the poster URL
export const getPosterUrl = (path: string, size: string = 'w500') => {
  if (!path) return posterPlaceholder;
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

// Function to get the backdrop URL
export const getBackdropUrl = (path: string, size: string = 'original') => {
  if (!path) return backdropPlaceholder;
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

// Get popular movies
export const getPopularMovies = async (page: number = 1) => {
  try {
    const response = await tmdbApi.get('/movie/popular', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

// Get top rated movies
export const getTopRatedMovies = async (page: number = 1) => {
  try {
    const response = await tmdbApi.get('/movie/top_rated', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw error;
  }
};

// Get upcoming movies
export const getUpcomingMovies = async (page: number = 1) => {
  try {
    const response = await tmdbApi.get('/movie/upcoming', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    throw error;
  }
};

// Get movie details by ID
export const getMovieDetails = async (id: number) => {
  try {
    const response = await tmdbApi.get(`/movie/${id}`);
    return response.data as MovieDetails;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${id}:`, error);
    throw error;
  }
};

// Get movie videos (trailers, teasers, etc.)
export const getMovieVideos = async (id: number) => {
  try {
    const response = await tmdbApi.get(`/movie/${id}/videos`);
    return response.data.results as MovieVideo[];
  } catch (error) {
    console.error(`Error fetching videos for movie ID ${id}:`, error);
    throw error;
  }
};

// Search movies by query
export const searchMovies = async (query: string, page: number = 1) => {
  try {
    const response = await tmdbApi.get('/search/movie', {
      params: { query, page },
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching movies with query "${query}":`, error);
    throw error;
  }
};

export default tmdbApi;
