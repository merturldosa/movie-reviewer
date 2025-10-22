# 배포 가이드 (Deployment Guide)

이 문서는 Movie Reviewer 프로젝트를 프로덕션 환경에 배포하는 전체 과정을 단계별로 설명합니다.

## 목차

1. [개요](#개요)
2. [사전 준비](#사전-준비)
3. [MongoDB Atlas 설정](#mongodb-atlas-설정)
4. [백엔드 배포 (Render)](#백엔드-배포-render)
5. [프론트엔드 배포 (Vercel)](#프론트엔드-배포-vercel)
6. [배포 후 테스트](#배포-후-테스트)
7. [문제 해결](#문제-해결)

---

## 개요

### 배포 아키텍처

```
┌─────────────────────┐
│                     │
│   사용자 브라우저    │
│                     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Vercel (Frontend)  │
│  React + Vite       │
└──────────┬──────────┘
           │
           │ API 호출
           ▼
┌─────────────────────┐
│  Render (Backend)   │
│  Node.js + Express  │
└──────────┬──────────┘
           │
           │ DB 연결
           ▼
┌─────────────────────┐
│  MongoDB Atlas      │
│  클라우드 DB        │
└─────────────────────┘
```

### 기술 스택

- **프론트엔드**: React 19 + Vite → Vercel
- **백엔드**: Node.js + Express → Render
- **데이터베이스**: MongoDB → MongoDB Atlas (무료)
- **도메인**: Vercel 제공 무료 도메인

---

## 사전 준비

### 필요한 계정 생성

1. **GitHub 계정** - 코드 저장소
   - https://github.com

2. **MongoDB Atlas 계정** - 데이터베이스
   - https://www.mongodb.com/cloud/atlas

3. **Render 계정** - 백엔드 호스팅
   - https://render.com
   - GitHub 계정으로 로그인 가능

4. **Vercel 계정** - 프론트엔드 호스팅
   - https://vercel.com
   - GitHub 계정으로 로그인 가능

### 로컬 테스트 완료 확인

배포 전에 로컬에서 모든 기능이 정상 작동하는지 확인:

```bash
# 백엔드 실행 (터미널 1)
cd backend
npm install
npm run dev

# 프론트엔드 실행 (터미널 2)
cd frontend
npm install
npm run dev
```

---

## MongoDB Atlas 설정

### 1단계: 클러스터 생성

1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 로그인
2. **Create a New Cluster** 또는 **Build a Database** 클릭
3. 무료 플랜 선택:
   - **Cloud Provider**: AWS (추천)
   - **Region**: Seoul (ap-northeast-2) 또는 가까운 지역
   - **Cluster Tier**: M0 Sandbox (무료)
   - **Cluster Name**: movie-reviewer-cluster
4. **Create Cluster** 클릭 (생성에 2-3분 소요)

### 2단계: 데이터베이스 사용자 생성

1. 좌측 메뉴에서 **Database Access** 클릭
2. **Add New Database User** 클릭
3. 설정:
   - **Authentication Method**: Password
   - **Username**: `moviereviewer` (기억해야 함)
   - **Password**: 강력한 비밀번호 생성 (복사해두기)
   - **Database User Privileges**: Read and write to any database
4. **Add User** 클릭

### 3단계: 네트워크 액세스 설정

1. 좌측 메뉴에서 **Network Access** 클릭
2. **Add IP Address** 클릭
3. **Allow Access from Anywhere** 선택
   - IP: `0.0.0.0/0` (자동 입력됨)
   - 설명: "Allow all IPs for development"
4. **Confirm** 클릭

⚠️ **프로덕션에서는 Render의 IP만 허용하는 것이 더 안전합니다**

### 4단계: 연결 문자열 복사

1. 좌측 메뉴에서 **Database** 클릭
2. 클러스터에서 **Connect** 버튼 클릭
3. **Connect your application** 선택
4. **Driver**: Node.js, **Version**: 최신 버전
5. 연결 문자열 복사:
   ```
   mongodb+srv://moviereviewer:<password>@movie-reviewer-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. `<password>`를 실제 비밀번호로 교체
7. 데이터베이스 이름 추가:
   ```
   mongodb+srv://moviereviewer:YOUR_PASSWORD@movie-reviewer-cluster.xxxxx.mongodb.net/movie-reviewer?retryWrites=true&w=majority
   ```

**이 문자열을 안전하게 보관하세요!**

---

## 백엔드 배포 (Render)

### 1단계: GitHub에 코드 푸시

프로젝트가 Git 저장소에 없다면:

```bash
# 프로젝트 루트에서
cd D:\prj\campus\GJ-ICT\tp

# Git 초기화 (이미 되어있다면 생략)
git init

# .gitignore 확인 (중요!)
# backend/.env 파일이 포함되지 않도록

# 커밋
git add .
git commit -m "Add backend and database integration"

# GitHub 저장소 생성 후 연결
git remote add origin https://github.com/your-username/movie-reviewer.git
git branch -M main
git push -u origin main
```

### 2단계: Render 서비스 생성

1. [Render 대시보드](https://dashboard.render.com/) 로그인
2. **New +** 버튼 → **Web Service** 클릭
3. **Connect a repository** 섹션에서 GitHub 저장소 연결
4. 저장소 선택 후 **Connect** 클릭

### 3단계: 서비스 설정

다음 정보를 입력:

| 항목 | 값 |
|------|-----|
| **Name** | `movie-reviewer-api` |
| **Region** | Oregon (US West) 또는 가까운 지역 |
| **Branch** | `main` |
| **Root Directory** | `backend` ⚠️ **중요!** |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | Free |

### 4단계: 환경 변수 설정

**Environment** 섹션에서 다음 변수 추가:

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `MONGODB_URI` | MongoDB Atlas 연결 문자열 (위에서 복사한 것) |
| `CLIENT_URL` | `https://your-app.vercel.app` (나중에 업데이트) |

⚠️ **현재는 CLIENT_URL을 임시로 `*` 또는 빈 값으로 두고, Vercel 배포 후 업데이트할 수 있습니다**

### 5단계: 배포

1. **Create Web Service** 클릭
2. 배포 시작 (5-10분 소요)
3. 로그에서 진행 상황 확인:
   ```
   ==> Building...
   ==> npm install
   ==> Starting service...
   MongoDB Connected: movie-reviewer-cluster.xxxxx.mongodb.net
   🚀 Server is running on port 5000
   ```

### 6단계: 백엔드 URL 확인

배포 완료 후:
- URL: `https://movie-reviewer-api.onrender.com` (예시)
- 이 URL을 복사해두세요! (프론트엔드 설정에 필요)

**테스트**:
```bash
curl https://movie-reviewer-api.onrender.com/api/health
```

응답:
```json
{
  "status": "OK",
  "message": "Movie Reviewer API is running",
  "timestamp": "2024-01-20T10:00:00.000Z"
}
```

---

## 프론트엔드 배포 (Vercel)

### 1단계: Vercel 프로젝트 생성

1. [Vercel 대시보드](https://vercel.com/dashboard) 로그인
2. **Add New...** → **Project** 클릭
3. GitHub 저장소 연결 및 선택
4. **Import** 클릭

### 2단계: 프로젝트 설정

| 항목 | 값 |
|------|-----|
| **Framework Preset** | Vite (자동 감지됨) |
| **Root Directory** | `frontend` ⚠️ **중요!** |
| **Build Command** | `npm run build` (자동) |
| **Output Directory** | `dist` (자동) |

### 3단계: 환경 변수 설정

**Environment Variables** 섹션에서 추가:

| Name | Value |
|------|-------|
| `VITE_TMDB_API_KEY` | 귀하의 TMDB API 키 |
| `VITE_TMDB_BASE_URL` | `https://api.themoviedb.org/3` |
| `VITE_TMDB_IMAGE_BASE_URL` | `https://image.tmdb.org/t/p/` |
| `VITE_API_BASE_URL` | `https://movie-reviewer-api.onrender.com/api` |

⚠️ **`VITE_API_BASE_URL`에 Render에서 얻은 백엔드 URL을 입력하세요**

### 4단계: 배포

1. **Deploy** 클릭
2. 빌드 진행 (2-3분)
3. 로그 확인:
   ```
   ✓ Building for production
   ✓ Compiled successfully
   ✓ Build completed
   ```

### 5단계: 프론트엔드 URL 확인

배포 완료 후:
- URL: `https://your-app.vercel.app` (예시)
- **이 URL을 복사하세요!**

### 6단계: 백엔드 CORS 업데이트

1. Render 대시보드로 돌아가기
2. `movie-reviewer-api` 서비스 선택
3. **Environment** 탭 클릭
4. `CLIENT_URL` 환경 변수 수정:
   ```
   https://your-app.vercel.app
   ```
5. **Save Changes** 클릭
6. 서비스가 자동으로 재배포됨

---

## 배포 후 테스트

### 1. 프론트엔드 접속

브라우저에서 Vercel URL 열기:
```
https://your-app.vercel.app
```

### 2. 기능 테스트

1. **영화 탐색**
   - 홈페이지에서 영화 목록 확인
   - 영화 카드 클릭하여 상세 페이지 이동

2. **리뷰 작성**
   - 영화 상세 페이지에서 리뷰 작성 버튼 클릭
   - 리뷰 입력 후 등록
   - 작성한 리뷰가 표시되는지 확인

3. **리뷰 수정/삭제**
   - 내 리뷰 페이지 방문
   - 리뷰 수정 테스트
   - 리뷰 삭제 테스트

4. **검색 기능**
   - 상단 검색창에서 영화 검색
   - 검색 결과 확인

### 3. 개발자 도구 확인

브라우저 개발자 도구(F12) 열기:

1. **Console 탭**
   - 에러 메시지 없는지 확인

2. **Network 탭**
   - API 요청이 성공하는지 확인 (200 OK)
   - Render 백엔드로 요청이 가는지 확인

---

## 문제 해결

### 백엔드 관련

#### 1. MongoDB 연결 실패

**에러 메시지**:
```
MongoServerError: bad auth: Authentication failed
```

**해결책**:
- MongoDB Atlas 연결 문자열 확인
- 사용자 이름과 비밀번호가 정확한지 확인
- 비밀번호에 특수문자가 있다면 URL 인코딩 필요
- Render 환경 변수에 정확히 입력되었는지 확인

#### 2. Render 빌드 실패

**에러 메시지**:
```
Build failed
```

**해결책**:
- Root Directory가 `server`로 설정되었는지 확인
- `package.json`에 `start` 스크립트가 있는지 확인
- Render 로그에서 구체적인 에러 확인

#### 3. 서비스가 시작되지 않음

**해결책**:
- Render 로그 확인
- 환경 변수가 모두 설정되었는지 확인
- MongoDB Atlas Network Access에 0.0.0.0/0이 허용되었는지 확인

### 프론트엔드 관련

#### 1. API 호출 실패 (CORS 에러)

**에러 메시지**:
```
Access to fetch at 'https://movie-reviewer-api.onrender.com/api/reviews'
from origin 'https://your-app.vercel.app' has been blocked by CORS policy
```

**해결책**:
- Render에서 `CLIENT_URL` 환경 변수가 Vercel URL로 정확히 설정되었는지 확인
- URL 끝에 슬래시(/)가 없어야 함
- 변경 후 Render 서비스 재배포

#### 2. 환경 변수 인식 안 됨

**증상**: API 호출이 localhost:5000으로 가는 경우

**해결책**:
- Vercel 대시보드에서 환경 변수 확인
- 모든 변수가 `VITE_` 접두사로 시작하는지 확인
- 환경 변수 변경 후 **반드시 재배포** 필요
- Vercel 프로젝트 → Settings → Environment Variables에서 확인

#### 3. 빌드 실패

**에러 메시지**:
```
Build failed with exit code 1
```

**해결책**:
- Root Directory가 `movie-reviewer`로 설정되었는지 확인
- 로컬에서 `npm run build`가 성공하는지 확인
- Vercel 로그에서 구체적인 에러 확인

### 일반 문제

#### 1. Render 무료 플랜 - Cold Start

**증상**: 첫 요청이 매우 느림 (15-30초)

**원인**: Render 무료 플랜은 15분 동안 요청이 없으면 서버가 sleep 모드로 전환됨

**해결책**:
- 정상적인 동작입니다
- 첫 요청 후에는 빠르게 응답함
- 유료 플랜으로 업그레이드하면 해결
- 또는 Cron Job으로 주기적으로 Health Check 요청 보내기

#### 2. MongoDB Atlas 연결 제한

**증상**: 간헐적으로 DB 연결 실패

**원인**: 무료 플랜은 동시 연결 수 제한

**해결책**:
- 일반적으로 문제되지 않음
- 많은 트래픽 예상 시 유료 플랜 고려

---

## 배포 체크리스트

배포 전 확인사항:

### 백엔드
- [ ] MongoDB Atlas 클러스터 생성
- [ ] Database User 생성
- [ ] Network Access 설정 (0.0.0.0/0)
- [ ] 연결 문자열 확인
- [ ] GitHub에 코드 푸시 (`.env` 제외)
- [ ] Render Web Service 생성
- [ ] Root Directory를 `backend`로 설정
- [ ] 환경 변수 설정
- [ ] 배포 성공 확인
- [ ] Health check API 테스트

### 프론트엔드
- [ ] TMDB API 키 확보
- [ ] 백엔드 URL 확인
- [ ] Vercel 프로젝트 생성
- [ ] Root Directory를 `frontend`로 설정
- [ ] 환경 변수 설정
- [ ] 배포 성공 확인
- [ ] 프론트엔드 URL 확인
- [ ] 백엔드 CORS 설정 업데이트

### 최종 테스트
- [ ] 프론트엔드 접속 확인
- [ ] 영화 목록 표시 확인
- [ ] 리뷰 작성 테스트
- [ ] 리뷰 수정 테스트
- [ ] 리뷰 삭제 테스트
- [ ] 검색 기능 테스트
- [ ] 개발자 도구에서 에러 없음 확인

---

## 추가 리소스

### 공식 문서
- [MongoDB Atlas 문서](https://www.mongodb.com/docs/atlas/)
- [Render 문서](https://render.com/docs)
- [Vercel 문서](https://vercel.com/docs)

### 유용한 링크
- [Render 무료 플랜 제한사항](https://render.com/docs/free)
- [Vercel 환경 변수 가이드](https://vercel.com/docs/concepts/projects/environment-variables)
- [MongoDB Atlas 무료 티어](https://www.mongodb.com/pricing)

---

## 비용 안내

이 가이드의 모든 서비스는 **무료 플랜**을 사용합니다:

| 서비스 | 무료 플랜 제한 | 충분한가? |
|--------|---------------|----------|
| **MongoDB Atlas** | 512MB 저장소 | ✅ 학습/데모용 충분 |
| **Render** | 750시간/월, Sleep after 15min | ✅ 개인 프로젝트 충분 |
| **Vercel** | 100GB 대역폭/월 | ✅ 충분 |

**총 비용: $0 (무료)** 🎉

---

## 마무리

축하합니다! 🎉

Movie Reviewer 프로젝트가 성공적으로 배포되었습니다.

이제 전 세계 어디서든 프로젝트에 접속할 수 있습니다:
- 프론트엔드: `https://your-app.vercel.app`
- 백엔드 API: `https://movie-reviewer-api.onrender.com`

### 다음 단계

1. 도메인 연결 (선택사항)
   - Vercel에서 커스텀 도메인 설정 가능

2. 모니터링 설정
   - Render와 Vercel 대시보드에서 로그 확인

3. CI/CD 자동화
   - GitHub에 푸시하면 자동으로 배포됨 (이미 설정됨)

4. 성능 최적화
   - MongoDB 인덱스 추가
   - 이미지 최적화
   - Caching 전략

### 지원

문제가 발생하면:
1. 이 가이드의 [문제 해결](#문제-해결) 섹션 확인
2. Render/Vercel 로그 확인
3. 브라우저 개발자 도구 확인

---

**작성일**: 2025-10-22
**작성자**: Movie Reviewer Team - 호남ICT 풀스택 교육과정
