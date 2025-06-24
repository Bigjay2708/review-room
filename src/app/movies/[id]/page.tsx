import { getMovieDetails, getMovieVideos } from '@/lib/tmdb';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import MovieDetailsPageContent from '@/components/movies/MovieDetailsPageContent';
import { getBackdropUrl } from '@/lib/tmdb';
import type { Metadata, ResolvingMetadata } from 'next';

async function getData(id: string) {
  if (!id || isNaN(parseInt(id))) notFound();
  try {
    const [movie, videos] = await Promise.all([
      getMovieDetails(parseInt(id)),
      getMovieVideos(parseInt(id))
    ]);
    if (!movie?.id) notFound();
    return { movie, videos: Array.isArray(videos) ? videos : [] };
  } catch (err) {
    console.error('Error fetching movie data:', err);
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
  try {
    const { movie } = await getData(params.id);
    await parent; // Wait for parent metadata
    
    const description = movie.overview?.slice(0, 160) + (movie.overview?.length > 160 ? '...' : '') || 'No description available';

    return {
      title: `${movie.title} - Review Room`,
      description,
      openGraph: {
        title: movie.title,
        description: movie.overview || description,
        images: movie.backdrop_path ? [{ url: getBackdropUrl(movie.backdrop_path) }] : []
      }
    };
  } catch {
    return {
      title: 'Movie Not Found - Review Room',
      description: 'The requested movie could not be found.'
    };
  }
}

// @ts-expect-error - Next.js 15 type issue with dynamic params
export default async function MovieDetailsPage({ params }: MoviePageProps) {
  const { movie, videos } = await getData(params.id);
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
}
