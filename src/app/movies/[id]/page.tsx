import { getMovieDetails, getMovieVideos } from '@/lib/tmdb';
import type { MovieDetails, MovieVideo } from '@/lib/tmdb';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import MovieDetailsPageContent from '@/components/movies/MovieDetailsPageContent';
import { getBackdropUrl } from '@/lib/tmdb';
import type { Metadata } from 'next';
import { isMovieDetails, isMovieVideo } from '@/lib/type-validation';

// Define expected response types
type MovieDetailsResponse = MovieDetails | { status_code: number; status_message: string };
type MovieVideosResponse = MovieVideo[] | { status_code: number; status_message: string };

// Type guard for API error response
interface TMDBError {
  status_code: number;
  status_message: string;
}

function isApiError(response: unknown): response is TMDBError {
  if (
    typeof response !== 'object' ||
    response === null ||
    !('status_code' in response) ||
    !('status_message' in response)
  ) {
    return false;
  }

  const error = response as Record<string, unknown>;
  return (
    typeof error.status_code === 'number' &&
    typeof error.status_message === 'string'
  );
}

// Validated data fetching function
async function getData(id: string): Promise<{ movie: MovieDetails; videos: MovieVideo[] }> {
  console.log('getData called with id:', id);

  if (!id || id.trim() === '') {
    console.error('getData: id is undefined, null, or empty');
    throw new Error('Invalid movie ID: empty or undefined');
  }

  const parsedId = parseInt(id);
  if (isNaN(parsedId) || parsedId <= 0) {
    console.error('getData: Invalid movie ID format or value:', id);
    throw new Error(`Invalid movie ID: ${id}`);
  }

  try {
    console.log('Fetching movie data for ID:', parsedId);
    
    const [movieResponse, videosResponse] = await Promise.all([
      getMovieDetails(parsedId) as Promise<MovieDetailsResponse>,
      getMovieVideos(parsedId) as Promise<MovieVideosResponse>
    ]);

    // Log raw responses for debugging
    console.log('Raw movie response:', movieResponse);
    console.log('Raw videos response:', videosResponse);

    // Handle API errors
    if (isApiError(movieResponse)) {
      console.error('Movie API Error:', movieResponse);
      throw new Error(`Movie API Error: ${movieResponse.status_message}`);
    }

    if (isApiError(videosResponse)) {
      console.error('Videos API Error:', videosResponse);
      throw new Error(`Videos API Error: ${videosResponse.status_message}`);
    }

    // Validate movie details
    if (!isMovieDetails(movieResponse)) {
      console.error('Invalid movie response structure:', movieResponse);
      throw new Error('Invalid movie data structure');
    }

    // Validate and process videos
    let validatedVideos: MovieVideo[] = [];
    if (Array.isArray(videosResponse)) {
      validatedVideos = videosResponse.filter((video): video is MovieVideo => {
        const isValid = isMovieVideo(video);
        if (!isValid) {
          console.warn('Invalid video object found:', video);
        }
        return isValid;
      });
    }

    console.log('Validated movie data:', {
      movieId: movieResponse.id,
      title: movieResponse.title,
      validVideoCount: validatedVideos.length
    });

    return {
      movie: movieResponse,
      videos: validatedVideos
    };
  } catch (err) {
    console.error('Error in getData:', err);
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('Unknown error fetching movie data');
  }
}

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { movie } = await getData(params.id);
    
    const description = movie.overview
      ? movie.overview.slice(0, 160) + (movie.overview.length > 160 ? '...' : '')
      : 'No description available';

    console.log('Generated metadata for movie:', {
      id: movie.id,
      title: movie.title
    });

    return {
      title: `${movie.title} - Review Room`,
      description,
      openGraph: {
        title: movie.title,
        description: movie.overview || description,
        images: movie.backdrop_path ? [{ url: getBackdropUrl(movie.backdrop_path) }] : []
      }
    };
  } catch (err) {
    console.error('Error generating metadata:', err);
    notFound();
  }
}

export default async function MovieDetailsPage({ params }: PageProps) {
  if (!params?.id) {
    console.error('MovieDetailsPage: No ID provided in params');
    notFound();
  }

  try {
    const { movie, videos } = await getData(params.id);
    
    console.log('Rendering movie details page:', {
      id: movie.id,
      title: movie.title,
      videoCount: videos.length
    });

    return (
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen bg-black">
          <div className="text-xl font-semibold text-white">Loading movie...</div>
        </div>
      }>
        <MovieDetailsPageContent
          movie={movie}
          videos={videos}
          id={params.id}
        />
      </Suspense>
    );
  } catch (err) {
    console.error('Error rendering MovieDetailsPage:', err);
    notFound();
  }
}
