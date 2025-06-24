import { NextRequest, NextResponse } from 'next/server';
import { getPosterUrl, getBackdropUrl } from '@/lib/tmdb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');
    const type = searchParams.get('type') || 'poster';
    const size = searchParams.get('size');
    
    if (!path) {
      return NextResponse.json(
        { error: 'Path parameter is required' },
        { status: 400 }
      );
    }

    const imageUrl = type === 'backdrop' 
      ? getBackdropUrl(path, size || 'original')
      : getPosterUrl(path, size || 'w500');
    
    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error('Error getting image URL:', error);
    return NextResponse.json(
      { error: 'Failed to get image URL' },
      { status: 500 }
    );
  }
}
