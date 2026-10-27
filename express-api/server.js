import express from "express";

const app = express();

// 제공 데이터: SQL과 같은 가상 사용자 예시지만 자동으로 연결되지는 않습니다.
const favorites = [
  { id: 1, userId: "user-a", movieId: 101, memo: "주말에 볼 영화" },
  { id: 2, userId: "user-b", movieId: 101, memo: "친구가 추천한 영화" },
  { id: 3, userId: "user-a", movieId: 102, memo: "" },
  { id: 4, userId: "user-c", movieId: 103, memo: "다시 보고 싶은 영화" },
  { id: 5, userId: "user-a", movieId: 104, memo: "가족과 볼 영화" },
  { id: 6, userId: "user-b", movieId: 105, memo: "" },
  { id: 7, userId: "user-c", movieId: 101, memo: "OST가 좋은 영화" },
  { id: 8, userId: "user-a", movieId: 106, memo: "친구와 볼 영화" },
];

app.get("/", (req, res) => {
  res.json({ message: "MovieKeep 찜 API 서버입니다." });
});

// TODO 17 [과제 8]: app.get()으로 /api/favorites의 GET 요청을 등록하고
// res.json()으로 favorites 배열을 응답하세요.
app.get("/api/favorites", (req, res) => {
  res.json(favorites);
});

// TODO 18 [과제 8]: /api/favorite-count의 GET 요청을 등록하고
// favoriteCount 속성을 가진 객체를 응답하세요. 값은 favorites.length로 계산합니다.
app.get("/api/favorite-count", (req, res) => {
  res.json({ favoriteCount: favorites.length });
});

// TODO 전에는 /만 응답하며, 두 /api 경로의 Cannot GET(404)은 정상적인 미완성 상태입니다.
app.listen(4000, () => {
  console.log("서버 실행: http://localhost:4000");
});
