import { notFound } from "next/navigation";
import type {
  MovieDetail,
  MovieListResponse,
} from "@/types/movie";

const BASE_URL = "https://api.themoviedb.org/3";

export async function getPopularMovies() {
  const token = process.env.TMDB_TOKEN;

  if (!token) {
    throw new Error("TMDB_TOKEN이 설정되지 않았습니다.");
  }

  const response = await fetch(
    `${BASE_URL}/movie/popular?language=ko-KR&page=1`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("영화 목록을 불러오지 못했습니다.");
  }

  const data: MovieListResponse = await response.json();

  return data;
}

export async function getMovieDetail(movieId: string) {
  const token = process.env.TMDB_TOKEN;

  if (!token) {
    throw new Error("TMDB_TOKEN이 설정되지 않았습니다.");
  }

  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?language=ko-KR`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    }
  );

  if (response.status === 404) notFound();
  if (!response.ok) {
    throw new Error("영화 상세 정보를 불러오지 못했습니다.");
  }

  const data: MovieDetail = await response.json();

  return data;
}
