import { getMovieDetails, getMovieVideos, getPosterUrl, getBackdropUrl } from '@/lib/tmdb';
import type { Metadata } from 'next';
import Image from 'next/image';
import { FaStar, FaClock, FaCalendarAlt, FaPlay } from 'react-icons/fa';
import ReviewSection from '@/components/movies/ReviewSection';
import { formatDate, formatRuntime, formatCurrency } from '@/lib/utils';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const id = params.id;
  const movieId = parseInt(id);
  const movie = await getMovieDetails(movieId);
  
  return {
    title: `${movie.title} - Review Room`,
    description: movie.overview.slice(0, 160) + (movie.overview.length > 160 ? '...' : ''),
  };
}

export default async function MovieDetailsPage(
  { params }: Props
) {
  const id = params.id;
  const movieId = parseInt(id);
  const movie = await getMovieDetails(movieId);
  const videos = await getMovieVideos(movieId);
  
  // Find official trailer
  const trailer = videos.find(video => 
    video.type === 'Trailer' && 
    video.site === 'YouTube'
  );
  
  return (
    <div>
      {/* Backdrop Header */}
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
            {/* Poster */}
            <div className="relative w-48 h-72 md:w-64 md:h-96 shrink-0 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={getPosterUrl(movie.poster_path)}
                alt={movie.title}
                fill
                sizes="(max-width: 768px) 192px, 256px"
                className="object-cover"
              />
            </div>
            
            {/* Movie Info */}
            <div className="text-white text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold mb-2">{movie.title}</h1>
              {movie.tagline && (
                <p className="text-xl text-gray-300 italic mb-4">{movie.tagline}</p>
              )}
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">                <div className="flex items-center">
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
                <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Overview</h3>
                <p className="text-gray-300">{movie.overview}</p>
              </div>
              
              {/* Movie Stats */}
              {(movie.budget > 0 || movie.revenue > 0) && (
                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    {movie.budget > 0 && (
                      <div>
                        <h4 className="text-sm text-gray-400">Budget</h4>
                        <p className="text-white font-semibold">{formatCurrency(movie.budget)}</p>
                      </div>
                    )}
                    {movie.revenue > 0 && (
                      <div>
                        <h4 className="text-sm text-gray-400">Revenue</h4>
                        <p className="text-white font-semibold">{formatCurrency(movie.revenue)}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                {movie.genres?.map(genre => (
                  <span 
                    key={genre.id}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              
              {trailer && (
                <a 
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
                >
                  <FaPlay className="mr-2" /> Watch Trailer
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
        {/* Review Section */}
      <div className="container mx-auto px-4 py-12">
        <ReviewSection movieId={movieId} movieTitle={movie.title} />
      </div>
    </div>
  );
}
