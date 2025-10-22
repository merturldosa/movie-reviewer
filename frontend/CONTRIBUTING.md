# 🤝 기여 가이드 (Contributing Guide)

Movie Reviewer 프로젝트에 기여해주셔서 감사합니다! 이 문서는 프로젝트에 기여하는 방법을 설명합니다.

---

## 목차

1. [행동 강령](#행동-강령)
2. [기여 방법](#기여-방법)
3. [개발 프로세스](#개발-프로세스)
4. [Pull Request 가이드라인](#pull-request-가이드라인)
5. [코딩 스타일](#코딩-스타일)
6. [커밋 메시지 규칙](#커밋-메시지-규칙)
7. [이슈 리포팅](#이슈-리포팅)

---

## 행동 강령

### 우리의 약속

모두가 환영받는 환경을 만들기 위해, 우리는:

- ✅ 서로를 존중하고 배려합니다
- ✅ 건설적인 피드백을 제공합니다
- ✅ 다양한 관점과 경험을 환영합니다
- ✅ 커뮤니티의 이익을 최우선으로 합니다

### 금지 행위

- ❌ 괴롭힘, 차별, 모욕적인 발언
- ❌ 개인 정보 무단 공개
- ❌ 트롤링, 선동적인 댓글
- ❌ 부적절한 콘텐츠 게시

---

## 기여 방법

### 기여할 수 있는 것들

1. **버그 수정** 🐛
   - 발견한 버그를 수정하고 Pull Request 제출

2. **새로운 기능 추가** ✨
   - 아이디어를 이슈로 먼저 제안
   - 승인 후 구현 및 Pull Request

3. **문서 개선** 📚
   - README, 가이드, API 문서 등 개선
   - 오타, 번역 오류 수정

4. **테스트 추가** 🧪
   - Unit Tests, Integration Tests 작성

5. **UI/UX 개선** 🎨
   - 디자인 개선 제안
   - 접근성 향상

6. **성능 최적화** ⚡
   - 코드 최적화
   - 번들 크기 감소

7. **번역** 🌍
   - 다국어 지원 추가

---

## 개발 프로세스

### 1. Fork & Clone

```bash
# 저장소 Fork (GitHub 웹에서)

# Clone
git clone https://github.com/YOUR_USERNAME/movie-reviewer.git
cd movie-reviewer

# 원본 저장소를 upstream으로 추가
git remote add upstream https://github.com/ORIGINAL_OWNER/movie-reviewer.git
```

### 2. 브랜치 생성

```bash
# 최신 코드 가져오기
git checkout main
git pull upstream main

# 새 브랜치 생성
git checkout -b feature/your-feature-name
# 또는
git checkout -b bugfix/issue-number-bug-description
```

**브랜치 네이밍 규칙**:
- `feature/` - 새로운 기능
- `bugfix/` - 버그 수정
- `hotfix/` - 긴급 수정
- `docs/` - 문서 수정
- `refactor/` - 리팩토링
- `test/` - 테스트 추가

### 3. 개발 환경 설정

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일에 TMDB API 키 입력

# 개발 서버 실행
npm run dev
```

### 4. 코드 작성

- 코딩 스타일 가이드 준수
- 테스트 작성 (가능한 경우)
- 주석 추가 (복잡한 로직의 경우)

### 5. 테스트

```bash
# 린트 체크
npm run lint

# 빌드 테스트
npm run build

# 프리뷰
npm run preview
```

### 6. 커밋

```bash
git add .
git commit -m "feat: 새로운 기능 추가"
```

### 7. Push

```bash
git push origin feature/your-feature-name
```

### 8. Pull Request 생성

GitHub에서 Pull Request를 생성합니다.

---

## Pull Request 가이드라인

### PR 체크리스트

Pull Request를 제출하기 전에 확인:

- [ ] 코드가 정상 작동하는가?
- [ ] 린트 에러가 없는가?
- [ ] 빌드가 성공하는가?
- [ ] 관련 이슈가 있다면 링크했는가?
- [ ] 문서가 업데이트되었는가? (필요한 경우)
- [ ] 커밋 메시지가 규칙을 따르는가?

### PR 제목

명확하고 설명적인 제목 작성:

```
feat: 영화 필터링 기능 추가
fix: 리뷰 삭제 시 에러 수정
docs: README에 설치 가이드 추가
```

### PR 설명

다음 템플릿을 사용:

```markdown
## 변경 사항

<!-- 무엇을 변경했는지 설명 -->

## 변경 이유

<!-- 왜 이 변경이 필요한지 설명 -->

## 테스트 방법

<!-- 어떻게 테스트했는지 설명 -->
1. 단계 1
2. 단계 2

## 스크린샷 (UI 변경 시)

<!-- 스크린샷 첨부 -->

## 관련 이슈

Closes #123
```

### 리뷰 프로세스

1. **자동 체크**: CI/CD가 자동으로 빌드 및 테스트
2. **코드 리뷰**: 메인테이너가 코드 리뷰
3. **수정 요청**: 필요시 수정 요청
4. **승인**: 리뷰 승인 후 머지
5. **머지**: `main` 브랜치에 머지

---

## 코딩 스타일

### JavaScript/React

**ESLint 규칙 준수**:

```bash
npm run lint
```

**주요 규칙**:

```javascript
// ✅ 올바른 예시

// 1. 컴포넌트는 PascalCase
const MovieCard = ({ movie }) => {
  return <div>{movie.title}</div>;
};

// 2. 함수는 camelCase
const fetchMovies = async () => {
  // ...
};

// 3. 상수는 UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';

// 4. Props destructuring 사용
const Button = ({ children, onClick, variant = 'primary' }) => {
  // ...
};

// 5. 조건부 렌더링
return (
  <div>
    {isLoading ? <Loading /> : <Content />}
    {error && <ErrorMessage error={error} />}
  </div>
);

// ❌ 잘못된 예시

// 1. 컴포넌트 이름이 camelCase
const movieCard = () => { }; // ❌

// 2. 인라인 스타일 남용
<div style={{ color: 'red', padding: '10px' }}>❌</div>

// 3. Key prop 누락
{items.map(item => <div>{item.name}</div>)} // ❌
```

### CSS

```css
/* ✅ 올바른 예시 */

/* BEM 네이밍 */
.movie-card { }
.movie-card__title { }
.movie-card--featured { }

/* CSS Variables 사용 */
.button {
  color: var(--color-text-primary);
  padding: var(--spacing-md);
}

/* ❌ 잘못된 예시 */

/* 하드코딩된 값 */
.button {
  color: #ffffff; /* ❌ var(--color-text-primary) 사용 */
  padding: 16px;  /* ❌ var(--spacing-md) 사용 */
}

/* 깊은 중첩 */
.header .nav .menu .item .link { } /* ❌ 너무 깊음 */
```

---

## 커밋 메시지 규칙

### Conventional Commits

커밋 메시지는 다음 형식을 따릅니다:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅 (기능 변경 없음)
- `refactor`: 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드, 설정 변경

### 예시

```bash
# 기능 추가
git commit -m "feat: 영화 필터링 기능 추가"
git commit -m "feat(search): 실시간 검색 자동완성 추가"

# 버그 수정
git commit -m "fix: 리뷰 삭제 시 에러 수정"
git commit -m "fix(review): 평점 유효성 검증 추가"

# 문서
git commit -m "docs: README에 배포 가이드 추가"

# 스타일
git commit -m "style: 코드 포맷팅"

# 리팩토링
git commit -m "refactor: API 서비스 레이어 개선"

# 테스트
git commit -m "test: MovieCard 컴포넌트 테스트 추가"

# 빌드/설정
git commit -m "chore: Vite 설정 업데이트"
```

### Body (선택사항)

복잡한 변경사항의 경우 본문 추가:

```bash
git commit -m "feat: 영화 필터링 기능 추가

사용자가 장르, 평점, 개봉년도로 영화를 필터링할 수 있습니다.
- 다중 장르 선택 가능
- 평점 범위 슬라이더
- 년도 범위 선택

Closes #45"
```

---

## 이슈 리포팅

### 버그 리포트

버그를 발견하면 다음 정보를 포함하여 이슈 생성:

```markdown
**버그 설명**
리뷰 삭제 버튼 클릭 시 에러 발생

**재현 단계**
1. 영화 상세 페이지 접속
2. 리뷰 작성
3. 삭제 버튼 클릭
4. 에러 발생

**예상 동작**
리뷰가 삭제되어야 함

**실제 동작**
에러 메시지 표시

**환경**
- OS: Windows 11
- 브라우저: Chrome 120
- Node: v18.17.0

**스크린샷**
[스크린샷 첨부]

**콘솔 에러**
```
Error: Cannot delete review
```

**추가 정보**
LocalStorage에 리뷰가 남아있음
```

### 기능 제안

새로운 기능을 제안할 때:

```markdown
**기능 설명**
영화 추천 기능 추가

**사용 사례**
사용자가 좋아하는 영화를 기반으로 비슷한 영화를 추천받고 싶어함

**제안 구현 방법**
1. 사용자의 리뷰 평점 분석
2. TMDB 유사 영화 API 호출
3. 추천 영화 목록 표시

**대안**
- 장르 기반 추천
- 인기도 기반 추천

**추가 컨텍스트**
[참고 자료, 스크린샷 등]
```

---

## 도움이 필요하신가요?

### 질문하기

- **GitHub Discussions**: 일반적인 질문
- **GitHub Issues**: 버그 리포트, 기능 제안
- **이메일**: project@example.com

### 리소스

- [React 공식 문서](https://react.dev)
- [Vite 가이드](https://vitejs.dev/guide/)
- [TMDB API 문서](https://developers.themoviedb.org/3)

---

## 감사 인사

모든 기여자분들께 감사드립니다! 🎉

기여자 목록은 [Contributors](https://github.com/your-repo/movie-reviewer/graphs/contributors)에서 확인하세요.

---

**함께 만들어가는 프로젝트, 감사합니다! ❤️**
