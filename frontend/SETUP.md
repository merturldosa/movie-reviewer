# 🚀 빠른 시작 가이드

## 1. TMDB API 키 발급 (필수)

이 프로젝트는 TMDB (The Movie Database) API를 사용합니다. API 키를 발급받아야 합니다.

### API 키 발급 단계:

1. **TMDB 계정 생성**
   - https://www.themoviedb.org/ 방문
   - "Sign Up" 클릭하여 계정 생성

2. **API 키 신청**
   - 로그인 후 프로필 아이콘 클릭
   - "Settings" 선택
   - 왼쪽 메뉴에서 "API" 선택
   - "Request an API Key" 클릭
   - "Developer" 선택
   - 약관 동의 후 신청 정보 입력
   - API Key (v3 auth) 복사

3. **환경 변수 설정**
   - 프로젝트 루트의 `.env` 파일 열기
   - `VITE_TMDB_API_KEY=your_api_key_here` 부분을 발급받은 API 키로 교체

   예시:
   ```env
   VITE_TMDB_API_KEY=abcdef1234567890abcdef1234567890
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/
   ```

## 2. 프로젝트 실행

```bash
# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173` 열기

## 3. 문제 해결

### API 키 오류가 발생하는 경우
- `.env` 파일이 프로젝트 루트(`movie-reviewer/`)에 있는지 확인
- API 키가 올바르게 입력되었는지 확인
- 개발 서버를 재시작 (Ctrl+C 후 `npm run dev`)

### 영화가 로드되지 않는 경우
- 인터넷 연결 확인
- 브라우저 콘솔에서 에러 메시지 확인
- TMDB API 키가 활성화되었는지 확인 (발급 후 몇 분 소요될 수 있음)

## 4. 기능 테스트

1. **홈 페이지**: 카테고리별 영화 목록 확인
2. **검색**: 상단 검색창에서 영화 검색
3. **영화 상세**: 영화 클릭하여 상세 정보 확인
4. **리뷰 작성**: 영화 상세 페이지에서 리뷰 작성
5. **내 리뷰**: 상단 메뉴에서 "내 리뷰" 클릭

## 5. 다음 단계

기본 기능이 동작하면 다음을 추가로 구현할 수 있습니다:
- 영화 상세 페이지 완성
- 리뷰 CRUD 기능 구현
- 검색 페이지 구현
- 내 리뷰 페이지 구현
- 반응형 디자인 최적화

---

문제가 있으면 GitHub 이슈를 생성해주세요!
