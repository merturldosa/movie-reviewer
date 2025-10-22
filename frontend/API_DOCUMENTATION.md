# 📡 API 문서 (API Documentation)

Movie Reviewer 애플리케이션에서 사용하는 API와 내부 서비스 레이어에 대한 문서입니다.

---

## 목차

1. [TMDB API](#tmdb-api)
2. [내부 API 서비스](#내부-api-서비스)
3. [리뷰 서비스](#리뷰-서비스)
4. [유틸리티 함수](#유틸리티-함수)
5. [에러 처리](#에러-처리)

---

## TMDB API

### 개요

The Movie Database (TMDB) API는 영화, TV 프로그램, 출연진 정보를 제공하는 RESTful API입니다.

- **Base URL**: `https://api.themoviedb.org/3`
- **인증**: API Key (Query Parameter)
- **언어**: 한국어 (`ko-KR`)
- **공식 문서**: https://developers.themoviedb.org/3

### 인증

모든 요청에 API 키가 필요합니다:

```
GET https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=ko-KR
```

### 주요 엔드포인트

#### 1. 인기 영화 조회

```
GET /movie/popular
```

**Parameters**:
- `api_key` (required): API 키
- `language` (optional): 언어 (기본값: `en-US`)
- `page` (optional): 페이지 번호 (기본값: `1`)

**Response**:
```json
{
  "page": 1,
  "results": [
    {
      "id": 123456,
      "title": "영화 제목",
      "original_title": "Original Title",
      "overview": "영화 줄거리...",
      "poster_path": "/poster.jpg",
      "backdrop_path": "/backdrop.jpg",
      "release_date": "2024-01-01",
      "vote_average": 8.5,
      "vote_count": 1000,
      "genre_ids": [28, 12, 878]
    }
  ],
  "total_pages": 500,
  "total_results": 10000
}
```

#### 2. 영화 상세 정보

```
GET /movie/{movie_id}
```

**Parameters**:
- `movie_id` (required): 영화 ID
- `append_to_response` (optional): 추가 정보 (`credits,videos`)

**Response**:
```json
{
  "id": 123456,
  "title": "영화 제목",
  "tagline": "태그라인",
  "overview": "영화 줄거리...",
  "runtime": 120,
  "release_date": "2024-01-01",
  "vote_average": 8.5,
  "genres": [
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Adventure" }
  ],
  "credits": {
    "cast": [
      {
        "id": 1,
        "name": "배우 이름",
        "character": "캐릭터 이름",
        "profile_path": "/profile.jpg"
      }
    ]
  },
  "videos": {
    "results": [
      {
        "key": "YouTube_Video_ID",
        "site": "YouTube",
        "type": "Trailer"
      }
    ]
  }
}
```

#### 3. 영화 검색

```
GET /search/movie
```

**Parameters**:
- `query` (required): 검색어
- `page` (optional): 페이지 번호
- `language` (optional): 언어

**Response**:
```json
{
  "page": 1,
  "results": [...],
  "total_results": 42
}
```

#### 4. 트렌딩 영화

```
GET /trending/{media_type}/{time_window}
```

**Parameters**:
- `media_type`: `all`, `movie`, `tv`
- `time_window`: `day`, `week`

#### 5. 장르별 영화

```
GET /discover/movie
```

**Parameters**:
- `with_genres`: 장르 ID (쉼표로 구분)
- `sort_by`: 정렬 기준 (`popularity.desc`, `release_date.desc`)

**장르 ID 목록**:
- 28: Action
- 12: Adventure
- 16: Animation
- 35: Comedy
- 80: Crime
- 99: Documentary
- 18: Drama
- 10751: Family
- 14: Fantasy
- 27: Horror
- 10402: Music
- 9648: Mystery
- 10749: Romance
- 878: Science Fiction
- 10770: TV Movie
- 53: Thriller
- 10752: War
- 37: Western

### 이미지 URL 구성

TMDB는 이미지의 절대 경로를 제공하지 않으므로, Base URL과 결합해야 합니다:

```
https://image.tmdb.org/t/p/{size}{file_path}
```

**이미지 크기**:
- 포스터: `w92`, `w154`, `w185`, `w342`, `w500`, `w780`, `original`
- 배경: `w300`, `w780`, `w1280`, `original`
- 프로필: `w45`, `w185`, `h632`, `original`

**예시**:
```
https://image.tmdb.org/t/p/w500/poster.jpg
```

### Rate Limiting

- 무료 플랜: **초당 40 요청**
- 초과 시: `429 Too Many Requests`

---

## 내부 API 서비스

### tmdbApi.js

TMDB API를 래핑한 서비스 레이어

#### `fetchMoviesByCategory(endpoint, params)`

카테고리별 영화 목록 조회

**Parameters**:
- `endpoint` (string): API 엔드포인트 (예: `/movie/popular`)
- `params` (object): 쿼리 파라미터

**Returns**: `Promise<Array>` - 영화 목록

**Example**:
```javascript
const movies = await fetchMoviesByCategory('/movie/popular', { page: 1 });
```

#### `fetchMovieDetails(movieId)`

영화 상세 정보 조회

**Parameters**:
- `movieId` (number): 영화 ID

**Returns**: `Promise<Object>` - 영화 상세 정보

**Example**:
```javascript
const movie = await fetchMovieDetails(123456);
console.log(movie.title); // "영화 제목"
```

#### `searchMovies(query, page)`

영화 검색

**Parameters**:
- `query` (string): 검색어
- `page` (number, optional): 페이지 번호 (기본값: 1)

**Returns**: `Promise<Object>` - 검색 결과

**Example**:
```javascript
const results = await searchMovies('인터스텔라', 1);
console.log(results.total_results); // 검색 결과 수
```

#### `fetchTrendingMovies(timeWindow)`

트렌딩 영화 조회

**Parameters**:
- `timeWindow` (string, optional): `day` 또는 `week` (기본값: `week`)

**Returns**: `Promise<Array>` - 트렌딩 영화 목록

**Example**:
```javascript
const trending = await fetchTrendingMovies('week');
```

---

## 리뷰 서비스

### reviewService.js

LocalStorage 기반 리뷰 관리 서비스

#### `getAllReviews()`

모든 리뷰 조회

**Returns**: `Array<Review>` - 리뷰 목록

**Example**:
```javascript
const reviews = getAllReviews();
```

#### `getReviewsByMovieId(movieId)`

특정 영화의 리뷰 조회

**Parameters**:
- `movieId` (number): 영화 ID

**Returns**: `Array<Review>` - 리뷰 목록

**Example**:
```javascript
const reviews = getReviewsByMovieId(123456);
```

#### `getReviewById(reviewId)`

특정 리뷰 조회

**Parameters**:
- `reviewId` (string): 리뷰 ID (UUID)

**Returns**: `Review | undefined` - 리뷰 객체

**Example**:
```javascript
const review = getReviewById('abc-123-def');
```

#### `createReview(reviewData)`

새 리뷰 생성

**Parameters**:
- `reviewData` (object): 리뷰 데이터

**Review Data Structure**:
```javascript
{
  movieId: number,
  movieTitle: string,
  moviePoster: string,
  userId: string,
  userName: string,
  userAvatar: string,
  title: string,
  content: string,
  rating: number, // 1-5
  watchedDate: string, // ISO 8601
}
```

**Returns**: `Review` - 생성된 리뷰 (ID, 날짜 포함)

**Example**:
```javascript
const newReview = createReview({
  movieId: 123456,
  movieTitle: '인터스텔라',
  title: '훌륭한 영화',
  content: '정말 감동적이었습니다...',
  rating: 5,
  // ...
});
```

#### `updateReview(reviewId, updatedData)`

리뷰 수정

**Parameters**:
- `reviewId` (string): 리뷰 ID
- `updatedData` (object): 수정할 데이터

**Returns**: `Review` - 수정된 리뷰

**Example**:
```javascript
const updated = updateReview('abc-123', {
  title: '수정된 제목',
  content: '수정된 내용',
});
```

#### `deleteReview(reviewId)`

리뷰 삭제

**Parameters**:
- `reviewId` (string): 리뷰 ID

**Returns**: `boolean` - 성공 여부

**Example**:
```javascript
const success = deleteReview('abc-123');
```

#### `getReviewsByUserId(userId)`

특정 사용자의 리뷰 조회

**Parameters**:
- `userId` (string): 사용자 ID

**Returns**: `Array<Review>` - 리뷰 목록

#### `hasUserReviewedMovie(userId, movieId)`

사용자가 특정 영화를 리뷰했는지 확인

**Parameters**:
- `userId` (string): 사용자 ID
- `movieId` (number): 영화 ID

**Returns**: `boolean` - 리뷰 존재 여부

---

## 유틸리티 함수

### helpers.js

#### `getImageUrl(path, size)`

TMDB 이미지 URL 생성

**Parameters**:
- `path` (string): 이미지 경로
- `size` (string): 이미지 크기

**Returns**: `string | null` - 전체 이미지 URL

**Example**:
```javascript
const url = getImageUrl('/poster.jpg', 'w500');
// 'https://image.tmdb.org/t/p/w500/poster.jpg'
```

#### `formatDate(dateString)`

날짜 포맷팅 (한국어)

**Parameters**:
- `dateString` (string): ISO 8601 날짜

**Returns**: `string` - 포맷된 날짜

**Example**:
```javascript
formatDate('2024-01-01'); // '2024년 1월 1일'
```

#### `formatRuntime(minutes)`

러닝타임 포맷팅

**Parameters**:
- `minutes` (number): 분 단위 시간

**Returns**: `string` - 포맷된 시간

**Example**:
```javascript
formatRuntime(150); // '2h 30m'
```

#### `truncateText(text, maxLength)`

텍스트 자르기

**Parameters**:
- `text` (string): 원본 텍스트
- `maxLength` (number): 최대 길이

**Returns**: `string` - 잘린 텍스트

**Example**:
```javascript
truncateText('긴 텍스트...', 10); // '긴 텍스트...'
```

#### `formatRating(rating)`

평점 포맷팅

**Parameters**:
- `rating` (number): 평점

**Returns**: `string` - 소수점 1자리 평점

**Example**:
```javascript
formatRating(8.567); // '8.6'
```

#### `calculateAverageRating(reviews)`

평균 평점 계산

**Parameters**:
- `reviews` (Array<Review>): 리뷰 목록

**Returns**: `string` - 평균 평점 (소수점 1자리)

**Example**:
```javascript
calculateAverageRating([
  { rating: 5 },
  { rating: 4 },
  { rating: 3 }
]); // '4.0'
```

#### `timeAgo(dateString)`

상대적 시간 표시

**Parameters**:
- `dateString` (string): ISO 8601 날짜

**Returns**: `string` - 상대 시간 (예: '3시간 전')

**Example**:
```javascript
timeAgo('2024-10-17T10:00:00'); // '2시간 전'
```

#### `validateReviewForm(formData)`

리뷰 폼 유효성 검증

**Parameters**:
- `formData` (object): 폼 데이터

**Returns**:
```javascript
{
  isValid: boolean,
  errors: {
    title?: string,
    content?: string,
    rating?: string
  }
}
```

**Example**:
```javascript
const validation = validateReviewForm({
  title: 'a', // 너무 짧음
  content: '좋아요',
  rating: 5
});

console.log(validation.isValid); // false
console.log(validation.errors.title); // '제목은 최소 2자 이상이어야 합니다.'
```

---

## 에러 처리

### API 에러

#### 네트워크 에러

```javascript
try {
  const movies = await fetchMovies();
} catch (error) {
  if (error.message === 'Network Error') {
    // 인터넷 연결 확인
  }
}
```

#### HTTP 에러

```javascript
try {
  const movie = await fetchMovieDetails(123);
} catch (error) {
  if (error.response) {
    switch (error.response.status) {
      case 404:
        // 영화를 찾을 수 없음
        break;
      case 401:
        // API 키 오류
        break;
      case 429:
        // Rate limit 초과
        break;
      default:
        // 기타 에러
    }
  }
}
```

### 데이터 유효성 에러

```javascript
try {
  createReview(invalidData);
} catch (error) {
  if (error.name === 'ValidationError') {
    // 유효성 검증 실패
    console.error(error.errors);
  }
}
```

---

## Context API

### UserContext

#### 사용법

```javascript
import { useUser } from '../context/UserContext';

const Component = () => {
  const { user, updateUser } = useUser();

  return <div>{user.userName}</div>;
};
```

#### 제공 값

- `user`: 현재 사용자 객체
- `updateUser(updates)`: 사용자 정보 업데이트

### ReviewContext

#### 사용법

```javascript
import { useReviews } from '../context/ReviewContext';

const Component = () => {
  const { reviews, addReview, editReview, removeReview } = useReviews();

  return <div>총 {reviews.length}개 리뷰</div>;
};
```

#### 제공 값

- `reviews`: 모든 리뷰 목록
- `loading`: 로딩 상태
- `getMovieReviews(movieId)`: 영화별 리뷰
- `getUserReviews(userId)`: 사용자별 리뷰
- `getSingleReview(reviewId)`: 단일 리뷰
- `addReview(data)`: 리뷰 추가
- `editReview(id, data)`: 리뷰 수정
- `removeReview(id)`: 리뷰 삭제
- `refreshReviews()`: 리뷰 새로고침

---

## 데이터 구조

### Review 객체

```typescript
interface Review {
  id: string;              // UUID
  movieId: number;         // TMDB 영화 ID
  movieTitle: string;      // 영화 제목
  moviePoster: string;     // 포스터 URL
  userId: string;          // 사용자 ID
  userName: string;        // 사용자 닉네임
  userAvatar: string;      // 아바타 URL
  title: string;           // 리뷰 제목
  content: string;         // 리뷰 내용
  rating: number;          // 평점 (1-5)
  images: string[];        // 첨부 이미지 URLs
  watchedDate: string;     // 시청 날짜 (ISO 8601)
  createdAt: string;       // 작성일 (ISO 8601)
  updatedAt: string;       // 수정일 (ISO 8601)
}
```

### User 객체

```typescript
interface User {
  id: string;              // UUID
  userName: string;        // 닉네임
  avatar: string;          // 아바타 URL
  createdAt: string;       // 가입일 (ISO 8601)
}
```

---

## 환경 변수

```env
# TMDB API
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/
```

---

## 참고 자료

- [TMDB API 문서](https://developers.themoviedb.org/3)
- [Axios 문서](https://axios-http.com/docs/intro)
- [LocalStorage MDN](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)

---

**API 문서는 지속적으로 업데이트됩니다.**
