# SQL 실행 결과
실행 순서: 완성한 00-setup → 01-queries → 00-setup → 02-crud → 00-setup → 03-constraints.
아래 결과는 SQLite(외래 키 ON)에서 각 파일을 한 문장씩 실행한 실제 출력입니다.

## 준비: 외래 키 1 / 영화 6건 / 찜 8건

```sql
PRAGMA foreign_keys;               -- 1
SELECT * FROM movies ORDER BY id ASC;
SELECT * FROM favorites ORDER BY id ASC;
```

| movies.id | title |
|---|---|
| 101 | 인셉션 |
| 102 | 인터스텔라 |
| 103 | 다크 나이트 |
| 104 | 테넷 |
| 105 | 어벤져스 |
| 106 | 어벤져스: 엔드게임 |

| id | userId | movieId | memo |
|---|---|---|---|
| 1 | user-a | 101 | 주말에 볼 영화 |
| 2 | user-b | 101 | 친구가 추천한 영화 |
| 3 | user-a | 102 | '' |
| 4 | user-c | 103 | 다시 보고 싶은 영화 |
| 5 | user-a | 104 | 가족과 볼 영화 |
| 6 | user-b | 105 | '' |
| 7 | user-c | 101 | OST가 좋은 영화 |
| 8 | user-a | 106 | 친구와 볼 영화 |

→ 외래 키 1, 영화 6건, 찜 8건.

## 조건 조회 05·06·07·08

```sql
-- 05
SELECT userId, memo FROM favorites WHERE movieId = 101;
```
| userId | memo |
|---|---|
| user-a | 주말에 볼 영화 |
| user-b | 친구가 추천한 영화 |
| user-c | OST가 좋은 영화 |

```sql
-- 06
SELECT memo FROM favorites WHERE userId = 'user-a' AND movieId = 104;
```
| memo |
|---|
| 가족과 볼 영화 |

```sql
-- 07
SELECT movieId, memo FROM favorites WHERE userId = 'user-c' ORDER BY movieId DESC LIMIT 1;
```
| movieId | memo |
|---|---|
| 103 | 다시 보고 싶은 영화 |

```sql
-- 08
SELECT movieId, memo FROM favorites WHERE userId = 'user-c' ORDER BY movieId DESC;
```
| movieId | memo |
|---|---|
| 103 | 다시 보고 싶은 영화 |
| 101 | OST가 좋은 영화 |

## 빈 메모 JOIN·전체 집계·사용자별 집계 14·15·16

```sql
-- 14
SELECT favorites.userId, movies.title, favorites.memo
FROM favorites
JOIN movies ON favorites.movieId = movies.id
WHERE favorites.memo = ''
ORDER BY favorites.id ASC;
```
| userId | title | memo |
|---|---|---|
| user-a | 인터스텔라 | '' |
| user-b | 어벤져스 | '' |

```sql
-- 15
SELECT COUNT(*) AS emptyMemoCount FROM favorites WHERE memo = '';
```
| emptyMemoCount |
|---|
| 2 |

```sql
-- 16
SELECT userId, COUNT(*) AS emptyMemoCount
FROM favorites
WHERE memo = ''
GROUP BY userId
ORDER BY userId ASC;
```
| userId | emptyMemoCount |
|---|---|
| user-a | 1 |
| user-b | 1 |

→ 사용자별 합계 1 + 1 = 2로 전체 건수와 같습니다. user-c는 빈 메모가 없어 결과에 없습니다.

## CRUD 09·10·11
추가: 9건 / 수정: id 30의 memo만 변경 / 삭제: 초기 8건 복원

```sql
-- 09
INSERT INTO favorites (id, userId, movieId) VALUES (30, 'user-b', 106);
SELECT * FROM favorites WHERE id = 30;        -- (30, user-b, 106, '')
SELECT COUNT(*) AS favoriteCount FROM favorites;  -- 9
```
memo 열을 생략했기 때문에 기본값 빈 문자열이 저장되었습니다.

```sql
-- 10
SELECT * FROM favorites WHERE id = 30;        -- 수정 전: (30, user-b, 106, '')
UPDATE favorites SET memo = '주말에 다시 보기' WHERE id = 30;
SELECT * FROM favorites WHERE id = 30;        -- 수정 후: (30, user-b, 106, 주말에 다시 보기)
```
id·userId·movieId는 그대로이고 memo만 바뀌었습니다.

```sql
-- 11
SELECT * FROM favorites WHERE id = 30;        -- 삭제 전: (30, user-b, 106, 주말에 다시 보기)
DELETE FROM favorites WHERE id = 30;
SELECT * FROM favorites WHERE id = 30;        -- 0행
SELECT * FROM favorites ORDER BY id ASC;      -- 초기 id 1~8, 메모 변화 없음 (준비 표와 동일)
```

## 제약조건 A·B·C·D

| 테스트 | 실행 SQL | 결과 | 실제 메시지 | 이유 |
|---|---|---|---|---|
| A | `INSERT INTO favorites (id, userId, movieId) VALUES (40, 'user-a', 101);` | 실패 | `UNIQUE constraint failed: favorites.userId, favorites.movieId` | id는 새 값이지만 (user-a, 101) 조합이 id 1과 같아 복합 UNIQUE에 걸림 |
| B | `INSERT INTO favorites (id, userId, movieId) VALUES (41, 'user-b', 106);` | 성공 | - | 영화 106은 존재하고, user-b는 106을 아직 찜하지 않음(다른 사용자가 같은 영화를 찜하는 것은 허용) |
| C | `INSERT INTO favorites (id, userId, movieId) VALUES (42, 'user-b', 999);` | 실패 | `FOREIGN KEY constraint failed` | movies에 id 999가 없어 존재하지 않는 영화를 참조함 |
| D | `DELETE FROM movies WHERE id = 106;` | 실패 | `FOREIGN KEY constraint failed` | 찜 id 8, 41이 영화 106을 참조 중이라 삭제 시 참조가 끊김 |

D 직후 확인:

```sql
SELECT * FROM favorites ORDER BY id ASC;          -- id 1~8 + (41, user-b, 106, '')
SELECT COUNT(*) AS favoriteCount FROM favorites;  -- 9
SELECT * FROM movies WHERE id = 106;              -- (106, 어벤져스: 엔드게임) 유지
```

정리:

```sql
DELETE FROM favorites WHERE id = 41;
SELECT * FROM favorites ORDER BY id ASC;          -- 초기 8건으로 복원
```
