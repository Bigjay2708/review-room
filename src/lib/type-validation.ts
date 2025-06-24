import type { Movie, MovieDetails, MovieVideo } from './tmdb';

export function isMovie(value: unknown): value is Movie {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'title' in value &&
    'overview' in value &&
    'poster_path' in value &&
    'backdrop_path' in value &&
    'release_date' in value &&
    'vote_average' in value &&
    'vote_count' in value &&
    'genre_ids' in value &&
    Array.isArray((value as Movie).genre_ids)
  );
}

export function isMovieDetails(value: unknown): value is MovieDetails {
  return (
    isMovie(value) &&
    'runtime' in value &&
    'tagline' in value &&
    'status' in value &&
    'budget' in value &&
    'revenue' in value &&
    'homepage' in value &&
    'production_companies' in value &&
    Array.isArray((value as MovieDetails).production_companies)
  );
}

export function isMovieVideo(value: unknown): value is MovieVideo {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'key' in value &&
    'name' in value &&
    'site' in value &&
    'type' in value &&
    'official' in value &&
    typeof (value as MovieVideo).id === 'string' &&
    typeof (value as MovieVideo).key === 'string' &&
    typeof (value as MovieVideo).name === 'string' &&
    typeof (value as MovieVideo).site === 'string' &&
    typeof (value as MovieVideo).type === 'string' &&
    typeof (value as MovieVideo).official === 'boolean'
  );
}
