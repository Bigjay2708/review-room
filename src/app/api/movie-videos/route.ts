import { NextRequest, NextResponse } from 'next/server';
import { getMovieVideos } from '@/lib/tmdb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const movieIdParam = searchParams.get('id');
    
    if (!movieIdParam) {
      return NextResponse.json(
        { error: 'Movie ID is required' },
        { status: 400 }
      );
    }
    
    const id = parseInt(movieIdParam);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid movie ID' },
        { status: 400 }
      );
    }

    const videos = await getMovieVideos(id);
    
    return NextResponse.json({ videos });
  } catch (error) {
    console.error(`Error fetching videos for movie ID:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch movie videos' },
      { status: 500 }
    );
  }
}
