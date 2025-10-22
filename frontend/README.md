# Movie Reviewer - 영화 리뷰 서비스

## 🎬 프로젝트 소개

Movie Reviewer는 TMDB API를 활용한 영화 검색 및 리뷰 작성 서비스입니다. 사용자는 다양한 카테고리의 영화를 탐색하고, 상세 정보를 확인하며, 자신만의 리뷰를 작성하고 관리할 수 있습니다.

## ✨ 주요 기능

- 📝 **영화 리뷰 CRUD**: 리뷰 작성, 조회, 수정, 삭제
- 🎯 **카테고리별 영화 탐색**: Netflix Originals, Trending, Top Rated 등
- 🔍 **영화 검색**: 실시간 영화 검색
- ⭐ **평점 시스템**: 5점 별점 시스템
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- 🎨 **중후한 다크 테마**: 영화관 분위기의 몰입감 있는 UI

## 🛠️ 기술 스택

- **Frontend**: React 18+ (Vite)
- **Routing**: React Router v6
- **Styling**: CSS Modules + CSS Variables
- **API**: TMDB API
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Storage**: LocalStorage

## 📦 설치 및 실행

### 1. 의존성 설치

```bash
cd movie-reviewer
npm install
```

### 2. 환경 변수 설정

`.env` 파일을 생성하고 TMDB API 키를 설정하세요:

```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/
```

**API 키 발급 방법:**
1. [TMDB](https://www.themoviedb.org/) 회원가입
2. [API 설정 페이지](https://www.themoviedb.org/settings/api)에서 API 키 발급
3. `.env` 파일에 API 키 입력

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 4. 프로덕션 빌드

```bash
npm run build
npm run preview
```

## 📁 프로젝트 구조

```
movie-reviewer/
├── src/
│   ├── components/
│   │   ├── Layout/          # Navbar, Footer
│   │   ├── Movie/           # MovieCard, MovieRow
│   │   ├── Review/          # Review 관련 컴포넌트
│   │   ├── UI/              # Button, Input, Modal 등
│   │   └── Common/          # 공통 컴포넌트
│   ├── pages/
│   │   ├── Home/            # 메인 페이지
│   │   ├── MovieDetail/     # 영화 상세 페이지
│   │   ├── Search/          # 검색 페이지
│   │   └── MyReviews/       # 내 리뷰 페이지
│   ├── context/             # React Context (User, Review)
│   ├── hooks/               # Custom Hooks
│   ├── services/            # API 서비스
│   ├── utils/               # 유틸리티 함수
│   ├── styles/              # 글로벌 스타일
│   └── App.jsx              # 메인 App 컴포넌트
├── .env                     # 환경 변수
└── README.md
```

## 🎨 디자인 시스템

### 색상 팔레트

- **Primary**: `#0a0a0a` (Deep Black)
- **Secondary**: `#1a1a1a` (Dark Gray)
- **Accent**: `#e50914` (Netflix Red)
- **Rating**: `#ffd700` (Gold)

### 타이포그래피

- **Heading**: Montserrat
- **Body**: Inter, Noto Sans KR

## 📖 사용 방법

### 1. 영화 탐색
- 홈 페이지에서 카테고리별 영화 목록 탐색
- 영화 카드 클릭하여 상세 정보 확인

### 2. 리뷰 작성
- 영화 상세 페이지에서 "리뷰 작성" 버튼 클릭
- 제목, 평점(1-5), 내용 입력
- 선택적으로 이미지 첨부 가능

### 3. 리뷰 관리
- "내 리뷰" 페이지에서 작성한 리뷰 확인
- 리뷰 수정 및 삭제 가능

### 4. 영화 검색
- 상단 네비게이션 바에서 영화 제목 검색
- 검색 결과 페이지에서 영화 탐색

## 🚀 향후 개발 계획

- [ ] 백엔드 서버 연동
- [ ] 사용자 인증 시스템 (Firebase)
- [ ] 리뷰 좋아요/댓글 기능
- [ ] 소셜 공유 기능
- [ ] 영화 추천 알고리즘
- [ ] PWA 전환

## 📄 라이선스

This project is created for educational purposes.

## 👥 팀 구성

이 프로젝트는 광주 ICT 풀스택 교육 과정 4명의 팀원으로 구성되어 있습니다.

| 이름 | 역할 | 담당 업무 |
|------|------|----------|
| 김채현 | 팀장 (Team Leader) | 로그인 구현 |
| 최홍기 | 프론트엔드 개발자 | 영화 기록 추가 탭 구현 |
| 유소율 | 프론트엔드 개발자 | 영화탭 영화상영 구현 |
| 문명섭 | 백엔드 개발자 | DB 연결 및 백엔드 구현 |

## 🤝 기여

프로젝트 개선을 위한 제안과 버그 리포트를 환영합니다!

## 📞 문의

프로젝트 관련 문의사항은 이슈를 생성해주세요.

---

**Made with ❤️ by Movie Reviewer Team**
**광주 ICT 풀스택 교육 과정 - 김재현 팀장 팀 프로젝트**
