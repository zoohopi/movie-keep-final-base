# MovieKeep — 데이터베이스 종합 실습 Base

Firebase·SQL·Express는 같은 영화 찜 주제를 사용하는 **서로 독립된 세 실습**입니다.
데이터 자동 동기화, Express DB 연결, 앱과 API 연결은 과제에 포함하지 않습니다.
Day42~48 복습용이며, 아래에 지정한 학습 코드는 TODO로 비워 두었습니다.
기존 완성본을 덮어쓰지 말고 압축을 푼 새 폴더에서 시작하세요.

## 1. 시작하기

### A. Firebase 앱
원본 package.json의 요구 버전인 Node.js 20.9 이상과 npm이 필요합니다. 실제 의존 버전은 package-lock.json을 사용합니다.
```
cd firebase-app
npm ci
cp .env.example .env.local
npm run dev
```
.env.local에는 수업에서 사용한 **본인 프로젝트**의 Firebase 설정과 TMDB_TOKEN을 입력합니다.
Firebase 프로젝트의 기존 Google 로그인·허용 도메인·본인 데이터 접근 규칙을 사용합니다.
기존 권한·공유 설정을 임의로 바꾸거나 Firestore를 공개 접근으로 전환하지 않습니다.
firestore.rules는 기존 Day43의 참고 파일이며 이 ZIP을 열어도 배포·적용되지 않습니다.
로그인이 막히면 강사에게 본인 프로젝트 설정 확인을 요청합니다.
주소는 터미널에 표시된 값을 사용하고 /movies를 엽니다.
설정값이 비어 있으면 Firebase/TMDB 기능을 사용할 수 없습니다. 환경 변수 수정 후 서버를 재시작하세요.

### B. SQL
SQLite Fiddle(https://sqlite.org/fiddle/index.html)의 **실습 전용** 환경을 사용합니다.
00-setup.sql의 TODO 12·13을 먼저 완성하고 실행하세요.
외래 키 1 / 영화 6건 / 찜 8건을 확인한 뒤 나머지 파일을 실행합니다.
00-setup은 매번 기존 실습 테이블을 삭제하고 초기화합니다. 운영 DB에서 실행하지 마세요.

### C. Express
별도 터미널에서:
```
cd express-api
npm ci
npm run dev
```
http://localhost:4000/ 의 메시지를 확인합니다. 종료는 Ctrl+C입니다.
같은 포트를 쓰는 수업 서버가 있으면 본인 수업 서버를 먼저 종료합니다.

## 2. 과제와 TODO 위치

| 과제 | 파일 | 직접 작성할 부분 |
|---|---|---|
| 1 Store 반영 | AuthButton.tsx | TODO 01 사용자, TODO 02 조회한 찜 배열 |
| 2 메모 | FavoriteMemo.tsx / AuthButton.tsx | TODO 03-a/b import·await 저장, TODO 04 nullish 기본값 |
| 3 테이블 준비 | sql/00-setup.sql | TODO 12 복합 UNIQUE, TODO 13 외래 키 |
| 4 조건 조회 | sql/01-queries.sql | TODO 05~08 조건·AND·DESC·LIMIT |
| 5 CRUD | sql/02-crud.sql | TODO 09~11 추가·수정·삭제 |
| 6 제약 검증 | sql/03-constraints.sql | A~D 및 정리 SQL 직접 작성·결과 기록 |
| 7 집계 | sql/01-queries.sql | TODO 14~16 JOIN·COUNT·GROUP BY |
| 8 API | express-api/server.js | TODO 17 목록, TODO 18 개수 |

TODO 번호는 앞서 안내한 코드 예시와 맞췄습니다. 따라서 SQL 준비 TODO 12·13을 05보다 먼저 작성합니다.
준비된 타입·Store 함수·UI·CSS·로그인/찜 생성/삭제·조회 코드·오류 처리·테스트 데이터는 수정 대상이 아닙니다.

## 3. 미완성 상태의 동작

- Firebase TODO 01 전에는 로그인해도 Store 사용자/화면이 갱신되지 않습니다.
- TODO 02 전에는 DB 찜 목록이 복원되지 않습니다. TODO 04 전에는 기존 메모가 빈칸으로 읽힙니다.
- TODO 03-b의 임시 throw를 저장 코드로 교체하기 전에는 메모 저장이 실패합니다. 성공 문구가 나오면 안 됩니다.
- SQL 00-setup은 TODO 전에도 8건을 만들지만 UNIQUE/FK가 아직 없습니다. 과제 3 완료로 판단하지 마세요.
- SQL 조회·CRUD·검증 파일의 빈칸은 정답이 아닙니다. SQL을 직접 작성하고 결과를 확인해야 합니다.
- Express TODO 전에는 /만 응답하고 /api 경로는 404입니다.
- 타입 검사 성공과 실제 Firebase 저장 성공은 서로 다른 확인입니다.

## 4. Firebase 확인 순서

1. TODO 01~04를 완성합니다. setFavorites는 배열 자체가 아니라 다음 배열을 반환하는 함수를 받습니다.
2. 로그인 → 한 영화 찜 → 메모 '주말에 볼 영화' 저장 → '친구와 볼 영화'로 수정합니다.
3. 새로고침 후 로그인 확인과 DB 조회가 끝나면 찜과 수정 메모가 복원되는지 확인합니다.
4. 메모를 모두 지우고 저장해도 찜이 유지되는지 확인합니다.
5. 로그아웃하면 Store 사용자와 목록이 초기화되는지 확인합니다.
6. `npm run typecheck`를 실행합니다.

## 5. SQL 실행 순서와 기대 결과

각 파일은 한 문장씩 실행하며 실제 SQL과 결과를 results/SQL결과_작성양식.md에 기록합니다.

1. **준비**: 완성한 00-setup.sql. 영화 6건, 찜 8건, 외래 키 1.
2. **조회·집계**: 01-queries.sql. 영화101 찜 3행 / a+104 메모 '가족과 볼 영화' / c의 내림차순 103→101 및 LIMIT1 / 빈 메모 a의 인터스텔라·b의 어벤져스 / 전체2 / a1,b1.
3. **초기화 후 CRUD**: 00-setup → 02-crud. id30,b,106 추가(memo 생략) →9건; memo만 수정; id30만 삭제→초기8건.
4. **초기화 후 제약검증**: 00-setup → 03-constraints. A40,a,101 실패 / B41,b,106 성공 / C42,b,999 실패 / D 영화106삭제 실패. D 직후 찜9건, 영화106 유지. 테스트 id41 삭제 후 초기8건.

최종 데이터가 다르거나 차단되어야 할 문장이 성공하면 제약조건을 확인하고 초기화부터 다시 실행합니다.
메모가 빈 문자열인 것과 찜 행이 없는 것은 다릅니다.

## 6. API 확인 순서

TODO 17·18 완료 후:
- /api/favorites: 초기 배열8건
- /api/favorite-count: {"favoriteCount":8}, 숫자8 직접 작성 금지
- 배열에 id30,user-b,movieId106,memo빈문자열 항목 추가 후 저장·재시작·브라우저 새로고침: 목록9/개수9
- 확인 후 테스트 항목 삭제, 최종 배열8/개수8로 복원
SQL/API의 가상 사용자와 앱의 실제 로그인 UID를 연결하지 않습니다.

## 7. 제출

GitHub 링크 또는 ZIP에 세 실습 코드, 아래 실행 자료, 본인이 작성한 README 설명을 포함합니다.
node_modules, .next, .env.local, 실제 사용자 UID가 있는 캡처는 제출하지 않습니다.

| 자료 | 내용 |
|---|---|
| results/result-memo.png | 새로고침 후 수정 메모·찜 복원 |
| results/result-empty-memo.png | 빈 메모 저장 성공·찜 유지 |
| results/result-api-list.png | 주소와 초기 목록8건 |
| results/result-api-count.png | 테스트 항목 추가 후 개수9 |
| SQL결과_작성양식.md 또는 PDF | 실제 SQL, 조회·집계·CRUD 전후, 제약 오류와 이유 |

README에 Store 재로딩 이유, DB 저장 후 Store 갱신 이유, 빈 메모와 삭제 차이,
UNIQUE와 FK 역할, 전체/사용자별 집계 차이, 배열 길이로 API 개수를 계산하는 이유를 설명합니다.

## 8. 선택 도전

Firebase 앱에서 메모 없는 찜 화면 필터 또는 Express 배열 변경 추가 테스트·기록.
Firebase–SQLite 동기화와 실습 간 연결은 선택 과제에서도 제외합니다.

## 9. 평가 기준

Firebase·Store20 / 메모20 / SQL조회·집계20 / SQL CRUD·제약20 / API10 / 제출·설명10.
실습 간 연결은 평가하지 않습니다.

---

# 제출 설명 (작성자)

## 구현 현황

| 과제 | 상태 |
|---|---|
| 1~2 Firebase·Store (TODO 01~04) | 완료, `npm run typecheck` 통과 |
| 3~7 SQL (TODO 05~16, A~D) | 완료, 실행 결과는 `results/SQL결과_작성양식.md` |
| 8 Express (TODO 17·18) | 완료, 8건/`{"favoriteCount":8}` 확인, 항목 추가 시 9건/9 확인 후 원복 |
| 선택 1 빈 메모 화면 필터 | 미구현 |
| 선택 2 API 추가 변경 테스트 | 미구현 |

## 실행 방법

- **Firebase 앱**: `cd firebase-app` → `npm ci` → `.env.example`을 `.env.local`로 복사해 본인 설정 입력 → `npm run dev` → `/movies` 접속
- **SQL**: SQLite Fiddle에서 `00-setup.sql` 실행 → `01-queries.sql` 한 문장씩 → 다시 `00-setup.sql` → `02-crud.sql` → 다시 `00-setup.sql` → `03-constraints.sql`
- **Express**: `cd express-api` → `npm ci` → `npm run dev` → `http://localhost:4000/api/favorites`, `/api/favorite-count`

## 정리

1. **새로고침 후 Store에 다시 반영하는 이유**: Zustand Store는 메모리에만 있어 새로고침하면 비워집니다. 진짜 데이터는 Firebase에 있으므로 로그인 확인과 Firestore 조회가 끝난 뒤 그 결과를 Store에 다시 넣어야 화면이 복원됩니다.
2. **DB 저장 성공 후 Store를 갱신하는 이유**: 저장이 실패했는데 화면만 바뀌면 화면과 DB가 달라지고, 새로고침 시 메모가 사라진 것처럼 보입니다. `await updateDoc()`이 성공한 뒤에만 Store를 바꿔 화면이 실제 DB 상태를 보여주게 합니다.
3. **빈 메모 저장과 찜 삭제의 차이**: 빈 메모 저장은 찜 문서는 그대로 두고 `memo` 값만 `''`로 바꾸는 수정입니다. 찜 삭제는 문서(행) 자체를 없애는 작업입니다. 메모가 비어 있어도 찜은 유지됩니다.
4. **복합 UNIQUE와 외래 키의 역할**: `UNIQUE (userId, movieId)`는 같은 사용자가 같은 영화를 두 번 찜하지 못하게 막습니다. 외래 키는 존재하지 않는 영화를 찜하거나 찜이 참조 중인 영화를 삭제하지 못하게 해서 데이터 간 연결이 깨지지 않게 합니다.
5. **전체 집계와 사용자별 집계의 차이**: `COUNT(*)`만 쓰면 조건에 맞는 전체 행을 하나의 숫자(2)로 셉니다. `GROUP BY userId`를 붙이면 사용자마다 따로 셉니다(user-a 1, user-b 1). 해당 행이 없는 사용자(user-c)는 결과에 나오지 않습니다.
6. **API 개수를 배열 길이로 계산하는 이유**: 숫자를 직접 쓰면 데이터가 늘거나 줄어도 응답이 바뀌지 않습니다. `favorites.length`를 쓰면 목록 응답과 개수 응답이 항상 같은 데이터를 기준으로 맞춰집니다.
