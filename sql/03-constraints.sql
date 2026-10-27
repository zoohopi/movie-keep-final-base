-- 과제 6: 완성한 00-setup.sql로 초기화하고 A → B → C → D를 한 문장씩 실행.
-- 여기는 새 TODO 번호를 추가하지 않는 검증 구간입니다.
-- 학습자가 A~D의 INSERT/DELETE와 마지막 정리 DELETE를 직접 작성하세요.

-- A: id 40으로 user-a의 영화 101 찜 추가. memo는 생략.
-- 예상: UNIQUE 오류. id가 달라도 사용자+영화가 기존 1번과 같습니다.
-- 작성 SQL:
INSERT INTO favorites (id, userId, movieId) VALUES (40, 'user-a', 101);

-- B: id 41로 user-b의 영화 106 찜 추가. memo는 생략.
-- 예상: 성공. 같은 영화는 서로 다른 사용자가 찜할 수 있습니다.
-- 작성 SQL:
INSERT INTO favorites (id, userId, movieId) VALUES (41, 'user-b', 106);

-- C: id 42로 user-b의 영화 999 찜 추가. memo는 생략.
-- 예상: FOREIGN KEY 오류.
-- 작성 SQL:
INSERT INTO favorites (id, userId, movieId) VALUES (42, 'user-b', 999);

-- D: movies에서 id 106인 영화 삭제.
-- 예상: FOREIGN KEY 오류.
-- 작성 SQL:
DELETE FROM movies WHERE id = 106;

-- D 실행 후 확인(제공 코드): 초기 8건과 테스트 id 41인 찜, 영화 106이 남아야 합니다.
SELECT * FROM favorites ORDER BY id ASC;
SELECT COUNT(*) AS favoriteCount FROM favorites;
SELECT * FROM movies WHERE id = 106;

-- 검증이 모두 기대대로 끝난 경우에만 id 41을 삭제하는 정리 SQL을 작성하세요.
-- 작성 SQL:
DELETE FROM favorites WHERE id = 41;

SELECT * FROM favorites ORDER BY id ASC;
-- 기대: 초기 8건. A/C/D가 예상과 다르게 성공하면 정리만 하지 말고,
-- 제약조건을 수정한 뒤 00-setup.sql을 다시 실행해 A부터 재검증하세요.
