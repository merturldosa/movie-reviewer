# 👨‍💻 개발자 가이드 (Developer Guide)

이 문서는 Movie Reviewer 프로젝트에 기여하거나 코드를 이해하려는 개발자를 위한 가이드입니다.

---

## 목차

1. [프로젝트 구조](#프로젝트-구조)
2. [아키텍처](#아키텍처)
3. [개발 환경 설정](#개발-환경-설정)
4. [코딩 컨벤션](#코딩-컨벤션)
5. [컴포넌트 가이드](#컴포넌트-가이드)
6. [상태 관리](#상태-관리)
7. [API 통합](#api-통합)
8. [스타일링](#스타일링)
9. [테스팅](#테스팅)
10. [성능 최적화](#성능-최적화)

---

## 프로젝트 구조

```
movie-reviewer/
├── public/              # 정적 파일
├── src/
│   ├── components/      # React 컴포넌트
│   │   ├── Layout/      # 레이아웃 컴포넌트
│   │   ├── Movie/       # 영화 관련 컴포넌트
│   │   ├── Review/      # 리뷰 관련 컴포넌트
│   │   ├── UI/          # 재사용 가능한 UI 컴포넌트
│   │   └── Common/      # 공통 컴포넌트
│   ├── pages/           # 페이지 컴포넌트
│   │   ├── Home/
│   │   ├── MovieDetail/
│   │   ├── Search/
│   │   └── MyReviews/
│   ├── context/         # React Context
│   │   ├── UserContext.jsx
│   │   └── ReviewContext.jsx
│   ├── hooks/           # Custom Hooks (추가 예정)
│   ├── services/        # API 서비스 레이어
│   │   ├── tmdbApi.js
│   │   └── reviewService.js
│   ├── utils/           # 유틸리티 함수
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── styles/          # 글로벌 스타일
│   │   ├── variables.css
│   │   └── global.css
│   ├── App.jsx          # 메인 앱 컴포넌트
│   └── main.jsx         # 엔트리 포인트
├── .env                 # 환경 변수
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## 아키텍처

### 전체 아키텍처

```
┌─────────────────────────────────────┐
│          User Interface             │
│  (React Components + CSS Modules)   │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│         State Management            │
│  (Context API: User, Review)        │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│       Service Layer                 │
│  (tmdbApi, reviewService)           │
└─────────────────────────────────────┘
                 ↓
┌──────────────────┬──────────────────┐
│   TMDB API       │  LocalStorage    │
│  (영화 데이터)   │  (리뷰 데이터)   │
└──────────────────┴──────────────────┘
```

### 데이터 흐름

```
User Action
    ↓
Component
    ↓
Context/Service
    ↓
API/LocalStorage
    ↓
Context Update
    ↓
Component Re-render
    ↓
UI Update
```

---

## 개발 환경 설정

### 필수 도구

- **Node.js**: v16 이상
- **npm** 또는 **yarn**
- **Git**
- **VS Code** (권장)

### VS Code 확장 프로그램 (권장)

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "dsznajder.es7-react-js-snippets",
    "bradlc.vscode-tailwindcss",
    "styled-components.vscode-styled-components"
  ]
}
```

### 초기 설정

```bash
# 저장소 클론
git clone https://github.com/your-username/movie-reviewer.git
cd movie-reviewer

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일에 TMDB API 키 입력

# 개발 서버 실행
npm run dev
```

### Git 브랜치 전략

```
main (프로덕션)
  ↑
develop (개발)
  ↑
feature/* (기능 개발)
bugfix/* (버그 수정)
hotfix/* (긴급 수정)
```

---

## 코딩 컨벤션

### JavaScript/React

#### 1. 네이밍

```javascript
// 컴포넌트: PascalCase
const MovieCard = () => { };

// 함수: camelCase
const fetchMovies = () => { };

// 상수: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';

// 파일명
// - 컴포넌트: PascalCase.jsx
// - 유틸리티: camelCase.js
```

#### 2. 컴포넌트 구조

```javascript
// 1. Imports
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Component.module.css';

// 2. Component
const ComponentName = ({ prop1, prop2 }) => {
  // 2.1 Hooks
  const [state, setState] = useState(null);
  const navigate = useNavigate();

  // 2.2 Effects
  useEffect(() => {
    // ...
  }, []);

  // 2.3 Event Handlers
  const handleClick = () => {
    // ...
  };

  // 2.4 Render Helpers
  const renderContent = () => {
    // ...
  };

  // 2.5 JSX
  return (
    <div className={styles.container}>
      {/* ... */}
    </div>
  );
};

// 3. PropTypes (선택)
ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

// 4. Default Props (선택)
ComponentName.defaultProps = {
  prop2: 0,
};

// 5. Export
export default ComponentName;
```

#### 3. Hooks 규칙

```javascript
// ✅ 올바른 사용
const Component = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // ...
  }, [state]); // 의존성 배열 명시

  return <div />;
};

// ❌ 잘못된 사용
const Component = () => {
  if (condition) {
    const [state, setState] = useState(null); // ❌ 조건부 Hook
  }

  useEffect(() => {
    // ...
  }); // ❌ 의존성 배열 누락
};
```

### CSS

#### 1. CSS Modules 사용

```css
/* Component.module.css */

/* BEM 스타일 네이밍 */
.container {
  /* ... */
}

.container__item {
  /* ... */
}

.container--variant {
  /* ... */
}

/* 중첩 최소화 */
.button {
  /* ... */
}

.button:hover {
  /* ... */
}
```

#### 2. CSS Variables 활용

```css
/* 글로벌 변수 사용 */
.component {
  color: var(--color-text-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
}
```

### 주석

```javascript
/**
 * 영화 목록을 가져오는 함수
 * @param {string} category - 영화 카테고리
 * @param {number} page - 페이지 번호
 * @returns {Promise<Array>} 영화 목록
 */
const fetchMovies = async (category, page = 1) => {
  // API 호출
  const response = await api.get(`/movies/${category}`, { params: { page } });

  // 데이터 변환
  return response.data.results;
};
```

---

## 컴포넌트 가이드

### 컴포넌트 분류

#### 1. Presentational Components (UI 컴포넌트)

**특징**:
- UI에만 집중
- Props를 받아서 렌더링
- 상태 최소화

**예시**: Button, Input, Modal

```javascript
const Button = ({ children, variant, onClick }) => {
  return (
    <button className={`btn btn--${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};
```

#### 2. Container Components (비즈니스 로직)

**특징**:
- 데이터 페칭
- 상태 관리
- 비즈니스 로직

**예시**: MovieList, ReviewForm

```javascript
const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies().then(setMovies);
  }, []);

  return (
    <div>
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
```

### 새로운 컴포넌트 만들기

```bash
# 컴포넌트 파일 생성
src/components/YourComponent/
  ├── YourComponent.jsx
  └── YourComponent.module.css
```

```javascript
// YourComponent.jsx
import styles from './YourComponent.module.css';

const YourComponent = ({ prop1, prop2 }) => {
  return (
    <div className={styles.container}>
      {/* Your JSX */}
    </div>
  );
};

export default YourComponent;
```

---

## 상태 관리

### Context API 사용

#### 1. Context 생성

```javascript
// contexts/MyContext.jsx
import { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
};

export const MyProvider = ({ children }) => {
  const [state, setState] = useState(null);

  const value = {
    state,
    setState,
    // methods...
  };

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};
```

#### 2. Context 사용

```javascript
// Component.jsx
import { useMyContext } from '../contexts/MyContext';

const Component = () => {
  const { state, setState } = useMyContext();

  return <div>{state}</div>;
};
```

### LocalStorage 연동

```javascript
// 저장
const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// 불러오기
const loadFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};
```

---

## API 통합

### API 서비스 레이어

```javascript
// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// Request 인터셉터
api.interceptors.request.use(
  (config) => {
    // 토큰 추가 등
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 에러 처리
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
```

### API 호출 예시

```javascript
// services/movieService.js
import api from './api';

export const fetchMovies = async (category, page = 1) => {
  try {
    const response = await api.get(`/movies/${category}`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
```

---

## 스타일링

### CSS Variables 정의

```css
/* styles/variables.css */
:root {
  /* Colors */
  --color-primary: #e50914;
  --color-bg: #0a0a0a;

  /* Spacing */
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;

  /* Typography */
  --font-size-base: 1rem;
  --font-weight-normal: 400;
  --font-weight-bold: 700;
}
```

### 반응형 디자인

```css
/* Mobile First */
.container {
  padding: var(--spacing-sm);
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: var(--spacing-md);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: var(--spacing-lg);
    max-width: 1400px;
    margin: 0 auto;
  }
}
```

---

## 테스팅

### Unit Tests (향후 추가 예정)

```javascript
// __tests__/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/UI/Button';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## 성능 최적화

### 1. React.memo

```javascript
const MovieCard = React.memo(({ movie }) => {
  return <div>{movie.title}</div>;
});
```

### 2. useMemo

```javascript
const sortedMovies = useMemo(() => {
  return movies.sort((a, b) => b.rating - a.rating);
}, [movies]);
```

### 3. useCallback

```javascript
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);
```

### 4. Code Splitting

```javascript
import { lazy, Suspense } from 'react';

const MovieDetail = lazy(() => import('./pages/MovieDetail'));

const App = () => (
  <Suspense fallback={<Loading />}>
    <MovieDetail />
  </Suspense>
);
```

---

## 디버깅 팁

### React DevTools

- 컴포넌트 계층 구조 확인
- Props 및 State 검사
- 렌더링 성능 프로파일링

### Console Logs

```javascript
// 개발 환경에서만 로그
if (import.meta.env.DEV) {
  console.log('Debug:', data);
}
```

### Error Boundaries

```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

---

## 참고 자료

- [React 공식 문서](https://react.dev)
- [Vite 공식 문서](https://vitejs.dev)
- [React Router 문서](https://reactrouter.com)
- [MDN Web Docs](https://developer.mozilla.org)

---

**Happy Coding! 💻**
