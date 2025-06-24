import { getMovieDetails, getMovieVideos } from '@/lib/tmdb';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import MovieDetailsPageContent from '@/components/movies/MovieDetailsPageContent';
import { getBackdropUrl } from '@/lib/tmdb';
import type { Metadata, ResolvingMetadata } from 'next';

// Type guard to check if response is an error
function isMovieAPIError(response: unknown): response is { status_message: string; status_code: number } {
  return (
    typeof response === 'object' &&
    response !== null &&
    'status_code' in response &&
    'status_message' in response
  );
}

async function getData(id: string) {
  console.log('getData called with id:', id);
  console.log('typeof id:', typeof id);

  if (!id) {
    console.error('getData: id is undefined or null');
    notFound();
  }

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    console.error('getData: Invalid movie ID format:', id);
    notFound();
  }

  try {
    console.log('Fetching movie data for ID:', parsedId);
    
    const [movieResponse, videosResponse] = await Promise.all([
      getMovieDetails(parsedId),
      getMovieVideos(parsedId)
    ]);

    // Type check and log the API responses
    console.log('Movie API Response:', JSON.stringify(movieResponse, null, 2));
    console.log('Videos API Response:', JSON.stringify(videosResponse, null, 2));

    if (isMovieAPIError(movieResponse)) {
      console.error('Movie API Error:', {
        statusCode: movieResponse.status_code,
        message: movieResponse.status_message
      });
      notFound();
    }

    if (!movieResponse || !movieResponse.id) {
      console.error('Invalid movie response - missing data:', movieResponse);
      notFound();
    }

    const videos = Array.isArray(videosResponse) ? videosResponse : [];
    console.log('Processed videos count:', videos.length);

    return { movie: movieResponse, videos };
  } catch (err) {
    console.error('Error in getData:', {
      error: err,
      message: err instanceof Error ? err.message : 'Unknown error',
      stack: err instanceof Error ? err.stack : undefined
    });
    notFound();
  }
}

type MoviePageProps = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: MoviePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  console.log('generateMetadata called with params:', params);

  try {
    const { movie } = await getData(params.id);
    await parent;

    const description = movie.overview
      ? movie.overview.slice(0, 160) + (movie.overview.length > 160 ? '...' : '')
      : 'No description available';

    console.log('Generated metadata:', {
      title: movie.title,
      description: description,
      hasBackdropImage: !!movie.backdrop_path
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
    console.error('Error in generateMetadata:', {
      error: err,
      message: err instanceof Error ? err.message : 'Unknown error',
      stack: err instanceof Error ? err.stack : undefined,
      params: params
    });
    return {
      title: 'Movie Not Found - Review Room',
      description: 'The requested movie could not be found.'
    };
  }
}

export default async function MovieDetailsPage({ params }: MoviePageProps) {
  console.log('MovieDetailsPage rendered with params:', params);

  try {
    const { movie, videos } = await getData(params.id);
    
    console.log('MovieDetailsPage data loaded:', {
      movieId: movie.id,
      movieTitle: movie.title,
      videosCount: videos.length
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
    console.error('Error in MovieDetailsPage render:', {
      error: err,
      message: err instanceof Error ? err.message : 'Unknown error',
      params: params,
      stack: err instanceof Error ? err.stack : undefined
    });
    notFound();
  }
}
