'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import type { Movie } from '@/lib/tmdb';
import { formatDate, truncateText } from '@/lib/utils';
import { posterPlaceholder } from '@/lib/placeholders';
import { motion } from 'framer-motion';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  // Use NEXT_PUBLIC variable or a default image URL
  const posterUrl = movie.poster_path
    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p'}/w500${movie.poster_path}`
    : posterPlaceholder;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/movies/${movie.id}`}>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
          <div className="relative h-96">
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              priority={false}
            />
            <div className="absolute top-2 right-2 bg-pink-500 text-white font-bold rounded-full h-10 w-10 flex items-center justify-center">
              {movie.vote_average.toFixed(1)}
            </div>
          </div>
          
          <div className="p-4 flex-grow flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{movie.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{formatDate(movie.release_date)}</p>
            <p className="text-sm text-gray-700 line-clamp-3 flex-grow">{truncateText(movie.overview, 120)}</p>
            
            <div className="flex items-center mt-3">
              <FaStar className="text-yellow-500 mr-1" />
              <span className="text-sm text-gray-600">
                {movie.vote_average.toFixed(1)} ({movie.vote_count.toLocaleString()} reviews)
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;
