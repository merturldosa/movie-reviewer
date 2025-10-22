# 🔧 문제 해결 가이드 (Troubleshooting Guide)

이 문서는 Movie Reviewer 애플리케이션 사용 중 발생할 수 있는 일반적인 문제와 해결 방법을 설명합니다.

---

## 목차

1. [설치 문제](#설치-문제)
2. [API 관련 문제](#api-관련-문제)
3. [리뷰 기능 문제](#리뷰-기능-문제)
4. [UI/UX 문제](#uiux-문제)
5. [빌드 및 배포 문제](#빌드-및-배포-문제)
6. [성능 문제](#성능-문제)
7. [브라우저 호환성](#브라우저-호환성)

---

## 설치 문제

### ❌ `npm install` 실패

**증상**: 의존성 설치 중 에러 발생

**해결 방법**:

1. **Node.js 버전 확인**
   ```bash
   node --version  # v16 이상 필요
   npm --version
   ```

2. **캐시 클리어**
   ```bash
   npm cache clean --force
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

3. **다른 패키지 매니저 시도**
   ```bash
   # Yarn 사용
   yarn install

   # pnpm 사용
   pnpm install
   ```

### ❌ 모듈을 찾을 수 없음 (Module not found)

**증상**: `Error: Cannot find module 'react-router-dom'` 등

**해결 방법**:

```bash
# 특정 패키지 재설치
npm install react-router-dom

# 모든 패키지 재설치
rm -rf node_modules
npm install
```

---

## API 관련 문제

### ❌ 영화가 로드되지 않음

**증상**: 홈 페이지에 영화 목록이 표시되지 않음

**원인 1: API 키 미설정**

`.env` 파일 확인:
```env
VITE_TMDB_API_KEY=your_api_key_here
```

**원인 2: API 키가 활성화되지 않음**

TMDB API 키 발급 후 몇 분 정도 기다려야 활성화됩니다.

**원인 3: 환경 변수가 로드되지 않음**

개발 서버 재시작:
```bash
# Ctrl+C로 서버 종료 후
npm run dev
```

**디버깅**:

브라우저 콘솔에서 확인:
```javascript
console.log(import.meta.env.VITE_TMDB_API_KEY);
```

값이 `undefined`라면 환경 변수가 제대로 로드되지 않은 것입니다.

### ❌ CORS 에러

**증상**: `Access to fetch has been blocked by CORS policy`

**해결 방법**:

TMDB API는 CORS를 허용하므로 일반적으로 발생하지 않습니다.
다른 API를 사용하는 경우:

`vite.config.js`에 프록시 설정:
```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://api.themoviedb.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
```

### ❌ API Rate Limit 초과

**증상**: `429 Too Many Requests`

**해결 방법**:

1. 요청 빈도를 줄이기
2. API 키 재발급
3. 유료 플랜 고려 (많은 트래픽의 경우)

### ❌ 이미지가 로드되지 않음

**증상**: 영화 포스터가 깨진 이미지로 표시됨

**해결 방법**:

1. 이미지 URL 확인:
   ```javascript
   console.log(getImageUrl(movie.poster_path));
   ```

2. `poster_path`가 `null`인 경우 대체 이미지 표시:
   ```jsx
   {posterUrl ? (
     <img src={posterUrl} alt={title} />
   ) : (
     <div className="no-image">No Image</div>
   )}
   ```

---

## 리뷰 기능 문제

### ❌ 리뷰가 저장되지 않음

**증상**: 리뷰 작성 후 목록에 표시되지 않음

**원인 1: LocalStorage 비활성화**

브라우저 설정에서 LocalStorage 활성화 확인:
```javascript
// 브라우저 콘솔에서 테스트
localStorage.setItem('test', 'test');
console.log(localStorage.getItem('test'));
```

**원인 2: 시크릿 모드**

시크릿/프라이빗 모드에서는 LocalStorage가 제한될 수 있습니다.
일반 모드로 전환하세요.

**원인 3: 저장 용량 초과**

LocalStorage는 5-10MB로 제한됩니다:
```javascript
// 현재 사용량 확인
let total = 0;
for (let key in localStorage) {
  if (localStorage.hasOwnProperty(key)) {
    total += localStorage[key].length + key.length;
  }
}
console.log(`LocalStorage 사용량: ${(total / 1024 / 1024).toFixed(2)} MB`);
```

**해결 방법**: 오래된 리뷰 삭제

### ❌ 리뷰 수정/삭제 버튼이 보이지 않음

**증상**: 본인이 작성한 리뷰인데 수정/삭제 버튼 없음

**원인**: 사용자 ID 불일치

**해결 방법**:

브라우저 콘솔에서 확인:
```javascript
// 현재 사용자
const user = JSON.parse(localStorage.getItem('movieReviewer_user'));
console.log('Current User ID:', user.id);

// 리뷰 작성자
const reviews = JSON.parse(localStorage.getItem('movieReviewer_reviews'));
console.log('Review User IDs:', reviews.map(r => r.userId));
```

ID가 다르다면 LocalStorage를 초기화:
```javascript
localStorage.clear();
location.reload();
```

### ❌ 리뷰 모달이 열리지 않음

**증상**: "리뷰 작성하기" 버튼 클릭 시 반응 없음

**디버깅**:

1. 브라우저 콘솔에서 에러 확인
2. React DevTools에서 state 확인
3. 버튼에 onClick 이벤트가 연결되어 있는지 확인

---

## UI/UX 문제

### ❌ 스타일이 깨짐

**증상**: CSS가 적용되지 않거나 레이아웃이 이상함

**해결 방법**:

1. **브라우저 캐시 클리어**
   - Chrome: Ctrl+Shift+Delete
   - 또는 하드 리프레시: Ctrl+Shift+R

2. **개발 서버 재시작**
   ```bash
   npm run dev
   ```

3. **CSS Modules 확인**
   ```javascript
   // 올바른 import
   import styles from './Component.module.css';

   // 올바른 사용
   <div className={styles.container}>
   ```

### ❌ 반응형이 작동하지 않음

**증상**: 모바일에서 레이아웃이 깨짐

**해결 방법**:

`index.html`에 viewport 메타 태그 확인:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### ❌ 애니메이션이 끊김

**증상**: 호버 효과나 전환 애니메이션이 부드럽지 않음

**해결 방법**:

1. **GPU 가속 활성화**
   ```css
   .element {
     transform: translateZ(0);
     will-change: transform;
   }
   ```

2. **성능 모니터링**
   - Chrome DevTools → Performance 탭
   - 리렌더링 최소화

---

## 빌드 및 배포 문제

### ❌ 빌드 실패

**증상**: `npm run build` 실행 시 에러

**해결 방법**:

1. **의존성 재설치**
   ```bash
   rm -rf node_modules
   npm install
   npm run build
   ```

2. **환경 변수 확인**
   ```bash
   # .env 파일이 있는지 확인
   cat .env
   ```

3. **메모리 부족**
   ```bash
   # 메모리 할당 증가
   NODE_OPTIONS=--max-old-space-size=4096 npm run build
   ```

### ❌ 배포 후 페이지가 작동하지 않음

**증상**: 배포된 사이트에서 404 에러 또는 빈 페이지

**원인 1: 라우팅 설정 누락**

SPA이므로 모든 경로를 `index.html`로 리다이렉트해야 합니다.

**Vercel**: `vercel.json`
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Netlify**: `netlify.toml`
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**원인 2: 베이스 경로 설정**

GitHub Pages의 경우 `vite.config.js`:
```javascript
export default defineConfig({
  base: '/movie-reviewer/', // 저장소 이름
});
```

### ❌ 환경 변수가 배포 환경에서 작동하지 않음

**해결 방법**:

1. 플랫폼 대시보드에서 환경 변수 설정 확인
2. 변수명이 `VITE_`로 시작하는지 확인
3. 재배포 실행

---

## 성능 문제

### ❌ 페이지 로딩이 느림

**원인 1: 이미지 크기**

**해결 방법**:
- WebP 형식 사용
- 적절한 이미지 사이즈 선택
- Lazy loading 적용

**원인 2: 너무 많은 API 요청**

**해결 방법**:
- 요청 결과 캐싱
- Debounce 적용 (검색)

**원인 3: 불필요한 리렌더링**

**해결 방법**:
```javascript
// React.memo 사용
const MovieCard = React.memo(({ movie }) => {
  // ...
});

// useMemo 사용
const sortedReviews = useMemo(() => {
  return reviews.sort(...);
}, [reviews, sortBy]);
```

### ❌ 메모리 누수

**증상**: 시간이 지날수록 앱이 느려짐

**해결 방법**:

useEffect 클린업:
```javascript
useEffect(() => {
  const timer = setInterval(() => {
    // ...
  }, 1000);

  return () => clearInterval(timer); // 클린업
}, []);
```

---

## 브라우저 호환성

### ❌ Internet Explorer에서 작동하지 않음

**해결 방법**:

IE는 지원하지 않습니다. 최신 브라우저 사용을 권장:
- Chrome
- Firefox
- Safari
- Edge

### ❌ Safari에서 스타일이 다름

**해결 방법**:

벤더 프리픽스 추가:
```css
.element {
  -webkit-transform: scale(1.05);
  transform: scale(1.05);
}
```

---

## 데이터 초기화

### 🔄 완전히 초기화하기

모든 데이터를 삭제하고 처음부터 시작:

```javascript
// 브라우저 콘솔에서 실행
localStorage.clear();
location.reload();
```

또는 특정 데이터만:
```javascript
localStorage.removeItem('movieReviewer_reviews');
localStorage.removeItem('movieReviewer_user');
location.reload();
```

---

## 디버깅 팁

### 브라우저 개발자 도구 활용

1. **Console 탭**: 에러 메시지 확인
2. **Network 탭**: API 요청/응답 확인
3. **Application 탭**: LocalStorage 확인
4. **React DevTools**: 컴포넌트 state/props 확인

### 로그 추가

```javascript
// API 응답 확인
console.log('API Response:', response.data);

// State 변경 확인
console.log('Current State:', state);

// 렌더링 확인
console.log('Component Rendered');
```

---

## 여전히 문제가 해결되지 않나요?

### 1. 문제 보고하기

GitHub Issues에 다음 정보와 함께 보고:
- 문제 설명
- 재현 단계
- 브라우저 및 OS 정보
- 콘솔 에러 메시지 (있는 경우)
- 스크린샷 (있는 경우)

### 2. 도움 받기

- GitHub Discussions
- Stack Overflow (`movie-reviewer` 태그)
- 프로젝트 담당자에게 이메일

---

**문제 해결에 도움이 되길 바랍니다! 🔧**
