import { atom } from 'jotai';

export const currentPageAtom = atom(1);
export const movieTypeAtom = atom<'popular' | 'top-rated' | 'upcoming'>('popular');
export const selectedMovieAtom = atom<number | null>(null);
