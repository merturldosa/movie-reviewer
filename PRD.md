# Product Requirements Document (PRD)
## 영화 리뷰 서비스 (Movie Reviewer)

---

## 1. 프로젝트 개요

### 1.1 프로젝트 목적
호남ICT React 심화 실습과정 프로젝트로서, 영화 정보 API를 활용한 영화 검색 및 리뷰 서비스를 개발한다. 사용자는 영화를 검색하고, 상세 정보를 확인하며, 자신만의 리뷰를 작성하여 영화 경험을 기록하고 공유할 수 있다.

### 1.2 팀 구성

이 프로젝트는 광주 ICT 풀스택 교육 과정 4명의 팀원으로 구성되어 있습니다.

| 이름 | 역할 | 담당 업무 |
|------|------|----------|
| 김채현 | 팀장 (Team Leader) | 로그인 구현 |
| 최홍기 | 프론트엔드 개발자 | 영화 기록 추가 탭 구현 |
| 소율 | 프론트엔드 개발자 | 영화탭 영화상영 구현 |
| 문명섭 | 백엔드 개발자 | DB 연결 및 백엔드 구현 |

#### 역할 분담 상세
- **김채현 (팀장)**: 사용자 인증 및 로그인 시스템 전체 설계 및 구현
- **최홍기**: 영화 기록 추가를 위한 UI 컴포넌트 및 사용자 인터랙션 구현
- **소율**: 영화 상영 정보 표시 및 카테고리별 영화 목록 구현
- **문명섭**: 데이터베이스 설계, 백엔드 API 개발, 서버 연동

### 1.3 프로젝트 목표
- 영화 API(TMDB)를 활용한 실시간 영화 데이터 연동
- React 기반 SPA(Single Page Application) 구현
- CRUD 기능을 포함한 리뷰 관리 시스템 구축
- 반응형 웹 디자인 적용
- 중후하고 전문적인 다크 테마 UI/UX 제공

### 1.4 대상 사용자
- 영화 애호가 및 일반 관객
- 영화 리뷰를 작성하고 공유하고자 하는 사용자
- 영화 정보를 빠르게 검색하고 싶은 사용자

---

## 2. 핵심 기능 명세

### 2.1 영화 카탈로그 (Browse)

#### 2.1.1 카테고리별 영화 목록
영화는 다음 카테고리로 분류되어 표시됩니다:

| 카테고리 | 설명 | API 엔드포인트 |
|---------|------|---------------|
| NETFLIX ORIGINAL | 넷플릭스 오리지널 콘텐츠 | `/discover/tv` |
| 추천 AI 인물 매칭 | AI 추천 영화 | `/movie/popular` |
| Trending Now | 현재 인기 있는 영화 | `/trending/all/week` |
| Top Rated | 높은 평점을 받은 영화 | `/movie/top_rated` |
| Action Movies | 액션 장르 | `/discover/movie?with_genres=28` |
| Comedy Movies | 코미디 장르 | `/discover/movie?with_genres=35` |
| Horror Movies | 공포 장르 | `/discover/movie?with_genres=27` |
| Romance Movies | 로맨스 장르 | `/discover/movie?with_genres=10749` |
| Documentaries | 다큐멘터리 | `/discover/movie?with_genres=99` |

#### 2.1.2 UI 구성요소
- **가로 스크롤 영화 목록**: 각 카테고리별로 영화 포스터를 가로로 스크롤하며 탐색
- **영화 카드**: 포스터 이미지, 제목, 평점 표시
- **호버 효과**: 마우스 오버 시 카드 확대 및 밝기 증가
- **섹션 헤더**: 카테고리 이름을 명확하게 표시

### 2.2 영화 상세 정보

#### 2.2.1 상세 페이지 구성
영화 상세 페이지는 다음 정보를 포함합니다:

- **헤더 섹션**
  - 배경 이미지 (Backdrop) - 그라데이션 오버레이
  - 영화 포스터 (좌측)
  - 제목 및 원제
  - 개봉일
  - 장르 태그
  - 평점 (TMDB 평점 + 사용자 평점)
  - 러닝타임

- **본문 섹션**
  - 줄거리 (Overview)
  - 출연진 정보
  - 제작진 정보
  - 트레일러 영상 (YouTube 임베드)

- **리뷰 섹션**
  - 사용자 작성 리뷰 목록
  - "콘텐츠를 추가하고 영상" 버튼 (레드 계열)
  - 리뷰 카드 레이아웃

### 2.3 리뷰 기능 (CRUD)

#### 2.3.1 리뷰 작성 (Create)
모달 형태의 리뷰 작성 폼:

- **입력 필드**
  - 제목 (필수) - 상단에 큰 입력 필드
  - 평점 (1-5 별점, 필수) - 별 아이콘 5개
  - 리뷰 내용 (필수, 최소 10자 이상)
  - 사진 첨부 (선택, 최대 5장)
  - 시청 날짜 (선택)

- **버튼**
  - 등록 버튼 (레드 계열)
  - 취소 버튼 (그레이 계열)

- **유효성 검증**
  - 제목: 최소 2자, 최대 100자
  - 내용: 최소 10자, 최대 2000자
  - 평점: 필수 선택

#### 2.3.2 리뷰 조회 (Read)
- **리뷰 목록**
  - 작성일 기준 최신순 정렬
  - 작성자 정보 (닉네임, 아바타)
  - 평점 표시 (별 5개)
  - 작성 날짜/시간
  - 리뷰 내용 미리보기
  - 첨부 이미지 썸네일
  - 다크 배경의 카드 형태

- **타임라인 뷰**
  - "기록" 섹션
  - 날짜별 그룹핑 (예: "기록 · 2020's movie - 5시간")
  - 영화 포스터 그리드 레이아웃

#### 2.3.3 리뷰 수정 (Update)
- 본인이 작성한 리뷰만 수정 가능
- 작성 시와 동일한 모달 폼 제공
- 기존 데이터 자동 로드
- 수정 날짜 자동 기록

#### 2.3.4 리뷰 삭제 (Delete)
- 본인이 작성한 리뷰만 삭제 가능
- 삭제 확인 모달 표시
- 삭제 시 첨부 이미지도 함께 삭제

### 2.4 검색 기능

#### 2.4.1 영화 검색
- **검색 입력**
  - 상단 네비게이션 바에 검색창 고정
  - 실시간 검색어 자동완성 (Debounce 적용)
  - 최소 2자 이상 입력 시 검색 시작

- **검색 결과**
  - 그리드 레이아웃으로 결과 표시
  - 포스터, 제목, 개봉일, 평점 표시
  - 결과 없을 시 안내 메시지
  - 무한 스크롤 또는 페이지네이션

### 2.5 사용자 관리 (간소화 버전)

#### 2.5.1 사용자 정보
- LocalStorage를 활용한 간단한 사용자 식별
- 닉네임 설정 기능
- 프로필 이미지 업로드

---

## 3. 기술 스택

### 3.1 Frontend
- **Framework**: React 18+
- **언어**: JavaScript (ES6+)
- **상태 관리**: React Context API + useReducer
- **라우팅**: React Router v6
- **스타일링**: CSS Modules + CSS Variables
- **HTTP Client**: Axios
- **UI 컴포넌트**: Custom Components
- **아이콘**: React Icons
- **이미지**: Lazy Loading

### 3.2 API
- **The Movie Database (TMDB) API**
  - API Key 필요
  - Base URL: `https://api.themoviedb.org/3`
  - Image Base URL: `https://image.tmdb.org/t/p/`

### 3.3 데이터 저장
- **LocalStorage**: 리뷰 데이터 및 사용자 정보 저장
- **구조**: JSON 형태로 저장

---

## 4. 디자인 시스템 (Figma 기반)

### 4.1 디자인 콘셉트
**중후하고 전문적인 다크 테마** - 영화관의 몰입감 있는 분위기 연출

### 4.2 색상 팔레트

#### Primary Colors (Figma 디자인에서 추출)
```css
--color-bg-primary: #0a0a0a;        /* 메인 배경 - 깊은 블랙 */
--color-bg-secondary: #1a1a1a;      /* 카드 배경 - 다크 그레이 */
--color-bg-tertiary: #2a2a2a;       /* 호버 배경 */

--color-text-primary: #ffffff;       /* 주 텍스트 */
--color-text-secondary: #b3b3b3;     /* 보조 텍스트 */
--color-text-tertiary: #808080;      /* 캡션 텍스트 */

--color-accent-primary: #e50914;     /* 레드 - CTA 버튼, 강조 */
--color-accent-hover: #f40612;       /* 레드 호버 */
--color-accent-secondary: #c11119;   /* 레드 활성 */
```

#### Semantic Colors
```css
--color-rating: #ffd700;             /* 골드 - 별점 */
--color-success: #46d369;            /* 그린 - 성공 */
--color-warning: #ffc107;            /* 앰버 - 경고 */
--color-error: #e50914;              /* 레드 - 오류 */
--color-info: #00b8ff;               /* 블루 - 정보 */
```

#### Opacity Variants
```css
--color-overlay: rgba(0, 0, 0, 0.7);        /* 모달 오버레이 */
--color-card-border: rgba(255, 255, 255, 0.1); /* 카드 테두리 */
--color-divider: rgba(255, 255, 255, 0.15);    /* 구분선 */
```

### 4.3 타이포그래피

#### Font Family
```css
--font-primary: 'Inter', 'Noto Sans KR', -apple-system, sans-serif;
--font-heading: 'Montserrat', 'Noto Sans KR', sans-serif;
--font-mono: 'Roboto Mono', monospace;
```

#### Font Sizes & Weights
```css
/* Headings */
--font-size-h1: 48px;    /* 3rem */
--font-size-h2: 36px;    /* 2.25rem */
--font-size-h3: 28px;    /* 1.75rem */
--font-size-h4: 22px;    /* 1.375rem */

/* Body */
--font-size-base: 16px;  /* 1rem */
--font-size-sm: 14px;    /* 0.875rem */
--font-size-xs: 12px;    /* 0.75rem */

/* Weights */
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* Line Heights */
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.8;
```

### 4.4 Spacing System
```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
--spacing-3xl: 64px;
--spacing-4xl: 96px;
```

### 4.5 Border Radius
```css
--radius-sm: 4px;      /* 작은 요소 */
--radius-md: 8px;      /* 버튼, 입력 */
--radius-lg: 12px;     /* 카드 */
--radius-xl: 16px;     /* 모달 */
--radius-full: 9999px; /* 원형 */
```

### 4.6 그림자 (Shadows)
```css
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.5);
--shadow-xl: 0 12px 24px rgba(0, 0, 0, 0.6);

/* 강조 효과 */
--shadow-glow-red: 0 0 20px rgba(229, 9, 20, 0.4);
--shadow-glow-gold: 0 0 20px rgba(255, 215, 0, 0.3);
```

### 4.7 애니메이션
```css
--transition-fast: 150ms;
--transition-base: 300ms;
--transition-slow: 500ms;

--easing-default: cubic-bezier(0.4, 0, 0.2, 1);
--easing-in: cubic-bezier(0.4, 0, 1, 1);
--easing-out: cubic-bezier(0, 0, 0.2, 1);
--easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### 4.8 레이아웃
```css
/* Container */
--container-max-width: 1400px;
--container-padding: 24px;

/* Grid */
--grid-columns: 12;
--grid-gap: 16px;

/* Movie Card */
--movie-card-width: 180px;
--movie-card-aspect-ratio: 2/3;
```

---

## 5. 컴포넌트 구조

### 5.1 페이지 컴포넌트
```
src/
├── pages/
│   ├── Home/              # 메인 페이지
│   │   ├── Home.jsx
│   │   ├── Home.module.css
│   │   └── components/
│   │       ├── Hero.jsx
│   │       └── MovieRow.jsx
│   ├── MovieDetail/       # 영화 상세
│   │   ├── MovieDetail.jsx
│   │   ├── MovieDetail.module.css
│   │   └── components/
│   │       ├── MovieInfo.jsx
│   │       └── ReviewSection.jsx
│   ├── Search/            # 검색 결과
│   │   ├── Search.jsx
│   │   └── Search.module.css
│   └── MyReviews/         # 내 리뷰
│       ├── MyReviews.jsx
│       └── MyReviews.module.css
```

### 5.2 공통 컴포넌트
```
src/
├── components/
│   ├── Layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Container.jsx
│   ├── Movie/
│   │   ├── MovieCard.jsx
│   │   ├── MovieGrid.jsx
│   │   └── MoviePoster.jsx
│   ├── Review/
│   │   ├── ReviewCard.jsx
│   │   ├── ReviewForm.jsx
│   │   ├── ReviewModal.jsx
│   │   └── ReviewList.jsx
│   ├── UI/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Textarea.jsx
│   │   ├── Rating.jsx
│   │   ├── Modal.jsx
│   │   ├── Loading.jsx
│   │   └── ErrorMessage.jsx
│   └── Common/
│       ├── SearchBar.jsx
│       └── ImageWithFallback.jsx
```

### 5.3 훅 (Hooks)
```
src/
├── hooks/
│   ├── useMovies.js        # 영화 데이터 페칭
│   ├── useReviews.js       # 리뷰 CRUD
│   ├── useSearch.js        # 검색 기능
│   ├── useDebounce.js      # 디바운스
│   ├── useLocalStorage.js  # 로컬 스토리지
│   └── useInfiniteScroll.js # 무한 스크롤
```

### 5.4 컨텍스트
```
src/
├── context/
│   ├── ReviewContext.jsx   # 리뷰 상태 관리
│   ├── UserContext.jsx     # 사용자 정보
│   └── ThemeContext.jsx    # 테마 설정
```

### 5.5 서비스/유틸
```
src/
├── services/
│   ├── tmdbApi.js          # TMDB API 호출
│   └── reviewService.js    # 리뷰 로컬 스토리지 관리
├── utils/
│   ├── constants.js        # 상수
│   ├── helpers.js          # 헬퍼 함수
│   └── validation.js       # 유효성 검증
```

---

## 6. 데이터 모델

### 6.1 Review Model
```javascript
{
  id: string,              // UUID
  movieId: number,         // TMDB Movie ID
  movieTitle: string,      // 영화 제목
  moviePoster: string,     // 포스터 URL
  userId: string,          // 사용자 ID
  userName: string,        // 사용자 닉네임
  userAvatar: string,      // 사용자 아바타 URL
  title: string,           // 리뷰 제목
  content: string,         // 리뷰 내용
  rating: number,          // 평점 (1-5)
  images: string[],        // 첨부 이미지 URLs
  watchedDate: string,     // 시청 날짜 (ISO 8601)
  createdAt: string,       // 작성일 (ISO 8601)
  updatedAt: string        // 수정일 (ISO 8601)
}
```

### 6.2 User Model
```javascript
{
  id: string,              // UUID
  userName: string,        // 닉네임
  avatar: string,          // 아바타 이미지 URL
  createdAt: string        // 가입일 (ISO 8601)
}
```

---

## 7. API 엔드포인트 (TMDB)

### 7.1 주요 엔드포인트

#### 영화 목록
```
GET /movie/popular           - 인기 영화
GET /movie/top_rated         - 높은 평점 영화
GET /trending/{media_type}/{time_window} - 트렌딩
GET /discover/movie          - 장르별 검색
GET /discover/tv             - TV 시리즈
```

#### 영화 상세
```
GET /movie/{movie_id}        - 영화 상세 정보
GET /movie/{movie_id}/credits - 출연진 정보
GET /movie/{movie_id}/videos - 트레일러 정보
```

#### 검색
```
GET /search/movie            - 영화 검색
```

### 7.2 이미지 URL 구성
```
포스터(작음):  https://image.tmdb.org/t/p/w185{poster_path}
포스터(중간):  https://image.tmdb.org/t/p/w342{poster_path}
포스터(큼):    https://image.tmdb.org/t/p/w500{poster_path}
배경이미지:    https://image.tmdb.org/t/p/original{backdrop_path}
프로필:       https://image.tmdb.org/t/p/w185{profile_path}
```

---

## 8. 주요 화면 명세 (Figma 기반)

### 8.1 메인 페이지 (Home)
**레이아웃:**
- 상단 네비게이션 바 (고정)
  - 로고 (좌측)
  - 검색창 (중앙)
  - 사용자 메뉴 (우측)
- 히어로 섹션 (Featured Movie)
  - 전체 너비 배경 이미지
  - 그라데이션 오버레이
  - 제목, 설명, CTA 버튼
- 카테고리 섹션들
  - "추천 AI 인물 매칭" 헤더 (레드 라벨)
  - 가로 스크롤 영화 카드 목록
  - 각 카테고리마다 반복

### 8.2 영화 상세 페이지
**레이아웃:**
- 상단 배경 섹션
  - Backdrop 이미지 (블러 처리)
  - 좌측: 영화 포스터
  - 우측: 제목, 정보, 평점, 줄거리
- 탭 또는 섹션
  - 출연진
  - 트레일러
  - 리뷰 목록
- 리뷰 섹션
  - "콘텐츠를 추가하고 영상" 버튼 (레드, 상단 우측)
  - 리뷰 카드 목록 (다크 배경)

### 8.3 리뷰 작성 모달
**레이아웃:**
- 모달 오버레이 (반투명 블랙)
- 중앙 모달 창
  - 상단: 제목 입력 필드 (큰 텍스트)
  - 별점 선택 (5개 별, 골드 색상)
  - 내용 입력 (다중 라인 텍스트)
  - 이미지 업로드 (선택)
  - 하단 버튼
    - 등록 (레드)
    - 취소 (그레이)

### 8.4 타임라인/기록 페이지
**레이아웃:**
- 좌측 사이드바
  - 날짜 필터
  - 카테고리 필터
- 메인 영역
  - "기록" 헤더
  - 날짜 그룹 (예: "기록 · 2020's movie - 5시간")
  - 영화 포스터 그리드 (5열)
  - 스크롤 가능

---

## 9. 비기능 요구사항

### 9.1 성능
- 초기 로딩 시간 3초 이내
- 이미지 Lazy Loading 적용
- API 요청 Debounce (300ms)
- LocalStorage 캐싱 활용
- Code Splitting

### 9.2 반응형 디자인
- **Mobile**: 320px ~ 767px (1열)
- **Tablet**: 768px ~ 1023px (2-3열)
- **Desktop**: 1024px 이상 (4-6열)

### 9.3 접근성
- 키보드 네비게이션 지원
- ARIA 레이블 적용
- 색상 대비 WCAG AA 수준
- 스크린 리더 호환

### 9.4 브라우저 호환성
- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)

---

## 10. 개발 단계

### Phase 1: 기본 설정 (1주차)
- [x] React 프로젝트 생성
- [ ] 폴더 구조 설정
- [ ] 디자인 시스템 구축 (CSS Variables)
- [ ] TMDB API 연동
- [ ] 기본 컴포넌트 개발

### Phase 2: 핵심 기능 (2주차)
- [ ] 홈 페이지 구현
- [ ] 영화 목록 (카테고리별)
- [ ] 영화 상세 페이지
- [ ] 라우팅 설정

### Phase 3: CRUD 기능 (3주차)
- [ ] 리뷰 작성 모달
- [ ] 리뷰 목록 표시
- [ ] 리뷰 수정/삭제
- [ ] LocalStorage 연동
- [ ] 검색 기능

### Phase 4: 마무리 (4주차)
- [ ] 반응형 디자인 적용
- [ ] 애니메이션 및 인터랙션
- [ ] 에러 처리 및 로딩 상태
- [ ] 성능 최적화
- [ ] 테스트 및 버그 수정

---

## 11. 참고 자료

### 11.1 디자인
- Figma URL: https://www.figma.com/design/xiHmQ6pmgTm5TcsqFCp1wq/MovieReviewer?node-id=0-1&p=f
- 참고 이미지: prd-ui.png

### 11.2 API
- TMDB API 문서: https://developers.themoviedb.org/3
- API Key 발급: https://www.themoviedb.org/settings/api

### 11.3 기술 문서
- React: https://react.dev
- React Router: https://reactrouter.com
- MDN Web Docs: https://developer.mozilla.org

---

## 12. 추가 고려사항

### 12.1 향후 확장 가능성
- 백엔드 서버 연동
- 사용자 인증 (Firebase Auth)
- 리뷰 좋아요/댓글
- 소셜 공유
- 영화 추천 알고리즘
- PWA 전환

### 12.2 보안
- API Key 환경변수 관리
- XSS 방지
- 이미지 업로드 검증
- 입력값 Sanitization

---

**문서 버전**: 2.0 (Figma 디자인 반영)
**최종 수정일**: 2025-10-17
**작성자**: Claude Code
