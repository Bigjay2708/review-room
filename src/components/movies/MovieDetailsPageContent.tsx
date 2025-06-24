import type { MovieDetails, MovieVideo } from '@/lib/tmdb';
import { Suspense } from 'react';
import Image from 'next/image';
import { FaStar, FaClock, FaCalendarAlt, FaPlay } from 'react-icons/fa';
import { formatDate, formatRuntime } from '@/lib/utils';
import { getBackdropUrl, getPosterUrl } from '@/lib/tmdb';
import ReviewSection from './ReviewSection';

type MovieHeroProps = {
  movie: MovieDetails;
  trailer?: MovieVideo;
};

function MovieHero({ movie, trailer }: MovieHeroProps) {
  return (
    <Suspense 
      fallback={
        <div className="flex items-center justify-center h-[600px]">
          <div className="text-xl font-semibold text-white">Loading movie details...</div>
        </div>
      }
    >
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
        <div className="absolute inset-0">
          <Image
            src={getBackdropUrl(movie.backdrop_path)}
            alt={movie.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:items-end gap-8 h-full pb-12">
            <div className="relative w-48 h-72 md:w-64 md:h-96 shrink-0 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={getPosterUrl(movie.poster_path)}
                alt={movie.title}
                fill
                sizes="(max-width: 768px) 192px, 256px"
                className="object-cover"
              />
            </div>
            
            <div className="text-white text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold mb-2">{movie.title}</h1>
              {movie.tagline && (
                <p className="text-xl text-gray-300 italic mb-4">{movie.tagline}</p>
              )}
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
                <div className="flex items-center">
                  <FaStar className="text-yellow-500 mr-1" />
                  <span>{movie.vote_average.toFixed(1)} ({movie.vote_count.toLocaleString()} votes)</span>
                </div>
                {movie.runtime > 0 && (
                  <div className="flex items-center">
                    <FaClock className="text-gray-400 mr-1" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <FaCalendarAlt className="text-gray-400 mr-1" />
                  <span>{formatDate(movie.release_date)}</span>
                </div>
              </div>

              <p className="text-gray-300 max-w-2xl mb-6">{movie.overview}</p>

              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 transition rounded-lg text-white font-semibold"
                >
                  <FaPlay className="mr-2" />
                  Watch Trailer
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

function MovieReviews({ movieId, movieTitle }: { movieId: number; movieTitle: string }) {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="h-40 flex items-center justify-center">
          <div className="text-xl font-semibold text-white">Loading reviews...</div>
        </div>
      </div>
    }>
      <div className="container mx-auto px-4 py-8">
        <ReviewSection movieId={movieId} movieTitle={movieTitle} />
      </div>
    </Suspense>
  );
}

export type MovieDetailsPageContentProps = {
  movie: MovieDetails;
  videos: MovieVideo[];
  id: string;
};

export default function MovieDetailsPageContent({ movie, videos, id }: MovieDetailsPageContentProps) {
  const trailer = videos.find(video => 
    video.type === 'Trailer' && 
    video.site === 'YouTube'
  );

  return (
    <div className="min-h-screen bg-black">
      <MovieHero movie={movie} trailer={trailer} />
      <MovieReviews movieId={parseInt(id)} movieTitle={movie.title} />
    </div>
  );
}
