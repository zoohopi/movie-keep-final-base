-- 과제 3: 이 파일을 먼저 완성합니다. 과제 전용 SQLite Fiddle에서만 실행하세요.
-- 주의: 실행할 때마다 실습 테이블을 삭제하고 영화 6건·찜 8건으로 초기화합니다.
PRAGMA foreign_keys = ON;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL
);

CREATE TABLE favorites (
  id INTEGER PRIMARY KEY,
  userId TEXT NOT NULL,
  movieId INTEGER NOT NULL,
  memo TEXT NOT NULL DEFAULT '',
  -- TODO 12 [과제 3]: 바로 위 memo 정의 끝에 쉼표를 추가하고,
  -- userId와 movieId 조합의 UNIQUE 제약조건을 한 줄 작성하세요. 그 끝에도 쉼표가 필요합니다.
  UNIQUE (userId, movieId),
  -- TODO 13 [과제 3]: movieId가 movies.id를 참조하는 외래 키를 작성하세요.
  -- 마지막 제약조건 뒤에는 쉼표를 붙이지 않습니다.
  FOREIGN KEY (movieId) REFERENCES movies(id)
);
-- TODO 전에도 초기화 자체는 실행됩니다. 그러나 중복·외래 키 차단은 아직 동작하지 않습니다.
-- 데이터 8건이 보인다는 사실만으로 과제 3을 완료한 것은 아닙니다.

INSERT INTO movies (id, title) VALUES
  (101, '인셉션'), (102, '인터스텔라'), (103, '다크 나이트'),
  (104, '테넷'), (105, '어벤져스'), (106, '어벤져스: 엔드게임');
INSERT INTO favorites (id, userId, movieId, memo) VALUES
  (1, 'user-a', 101, '주말에 볼 영화'),
  (2, 'user-b', 101, '친구가 추천한 영화'),
  (3, 'user-a', 102, ''),
  (4, 'user-c', 103, '다시 보고 싶은 영화'),
  (5, 'user-a', 104, '가족과 볼 영화'),
  (6, 'user-b', 105, ''),
  (7, 'user-c', 101, 'OST가 좋은 영화'),
  (8, 'user-a', 106, '친구와 볼 영화');

PRAGMA foreign_keys;
SELECT * FROM movies ORDER BY id ASC;
SELECT * FROM favorites ORDER BY id ASC;
