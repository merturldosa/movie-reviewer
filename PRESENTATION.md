# Movie Reviewer
## 영화 리뷰 플랫폼 졸업 과제 발표

---

## 📋 목차

1. 프로젝트 개요
2. 기술 스택
3. 시스템 아키텍처
4. 주요 기능
5. 구현 상세
6. 개발 과정
7. 성과 및 결과
8. 향후 개선 방향
9. 시연 및 질의응답

---

## 1. 프로젝트 개요

### 프로젝트 소개
- **프로젝트명**: Movie Reviewer
- **목적**: 영화 감상 경험을 공유하고 커뮤니티를 형성하는 플랫폼
- **개발 기간**: 2025년 [시작일] ~ [종료일]
- **개발 인원**: 1명

### 개발 동기
- 기존 영화 리뷰 플랫폼의 복잡한 UI 개선
- 사용자 친화적인 인터페이스 제공
- 개인화된 영화 추천 시스템 구현
- Full-Stack 개발 역량 향상

---

## 2. 기술 스택

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: Context API
- **Styling**: CSS Modules
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: bcryptjs
- **API**: RESTful API

### External APIs
- **TMDB API**: 영화 정보 제공

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

---

## 3. 시스템 아키텍처

```
┌─────────────────────────────────────────────┐
│           Frontend (React + Vite)           │
│  - User Interface                           │
│  - State Management (Context API)           │
│  - Routing (React Router)                   │
└──────────────────┬──────────────────────────┘
                   │ HTTP/HTTPS
                   │ REST API
┌──────────────────┴──────────────────────────┐
│        Backend (Node.js + Express)          │
│  - RESTful API Endpoints                    │
│  - Business Logic                           │
│  - Authentication                           │
└──────────────────┬──────────────────────────┘
                   │ Mongoose ODM
┌──────────────────┴──────────────────────────┐
│         Database (MongoDB Atlas)            │
│  - Users Collection                         │
│  - Reviews Collection                       │
│  - Comments Collection                      │
└─────────────────────────────────────────────┘

External:
┌─────────────────────────────────────────────┐
│              TMDB API                       │
│  - Movie Information                        │
│  - TV Show Information                      │
│  - Search Functionality                     │
└─────────────────────────────────────────────┘
```

---

## 4. 주요 기능 (1/2)

### 1. 영화 검색 및 탐색
- TMDB API 연동으로 최신 영화 정보 제공
- 카테고리별 영화 탐색 (인기, 최고 평점, 장르별)
- 실시간 검색 기능
- TV 쇼 지원

### 2. 리뷰 시스템
- 영화 리뷰 작성/수정/삭제
- 별점 평가 (1-5점)
- 리뷰 이미지 업로드 (최대 3개)
- 시청 날짜 기록

### 3. 소셜 기능
- 리뷰 좋아요/싫어요
- 리뷰 댓글 작성
- 사용자 프로필

---

## 4. 주요 기능 (2/2)

### 4. 사용자 인증
- 회원가입/로그인
- 비밀번호 암호화 (bcryptjs)
- 세션 관리
- 게스트 모드 지원

### 5. 영화 추천 시스템
- 협업 필터링 기반 추천
- 사용자 취향 분석
- 유사한 사용자 기반 추천
- 맞춤형 영화 제안

### 6. Keep-Alive 시스템
- 서버 슬립 방지
- 자동 헬스 체크
- 외부 모니터링 연동 가이드

---

## 5. 구현 상세 (1/4)

### 데이터베이스 스키마 설계

#### User Schema
```javascript
{
  userName: String (unique),
  email: String (unique),
  password: String (hashed),
  avatar: String,
  bio: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### Review Schema
```javascript
{
  movieId: Number,
  movieTitle: String,
  userId: String,
  userName: String,
  title: String,
  content: String,
  rating: Number (1-5),
  images: [String],
  watchedDate: Date,
  likes: [String],
  dislikes: [String],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 5. 구현 상세 (2/4)

### RESTful API 설계

#### Review Endpoints
```
GET    /api/reviews              - 모든 리뷰 조회
GET    /api/reviews/:id          - 특정 리뷰 조회
GET    /api/reviews/movie/:id    - 영화별 리뷰 조회
GET    /api/reviews/user/:id     - 사용자별 리뷰 조회
POST   /api/reviews              - 리뷰 생성
PUT    /api/reviews/:id          - 리뷰 수정
DELETE /api/reviews/:id          - 리뷰 삭제
POST   /api/reviews/:id/like     - 리뷰 좋아요
POST   /api/reviews/:id/dislike  - 리뷰 싫어요
```

#### User Endpoints
```
POST   /api/users/register       - 회원가입
POST   /api/users/login          - 로그인
GET    /api/users/:id            - 사용자 정보 조회
PUT    /api/users/:id            - 사용자 정보 수정
```

---

## 5. 구현 상세 (3/4)

### 추천 알고리즘

#### 협업 필터링 기반
1. 사용자가 높게 평가한 영화 분석 (4점 이상)
2. 해당 영화를 좋아한 다른 사용자 찾기
3. 그 사용자들이 높게 평가한 다른 영화 추천
4. 이미 본 영화는 제외

#### MongoDB Aggregation Pipeline
```javascript
[
  { $match: { userId: { $ne: userId }, rating: { $gte: 4 } } },
  { $group: {
      _id: '$movieId',
      avgRating: { $avg: '$rating' },
      reviewCount: { $sum: 1 }
    }
  },
  { $sort: { avgRating: -1, reviewCount: -1 } },
  { $limit: 10 }
]
```

---

## 5. 구현 상세 (4/4)

### 주요 기술적 도전과 해결

#### 1. 이미지 저장 문제
- **문제**: 외부 이미지 저장소 비용 및 복잡도
- **해결**: Base64 인코딩으로 MongoDB에 직접 저장
- **제약**: 파일 크기 2MB, 최대 3개 제한

#### 2. 서버 슬립 문제 (Render Free Tier)
- **문제**: 15분 비활동 시 서버 자동 종료
- **해결**:
  - 프론트엔드에서 10분마다 자동 ping
  - 외부 모니터링 서비스 연동 가이드

#### 3. 비동기 데이터 처리
- **문제**: React에서 async/await 부적절한 사용
- **해결**: useState + useEffect 패턴 표준화

---

## 6. 개발 과정

### Phase 1: 기본 구조 구축 (Week 1-2)
- 프로젝트 초기 설정
- DB 스키마 설계
- 기본 CRUD API 구현
- 영화 정보 연동

### Phase 2: 핵심 기능 개발 (Week 3-4)
- 리뷰 시스템 완성
- 사용자 인터페이스 구현
- 검색 기능 추가
- 반응형 디자인

### Phase 3: 고급 기능 추가 (Week 5-6)
- 좋아요/싫어요 기능
- 댓글 시스템
- 이미지 업로드
- TV 쇼 지원

### Phase 4: 인증 및 추천 (Week 7)
- 사용자 인증 시스템
- 영화 추천 알고리즘
- Keep-Alive 시스템

---

## 7. 성과 및 결과

### 정량적 성과
- **코드 라인**: 3,000+ lines
- **커밋 수**: 20+
- **API 엔드포인트**: 25+
- **컴포넌트 수**: 30+
- **페이지 수**: 4개 (Home, Search, Movie Detail, My Reviews)

### 정성적 성과
- Full-Stack 개발 경험 획득
- RESTful API 설계 및 구현 역량
- MongoDB 데이터 모델링 경험
- React 상태 관리 및 컴포넌트 설계
- 배포 및 운영 경험 (Vercel, Render)

### 기술 역량 향상
- 협업 필터링 알고리즘 이해
- 비동기 프로그래밍 마스터
- 데이터베이스 최적화 (인덱싱, Aggregation)
- 보안 구현 (비밀번호 해싱, 입력 검증)

---

## 8. 향후 개선 방향

### 단기 개선 사항
1. **소셜 로그인**: Google, Kakao OAuth 연동
2. **알림 시스템**: 댓글, 좋아요 알림
3. **프로필 커스터마이징**: 배경 이미지, 소개글
4. **리뷰 정렬**: 최신순, 인기순, 평점순

### 중기 개선 사항
1. **실시간 기능**: WebSocket 기반 실시간 댓글
2. **고급 검색**: 필터링, 정렬 옵션 추가
3. **통계 대시보드**: 개인 관람 통계, 그래프
4. **모바일 앱**: React Native 개발

### 장기 개선 사항
1. **AI 추천**: 딥러닝 기반 고급 추천 시스템
2. **커뮤니티 기능**: 팔로우, 그룹, 이벤트
3. **스트리밍 연동**: Netflix, Disney+ 시청 정보 연동
4. **다국어 지원**: i18n 국제화

---

## 9. 배운 점과 느낀 점

### 기술적 학습
- **Full-Stack 개발의 전체 흐름** 이해
- **데이터베이스 설계의 중요성** 체감
- **사용자 경험(UX)** 고려한 개발
- **성능 최적화**의 필요성

### 개발 프로세스
- **체계적인 기능 구현**: 단계별 개발의 중요성
- **문서화의 가치**: README, 주석의 중요성
- **버전 관리**: Git을 활용한 체계적 관리
- **테스트의 중요성**: 지속적인 테스트와 디버깅

### 아쉬운 점
- 초기 설계 단계에서 더 많은 시간 투자 필요
- 단위 테스트 코드 작성 부족
- 성능 모니터링 도구 미적용
- 접근성(Accessibility) 고려 부족

---

## 10. 시연

### 주요 기능 시연
1. **회원가입 및 로그인**
2. **영화 검색 및 상세 정보 확인**
3. **리뷰 작성** (이미지 업로드 포함)
4. **좋아요/싫어요 및 댓글**
5. **개인화된 영화 추천**
6. **내 리뷰 관리**

### 데모 사이트
- **Frontend**: https://[your-vercel-url].vercel.app
- **Backend**: https://movie-reviewer-api-2dte.onrender.com
- **GitHub**: https://github.com/merturldosa/movie-reviewer

---

## 11. 결론

### 프로젝트 요약
Movie Reviewer는 사용자 친화적인 인터페이스와 개인화된 추천 시스템을 갖춘 현대적인 영화 리뷰 플랫폼입니다. Full-Stack 기술을 활용하여 실제 운영 가능한 수준의 웹 애플리케이션을 구현했습니다.

### 핵심 성과
- 7가지 고급 기능 구현
- 완전한 CRUD 작업
- 사용자 인증 시스템
- 추천 알고리즘
- 실제 배포 및 운영

### 향후 목표
이 프로젝트를 기반으로 더 많은 소셜 기능과 AI 기반 추천 시스템을 추가하여 실제 서비스로 발전시키고자 합니다.

---

## 질의응답

감사합니다!

📧 연락처: [your-email@example.com]
🔗 GitHub: https://github.com/merturldosa/movie-reviewer
🌐 Portfolio: [your-portfolio-url]

---

## 부록: 프로젝트 파일 구조

```
movie-reviewer/
├── backend/
│   ├── controllers/       # 비즈니스 로직
│   ├── models/           # 데이터베이스 스키마
│   ├── routes/           # API 라우트
│   ├── config/           # 설정 파일
│   └── index.js          # 서버 엔트리포인트
├── frontend/
│   ├── src/
│   │   ├── components/   # React 컴포넌트
│   │   ├── pages/        # 페이지 컴포넌트
│   │   ├── context/      # Context API
│   │   ├── services/     # API 서비스
│   │   ├── utils/        # 유틸리티 함수
│   │   └── styles/       # 스타일 파일
│   └── index.html        # HTML 템플릿
├── .gitignore
├── README.md
└── PRESENTATION.md       # 이 발표 자료
```

---

## 부록: 기술 스택 상세

### Frontend Dependencies
```json
{
  "react": "^19.0.0",
  "react-router-dom": "^6.x",
  "axios": "^1.x",
  "react-icons": "^5.x"
}
```

### Backend Dependencies
```json
{
  "express": "^4.x",
  "mongoose": "^8.x",
  "bcryptjs": "^2.x",
  "dotenv": "^16.x",
  "cors": "^2.x"
}
```

---

## 부록: 개발 환경 설정

### Frontend 실행
```bash
cd frontend
npm install
npm run dev
```

### Backend 실행
```bash
cd backend
npm install
npm start
```

### 환경 변수 설정
```env
# Backend (.env)
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_uri
CLIENT_URL=your_frontend_url

# Frontend (.env)
VITE_API_BASE_URL=your_backend_url
VITE_TMDB_API_KEY=your_tmdb_api_key
```
