// 요청 시점에 TMDB 데이터를 읽습니다.
export const dynamic = "force-dynamic";

import { getMovieDetail } from "@/lib/tmdb";

type MovieDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  const { id } = await params;
  const movie = await getMovieDetail(id);

  return (
    <main>
      <h1>{movie.title}</h1>
      <p>평점: {movie.vote_average}</p>
      <p>개봉일: {movie.release_date}</p>

      <p>
        상영 시간:
        {movie.runtime !== null
          ? ` ${movie.runtime}분`
          : " 정보 없음"}
      </p>

      <p>{movie.overview}</p>

      <p>
        장르: {movie.genres.map((genre) => genre.name).join(", ")}
      </p>
    </main>
  );
}
