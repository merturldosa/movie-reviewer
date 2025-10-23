# 🎬 Movie Reviewer

> 영화 리뷰 및 추천 플랫폼 - Full Stack Web Application

## 📝 프로젝트 소개

Movie Reviewer는 사용자가 영화를 검색하고, 리뷰를 작성하며, 다른 사용자들과 의견을 공유할 수 있는 종합 영화 리뷰 플랫폼입니다. TMDB API를 활용하여 최신 영화 정보를 제공하고, 협업 필터링 기반의 개인화된 영화 추천 시스템을 구현했습니다.

### 주요 특징

- 🔍 **영화/TV 쇼 검색**: TMDB API 연동으로 실시간 영화 정보 제공
- ✍️ **리뷰 시스템**: 별점, 텍스트, 이미지를 포함한 상세 리뷰 작성
- 💬 **소셜 기능**: 좋아요/싫어요, 댓글로 커뮤니티 형성
- 🎯 **맞춤 추천**: 사용자 취향 기반 영화 추천 알고리즘
- 🔐 **사용자 인증**: 안전한 회원가입 및 로그인 시스템
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 지원

## 🚀 데모

- **Frontend**: https://[your-vercel-url].vercel.app
- **Backend API**: https://movie-reviewer-api-2dte.onrender.com
- **API Health Check**: https://movie-reviewer-api-2dte.onrender.com/api/health

## 🛠 기술 스택

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: Context API
- **Styling**: CSS Modules
- **HTTP Client**: Axios
- **Icons**: React Icons

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: bcryptjs
- **CORS**: cors middleware

### External Services
- **Movie Data**: TMDB API
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Render
- **Database**: MongoDB Atlas

## 📁 프로젝트 구조

```
movie-reviewer/
├── backend/                    # Node.js + Express 백엔드
│   ├── config/                # 데이터베이스 설정
│   ├── controllers/           # 비즈니스 로직
│   ├── models/                # Mongoose 스키마
│   ├── routes/                # API 라우트
│   ├── index.js               # 서버 엔트리포인트
│   └── package.json
├── frontend/                   # React 프론트엔드
│   ├── public/                # 정적 파일
│   ├── src/
│   │   ├── components/        # 재사용 가능한 컴포넌트
│   │   ├── pages/             # 페이지 컴포넌트
│   │   ├── context/           # Context API
│   │   ├── services/          # API 서비스
│   │   ├── utils/             # 유틸리티 함수
│   │   ├── styles/            # 글로벌 스타일
│   │   ├── App.jsx            # 메인 앱 컴포넌트
│   │   └── main.jsx           # 엔트리포인트
│   ├── index.html
│   └── package.json
├── KEEP_ALIVE_SETUP.md        # Keep-Alive 설정 가이드
├── PRESENTATION.md             # 발표 자료
└── README.md                   # 이 파일
```

## 🎯 주요 기능

### 1. 영화 검색 및 탐색
- 실시간 영화/TV 쇼 검색
- 카테고리별 영화 탐색 (인기, 최고 평점, 트렌딩 등)
- 상세한 영화 정보 (줄거리, 출연진, 트레일러 등)
- TV 쇼 완전 지원

### 2. 리뷰 시스템
- 영화 리뷰 작성/수정/삭제 (CRUD)
- 1-5점 별점 평가
- 이미지 업로드 (최대 3개, 2MB 제한)
- 시청 날짜 기록
- 리뷰 목록 및 필터링

### 3. 소셜 기능
- 리뷰 좋아요/싫어요 (토글 기능)
- 리뷰 댓글 작성/수정/삭제
- 댓글 실시간 업데이트
- 사용자 프로필 및 아바타

### 4. 사용자 인증
- 이메일 기반 회원가입/로그인
- 비밀번호 암호화 (bcryptjs)
- 세션 관리 (localStorage)
- 게스트 모드 지원

### 5. 영화 추천 시스템
- 협업 필터링 기반 추천
- 사용자 리뷰 기반 맞춤 추천
- 유사 영화 추천
- 평점 및 리뷰 수 기반 정렬

### 6. Keep-Alive 시스템
- 자동 백엔드 핑 (10분마다)
- 서버 슬립 방지
- 외부 모니터링 서비스 연동 가이드

## 🔧 설치 및 실행

### 사전 요구사항
- Node.js (v18 이상)
- MongoDB (로컬 또는 Atlas)
- TMDB API Key

### 1. 저장소 클론
```bash
git clone https://github.com/merturldosa/movie-reviewer.git
cd movie-reviewer
```

### 2. 백엔드 설정
```bash
cd backend
npm install
```

`.env` 파일 생성:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

백엔드 실행:
```bash
npm start
```

### 3. 프론트엔드 설정
```bash
cd frontend
npm install
```

`.env` 파일 생성:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_TMDB_API_KEY=your_tmdb_api_key
```

프론트엔드 실행:
```bash
npm run dev
```

### 4. 브라우저에서 접속
```
http://localhost:5173
```

## 📡 API 엔드포인트

### Reviews
- `GET /api/reviews` - 모든 리뷰 조회
- `GET /api/reviews/:id` - 특정 리뷰 조회
- `GET /api/reviews/movie/:movieId` - 영화별 리뷰 조회
- `GET /api/reviews/user/:userId` - 사용자별 리뷰 조회
- `POST /api/reviews` - 리뷰 생성
- `PUT /api/reviews/:id` - 리뷰 수정
- `DELETE /api/reviews/:id` - 리뷰 삭제
- `POST /api/reviews/:id/like` - 좋아요
- `POST /api/reviews/:id/dislike` - 싫어요

### Comments
- `GET /api/comments/review/:reviewId` - 리뷰의 댓글 조회
- `POST /api/comments` - 댓글 생성
- `PUT /api/comments/:id` - 댓글 수정
- `DELETE /api/comments/:id` - 댓글 삭제

### Users
- `POST /api/users/register` - 회원가입
- `POST /api/users/login` - 로그인
- `GET /api/users/:id` - 사용자 정보 조회
- `PUT /api/users/:id` - 사용자 정보 수정

### Recommendations
- `GET /api/recommendations/:userId` - 사용자 맞춤 추천
- `GET /api/recommendations/similar/:movieId` - 유사 영화 추천

## 🗄️ 데이터베이스 스키마

### User
```javascript
{
  userName: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  avatar: String,
  bio: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Review
```javascript
{
  movieId: Number (required),
  movieTitle: String (required),
  moviePoster: String,
  userId: String (required),
  userName: String (required),
  userAvatar: String,
  title: String (required),
  content: String (required),
  rating: Number (1-5, required),
  images: [String],
  watchedDate: Date,
  likes: [String],
  dislikes: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Comment
```javascript
{
  reviewId: ObjectId (required),
  userId: String (required),
  userName: String (required),
  userAvatar: String,
  content: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

## 🚢 배포

### Frontend (Vercel)
1. Vercel에 GitHub 저장소 연결
2. Root Directory: `frontend`
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. 환경 변수 설정

### Backend (Render)
1. Render에 GitHub 저장소 연결
2. Root Directory: `backend`
3. Build Command: `npm install`
4. Start Command: `npm start`
5. 환경 변수 설정

자세한 Keep-Alive 설정은 [KEEP_ALIVE_SETUP.md](./KEEP_ALIVE_SETUP.md)를 참조하세요.

## 📊 프로젝트 통계

- **총 코드 라인**: 3,000+
- **커밋 수**: 20+
- **컴포넌트**: 30+
- **API 엔드포인트**: 25+
- **개발 기간**: [시작일] ~ [종료일]

## 🎓 학습 내용

이 프로젝트를 통해 다음을 학습했습니다:

- Full-Stack 웹 애플리케이션 개발
- RESTful API 설계 및 구현
- MongoDB 데이터 모델링 및 최적화
- React Context API를 활용한 상태 관리
- 사용자 인증 및 보안
- 협업 필터링 추천 알고리즘
- Git을 활용한 버전 관리
- 클라우드 배포 (Vercel, Render)

## 🔮 향후 개선 방향

### 단기
- [ ] 소셜 로그인 (Google, Kakao)
- [ ] 실시간 알림 시스템
- [ ] 리뷰 정렬 및 필터링 강화
- [ ] 프로필 커스터마이징

### 중기
- [ ] WebSocket 기반 실시간 댓글
- [ ] 고급 검색 필터
- [ ] 개인 통계 대시보드
- [ ] 모바일 앱 (React Native)

### 장기
- [ ] AI 기반 고급 추천
- [ ] 커뮤니티 기능 (팔로우, 그룹)
- [ ] 스트리밍 서비스 연동
- [ ] 다국어 지원

## 🤝 기여

이 프로젝트는 교육 목적으로 개발되었습니다. 개선 제안이나 버그 리포트는 Issues를 통해 제출해 주세요.

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 👤 개발자

- **이름**: [Your Name]
- **이메일**: [your-email@example.com]
- **GitHub**: [@merturldosa](https://github.com/merturldosa)
- **포트폴리오**: [your-portfolio-url]

## 🙏 감사의 말

- [TMDB](https://www.themoviedb.org/) - 영화 정보 API 제공
- [Vercel](https://vercel.com/) - 프론트엔드 호스팅
- [Render](https://render.com/) - 백엔드 호스팅
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - 데이터베이스 서비스

---

⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!
