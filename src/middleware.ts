import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Handle movie detail routes
  const movieIdMatch = url.pathname.match(/^\/movies\/(\d+)$/);
  if (movieIdMatch) {
    const movieId = movieIdMatch[1];
    url.pathname = `/movies/movie`;
    url.searchParams.set('id', movieId);
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}
 
export const config = {
  matcher: ['/movies/:id*'],
};
