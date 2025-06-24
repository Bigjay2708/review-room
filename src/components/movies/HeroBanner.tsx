'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Movie } from '@/lib/tmdb';
import { FaPlay } from 'react-icons/fa';
import { backdropPlaceholder } from '@/lib/placeholders';
import { motion } from 'framer-motion';

interface HeroBannerProps {
  movie: Movie;
}

const HeroBanner = ({ movie }: HeroBannerProps) => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={movie.backdrop_path 
            ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p'}/original${movie.backdrop_path}`
            : backdropPlaceholder}
          alt={movie.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-4 pb-12 md:pb-16">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {movie.title}
            </motion.h1>
            <motion.p 
              className="text-lg text-white/90 mb-8 line-clamp-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {movie.overview}
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link 
                href={`/movies/${movie.id}`}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity flex items-center"
              >
                <FaPlay className="mr-2" />
                Watch Trailer
              </Link>
              <Link 
                href={`/movies/${movie.id}`}
                className="bg-white/20 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-full hover:bg-white/30 transition-colors"
              >
                View Details
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
