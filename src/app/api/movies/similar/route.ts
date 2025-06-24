import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get('id');
    
    if (!idParam) {
      return NextResponse.json(
        { error: 'Movie ID is required' },
        { status: 400 }
      );
    }
    
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid movie ID' },
        { status: 400 }
      );
    }

    // Get similar movies from TMDB API
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/movie/${id}/similar`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          language: 'en-US',
          page: 1
        }
      }
    );
    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(`Error fetching similar movies:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch similar movies' },
      { status: 500 }
    );
  }
}
