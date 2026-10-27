"use client";

export default function MoviesError({ reset }: { reset: () => void }) {
  return (
    <main>
      <h1>영화 정보를 불러오지 못했습니다.</h1>
      <p>TMDB_TOKEN 설정과 네트워크 연결을 확인해 주세요.</p>
      <button type="button" onClick={reset}>다시 시도</button>
    </main>
  );
}
