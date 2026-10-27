// 요청 시점에 TMDB 데이터를 읽습니다.
export const dynamic = "force-dynamic";

import MovieCard from "@/components/MovieCard";
import { getPopularMovies } from "@/lib/tmdb";

export default async function MoviesPage() {
  const data = await getPopularMovies();

  return (
    <main>
      <h1>인기 영화</h1>

      {data.results.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </main>
  );
}
