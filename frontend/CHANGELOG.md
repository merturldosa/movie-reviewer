# 📝 변경 이력 (Changelog)

Movie Reviewer 프로젝트의 모든 주목할 만한 변경사항을 이 파일에 문서화합니다.

이 프로젝트는 [Semantic Versioning](https://semver.org/)을 따릅니다.

---

## [Unreleased]

### 계획된 기능
- [ ] 이미지 첨부 기능
- [ ] 리뷰 좋아요 기능
- [ ] 리뷰 댓글 기능
- [ ] 소셜 공유 기능
- [ ] 영화 추천 알고리즘
- [ ] 사용자 인증 시스템
- [ ] 백엔드 서버 연동
- [ ] PWA 지원

---

## [1.0.0] - 2025-10-17

### 🎉 초기 릴리스

첫 번째 안정 버전 릴리스

### ✨ 추가된 기능

#### 영화 탐색
- 카테고리별 영화 목록 (9개 카테고리)
  - Netflix Originals
  - 추천 AI 인물 매칭
  - Trending Now
  - Top Rated
  - Action Movies
  - Comedy Movies
  - Horror Movies
  - Romance Movies
  - Documentaries
- 가로 스크롤 영화 카드
- 호버 시 영화 정보 표시

#### 영화 상세 페이지
- 영화 포스터 및 배경 이미지
- 제목, 태그라인, 줄거리
- 개봉일, 러닝타임, 평점, 장르
- YouTube 트레일러 임베드
- 출연진 정보 (상위 10명)
- 리뷰 섹션

#### 리뷰 CRUD
- ✏️ 리뷰 작성
  - 평점 (1-5 별점)
  - 제목 (2-100자)
  - 내용 (10-2000자)
  - 시청 날짜 (선택)
- 👁️ 리뷰 조회
  - 영화별 리뷰 목록
  - 확장/축소 기능 (300자 초과 시)
- ✏️ 리뷰 수정
  - 본인 리뷰만 수정 가능
  - 모달 기반 편집
- 🗑️ 리뷰 삭제
  - 본인 리뷰만 삭제 가능
  - 삭제 확인 모달

#### 검색
- 실시간 영화 검색
- 검색 결과 그리드 표시
- "더 보기" 버튼으로 추가 결과 로드

#### 내 리뷰
- 작성한 리뷰 목록
- 총 리뷰 개수 및 평균 평점 표시
- 정렬 기능 (최신순/오래된순/높은평점/낮은평점)
- 영화 링크 연결

#### UI/UX
- 중후하고 전문적인 다크 테마
- Netflix 스타일 레드 강조색
- 골드 별점 시스템
- 부드러운 애니메이션 및 트랜지션
- 반응형 디자인 (모바일/태블릿/데스크톱)

#### 컴포넌트
- 재사용 가능한 UI 컴포넌트
  - Button (4가지 variant, 3가지 size)
  - Input (에러 처리, 필수 항목 표시)
  - Textarea (글자 수 카운터)
  - Rating (별점, 읽기/쓰기 모드)
  - Modal (3가지 size)
  - Loading (일반/풀스크린)

### 🎨 디자인
- CSS Variables 기반 디자인 시스템
- CSS Modules로 스타일 격리
- 반응형 브레이크포인트 (320px/768px/1024px)

### 🔧 기술
- React 18 + Vite
- React Router v6
- Context API (User, Review)
- TMDB API 통합
- LocalStorage 기반 데이터 저장
- Axios HTTP 클라이언트

### 📚 문서
- README.md - 프로젝트 소개
- SETUP.md - 설치 가이드
- USAGE_GUIDE.md - 사용 가이드
- DEPLOYMENT.md - 배포 가이드
- TROUBLESHOOTING.md - 문제 해결 가이드
- DEVELOPER_GUIDE.md - 개발자 가이드
- API_DOCUMENTATION.md - API 문서
- CONTRIBUTING.md - 기여 가이드
- SECURITY.md - 보안 정책
- PRD.md - 제품 요구사항 문서
- FINAL_README.md - 프로젝트 완료 보고서

---

## [0.9.0] - 2025-10-17

### 🚧 베타 릴리스

프로덕션 배포 전 베타 테스트 버전

### ✨ 추가
- 모든 핵심 기능 구현 완료
- 문서화 완료

### 🐛 수정
- 리뷰 삭제 시 확인 모달 추가
- 영화 이미지 없을 때 대체 UI 표시
- 검색 결과 없을 때 안내 메시지 표시

### 🔧 개선
- 로딩 상태 처리 개선
- 에러 처리 강화
- 반응형 디자인 최적화

---

## [0.5.0] - 2025-10-17

### ✨ 추가
- 영화 상세 페이지 구현
- 리뷰 CRUD 기능 구현
- 검색 페이지 구현
- 내 리뷰 페이지 구현

---

## [0.3.0] - 2025-10-17

### ✨ 추가
- 홈 페이지 구현
- 영화 카테고리별 목록 표시
- 네비게이션 바 구현
- TMDB API 연동

---

## [0.1.0] - 2025-10-17

### 🎬 프로젝트 시작

- 프로젝트 초기 설정
- React + Vite 환경 구성
- 디자인 시스템 정의
- 기본 폴더 구조 생성

---

## 버전 관리 규칙

### [Major.Minor.Patch]

- **Major (1.x.x)**: 호환성이 깨지는 변경
- **Minor (x.1.x)**: 새로운 기능 추가 (하위 호환)
- **Patch (x.x.1)**: 버그 수정 (하위 호환)

### 예시
- `1.0.0` → `2.0.0`: 주요 변경 (API 변경, 구조 변경)
- `1.0.0` → `1.1.0`: 새 기능 추가
- `1.0.0` → `1.0.1`: 버그 수정

---

## 변경 유형

- ✨ **Added**: 새로운 기능
- 🔧 **Changed**: 기존 기능 변경
- 🗑️ **Deprecated**: 곧 제거될 기능
- 🗑️ **Removed**: 제거된 기능
- 🐛 **Fixed**: 버그 수정
- 🔒 **Security**: 보안 취약점 수정

---

## 링크

- [Unreleased]: https://github.com/your-repo/movie-reviewer/compare/v1.0.0...HEAD
- [1.0.0]: https://github.com/your-repo/movie-reviewer/releases/tag/v1.0.0
- [0.9.0]: https://github.com/your-repo/movie-reviewer/releases/tag/v0.9.0
- [0.5.0]: https://github.com/your-repo/movie-reviewer/releases/tag/v0.5.0
- [0.3.0]: https://github.com/your-repo/movie-reviewer/releases/tag/v0.3.0
- [0.1.0]: https://github.com/your-repo/movie-reviewer/releases/tag/v0.1.0

---

**모든 변경사항은 [GitHub Releases](https://github.com/your-repo/movie-reviewer/releases)에서도 확인할 수 있습니다.**
