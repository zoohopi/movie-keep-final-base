-- 과제 4·7: 완성한 00-setup.sql 실행 직후의 초기 데이터에서 실행합니다.
-- 각 TODO 아래에 완성한 SQL을 저장하고, 한 문장씩 실행하세요.

-- TODO 05 [과제 4]: 영화 101의 userId, memo만 조회. 기대: 3행(행 순서는 무관).
SELECT userId, memo FROM favorites WHERE movieId = 101;

-- TODO 06 [과제 4]: AND로 user-a와 영화 104 조건을 연결해 memo만 조회.
-- 기대: '가족과 볼 영화' 1행.
SELECT memo FROM favorites WHERE userId = 'user-a' AND movieId = 104;

-- TODO 07 [과제 4]: user-c의 movieId, memo를 영화 ID 내림차순으로 정렬해 1건 조회.
-- 기대: movieId 103, '다시 보고 싶은 영화'.
SELECT movieId, memo FROM favorites WHERE userId = 'user-c' ORDER BY movieId DESC LIMIT 1;

-- TODO 08 [과제 4]: TODO 07에서 LIMIT만 제외한 별도 SQL. 기대: 103 → 101 두 행.
SELECT movieId, memo FROM favorites WHERE userId = 'user-c' ORDER BY movieId DESC;

-- TODO 14 [과제 7]: JOIN으로 빈 메모의 favorites.userId, movies.title, favorites.memo 조회.
-- favorites.movieId와 movies.id가 같은 행끼리 연결. favorites.id 오름차순.
-- 기대: user-a/인터스텔라/빈 메모, user-b/어벤져스/빈 메모.
SELECT favorites.userId, movies.title, favorites.memo
FROM favorites
JOIN movies ON favorites.movieId = movies.id
WHERE favorites.memo = ''
ORDER BY favorites.id ASC;

-- TODO 15 [과제 7]: 빈 메모의 전체 건수를 COUNT(*)로 계산. 열 이름은 emptyMemoCount.
-- 기대: 숫자 2인 결과 한 행. 결과 열은 emptyMemoCount만 사용.
SELECT COUNT(*) AS emptyMemoCount FROM favorites WHERE memo = '';

-- TODO 16 [과제 7]: 빈 메모만 선택한 뒤 userId로 GROUP BY.
-- userId, emptyMemoCount 열을 반환하고 userId 오름차순. 기대: user-a 1, user-b 1.
SELECT userId, COUNT(*) AS emptyMemoCount
FROM favorites
WHERE memo = ''
GROUP BY userId
ORDER BY userId ASC;
