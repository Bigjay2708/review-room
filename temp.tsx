import { getMovieDetails, getMovieVideos, getBackdropUrl, getPosterUrl } from "@/lib/tmdb";
import Image from "next/image";
import { FaStar, FaClock, FaCalendarAlt, FaPlay } from "react-icons/fa";
import ReviewSection from "@/components/movies/ReviewSection";
import { formatDate, formatRuntime, formatCurrency } from "@/lib/utils";
import { Suspense } from "react";
import type { Metadata } from "next";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
