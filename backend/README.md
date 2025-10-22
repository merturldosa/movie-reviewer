# Movie Reviewer Backend API

Node.js + Express + MongoDB 기반의 영화 리뷰 서비스 백엔드 API

## 기술 스택

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Environment**: dotenv
- **CORS**: cors middleware

## 프로젝트 구조

```
backend/
├── config/
│   └── db.js              # MongoDB 연결 설정
├── controllers/
│   └── reviewController.js # 리뷰 컨트롤러 (비즈니스 로직)
├── models/
│   └── Review.js          # 리뷰 스키마/모델
├── routes/
│   └── reviews.js         # API 라우트 정의
├── .env                   # 환경 변수 (gitignore)
├── .env.example           # 환경 변수 예제
├── .gitignore
├── index.js               # 메인 서버 파일
├── package.json
└── README.md
```

## 설치 방법

### 1. 패키지 설치

```bash
cd backend
npm install
```

### 2. 환경 변수 설정

`.env.example` 파일을 `.env`로 복사하고 실제 값을 입력합니다:

```bash
cp .env.example .env
```

`.env` 파일 내용:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

### 3. MongoDB 설정

#### 옵션 A: MongoDB Atlas (클라우드, 추천)

1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 회원가입
2. 무료 클러스터 생성
3. Database User 생성 (username, password)
4. Network Access 설정 (0.0.0.0/0 허용 - 개발용)
5. Connection String 복사:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/movie-reviewer
   ```
6. `.env` 파일의 `MONGODB_URI`에 붙여넣기

#### 옵션 B: 로컬 MongoDB

1. MongoDB 로컬 설치
2. MongoDB 실행
3. `.env` 파일에 로컬 연결 문자열 설정:
   ```
   MONGODB_URI=mongodb://localhost:27017/movie-reviewer
   ```

## 실행 방법

### 개발 모드 (nodemon 사용)

```bash
npm run dev
```

### 프로덕션 모드

```bash
npm start
```

서버가 시작되면 다음과 같은 메시지가 표시됩니다:

```
MongoDB Connected: cluster.mongodb.net
Database Name: movie-reviewer

🚀 Server is running on port 5000
📍 Environment: development
🔗 API URL: http://localhost:5000
🌐 Client URL: http://localhost:5173
```

## API 엔드포인트

### Health Check

- **GET** `/api/health` - 서버 상태 확인

### Reviews

- **GET** `/api/reviews` - 모든 리뷰 조회
- **GET** `/api/reviews/:id` - 특정 리뷰 조회
- **GET** `/api/reviews/movie/:movieId` - 특정 영화의 리뷰 조회
- **GET** `/api/reviews/user/:userId` - 특정 사용자의 리뷰 조회
- **GET** `/api/reviews/check/:userId/:movieId` - 사용자가 영화를 리뷰했는지 확인
- **POST** `/api/reviews` - 새 리뷰 생성
- **PUT** `/api/reviews/:id` - 리뷰 수정
- **DELETE** `/api/reviews/:id` - 리뷰 삭제

### 요청/응답 예제

#### 리뷰 생성 (POST /api/reviews)

```json
{
  "movieId": 550,
  "movieTitle": "Fight Club",
  "moviePoster": "/path/to/poster.jpg",
  "userId": "user123",
  "userName": "John Doe",
  "userAvatar": "/path/to/avatar.jpg",
  "title": "Amazing movie!",
  "content": "This is one of the best movies I've ever seen...",
  "rating": 5,
  "watchedDate": "2024-01-15"
}
```

#### 응답

```json
{
  "id": "507f1f77bcf86cd799439011",
  "movieId": 550,
  "movieTitle": "Fight Club",
  "moviePoster": "/path/to/poster.jpg",
  "userId": "user123",
  "userName": "John Doe",
  "userAvatar": "/path/to/avatar.jpg",
  "title": "Amazing movie!",
  "content": "This is one of the best movies I've ever seen...",
  "rating": 5,
  "watchedDate": "2024-01-15T00:00:00.000Z",
  "createdAt": "2024-01-20T10:30:00.000Z",
  "updatedAt": "2024-01-20T10:30:00.000Z"
}
```

## 배포 (Render)

### 1. GitHub에 푸시

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

### 2. Render 설정

1. [Render](https://render.com/) 회원가입/로그인
2. **New +** → **Web Service** 클릭
3. GitHub 저장소 연결
4. 설정:
   - **Name**: movie-reviewer-api
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 3. 환경 변수 설정

Render 대시보드에서 Environment 탭:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
CLIENT_URL=https://your-frontend.vercel.app
```

### 4. 배포

- **Deploy** 버튼 클릭
- 배포 완료 후 URL 복사 (예: `https://movie-reviewer-api.onrender.com`)

## 개발 팁

### API 테스트 (curl)

```bash
# Health check
curl http://localhost:5000/api/health

# 모든 리뷰 조회
curl http://localhost:5000/api/reviews

# 리뷰 생성
curl -X POST http://localhost:5000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{"movieId":550,"movieTitle":"Fight Club","userId":"user123","userName":"John","title":"Great!","content":"Very good movie","rating":5}'
```

### 로그 확인

개발 모드에서 모든 요청이 콘솔에 출력됩니다:

```
GET /api/reviews
POST /api/reviews
DELETE /api/reviews/123
```

## 문제 해결

### MongoDB 연결 오류

```
Error connecting to MongoDB: MongoServerError: bad auth
```

**해결**: `.env` 파일의 MongoDB 연결 문자열 확인 (username, password)

### CORS 오류

```
Access to fetch at 'http://localhost:5000/api/reviews' from origin 'http://localhost:5173' has been blocked
```

**해결**: `.env` 파일의 `CLIENT_URL`이 프론트엔드 URL과 일치하는지 확인

### Port 이미 사용 중

```
Error: listen EADDRINUSE: address already in use :::5000
```

**해결**:
- 다른 포트 사용 (`.env`에서 `PORT` 변경)
- 또는 실행 중인 프로세스 종료

## 라이선스

MIT

## 작성자

Movie Reviewer Team - 호남ICT 풀스택 교육과정
