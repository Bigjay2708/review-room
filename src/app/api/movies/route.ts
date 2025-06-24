import { NextRequest, NextResponse } from 'next/server';
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '@/lib/tmdb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'popular';
    const page = parseInt(searchParams.get('page') || '1');

    let response;
    
    switch (category) {
      case 'popular':
        response = await getPopularMovies(page);
        break;
      case 'top_rated':
        response = await getTopRatedMovies(page);
        break;
      case 'upcoming':
        response = await getUpcomingMovies(page);
        break;
      default:
        response = await getPopularMovies(page);
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
}
