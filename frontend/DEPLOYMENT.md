# 🚀 배포 가이드 (Deployment Guide)

이 문서는 Movie Reviewer 애플리케이션을 다양한 플랫폼에 배포하는 방법을 설명합니다.

---

## 목차

1. [배포 전 준비](#배포-전-준비)
2. [Vercel 배포](#vercel-배포-추천)
3. [Netlify 배포](#netlify-배포)
4. [GitHub Pages 배포](#github-pages-배포)
5. [커스텀 서버 배포](#커스텀-서버-배포)
6. [환경 변수 설정](#환경-변수-설정)
7. [배포 후 확인사항](#배포-후-확인사항)

---

## 배포 전 준비

### 1. 프로덕션 빌드 테스트

로컬에서 프로덕션 빌드가 정상 작동하는지 확인:

```bash
# 빌드
npm run build

# 프리뷰
npm run preview
```

브라우저에서 `http://localhost:4173` 접속하여 테스트

### 2. 환경 변수 확인

`.env` 파일에 TMDB API 키가 설정되어 있는지 확인:

```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/
```

⚠️ **중요**: `.env` 파일은 Git에 커밋하지 마세요! (`.gitignore`에 포함되어 있어야 함)

### 3. Git 저장소 준비

GitHub에 코드를 푸시:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/chaehyeon107/MovieReviewer.git
git push -u origin main
```
git remote set-url origin https://github.com/merturldosa/movie-reviewer.git

---

## Vercel 배포 (추천) ⭐

Vercel은 Vite 프로젝트 배포에 최적화되어 있으며 가장 쉽고 빠릅니다.

### 방법 1: Vercel CLI

```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 방법 2: Vercel 웹사이트

1. **Vercel 계정 생성**
   - https://vercel.com 방문
   - GitHub 계정으로 로그인

2. **새 프로젝트 생성**
   - "New Project" 클릭
   - GitHub 저장소 연결
   - `movie-reviewer` 저장소 선택

3. **프로젝트 설정**
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **환경 변수 설정**
   - "Environment Variables" 섹션에서 추가:
   ```
   VITE_TMDB_API_KEY = your_api_key_here
   VITE_TMDB_BASE_URL = https://api.themoviedb.org/3
   VITE_TMDB_IMAGE_BASE_URL = https://image.tmdb.org/t/p/
   ```

5. **배포**
   - "Deploy" 버튼 클릭
   - 몇 분 후 배포 완료!

### 자동 배포 설정

Vercel은 자동으로 GitHub와 연동되어 있어:
- `main` 브랜치에 푸시하면 자동으로 프로덕션 배포
- PR 생성 시 자동으로 프리뷰 배포

### 커스텀 도메인 설정

1. Vercel 대시보드에서 프로젝트 선택
2. "Settings" → "Domains"
3. 도메인 입력 및 DNS 설정

---

## Netlify 배포

### 방법 1: Netlify CLI

```bash
# Netlify CLI 설치
npm install -g netlify-cli

# 로그인
netlify login

# 초기화 및 배포
netlify init

# 수동 배포
netlify deploy

# 프로덕션 배포
netlify deploy --prod
```

### 방법 2: Netlify 웹사이트

1. **Netlify 계정 생성**
   - https://netlify.com 방문
   - GitHub 계정으로 로그인

2. **새 사이트 생성**
   - "New site from Git" 클릭
   - GitHub 연결 및 저장소 선택

3. **빌드 설정**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

4. **환경 변수 설정**
   - "Site settings" → "Build & deploy" → "Environment"
   - 환경 변수 추가:
   ```
   VITE_TMDB_API_KEY
   VITE_TMDB_BASE_URL
   VITE_TMDB_IMAGE_BASE_URL
   ```

5. **배포**
   - "Deploy site" 클릭

### netlify.toml 설정 (선택사항)

프로젝트 루트에 `netlify.toml` 생성:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## GitHub Pages 배포

### 1. GitHub Actions를 사용한 자동 배포

`.github/workflows/deploy.yml` 생성:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm ci

    - name: Build
      run: npm run build
      env:
        VITE_TMDB_API_KEY: ${{ secrets.VITE_TMDB_API_KEY }}
        VITE_TMDB_BASE_URL: ${{ secrets.VITE_TMDB_BASE_URL }}
        VITE_TMDB_IMAGE_BASE_URL: ${{ secrets.VITE_TMDB_IMAGE_BASE_URL }}

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### 2. vite.config.js 수정

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/movie-reviewer/', // 저장소 이름으로 변경
})
```

### 3. GitHub Secrets 설정

1. GitHub 저장소 → Settings → Secrets and variables → Actions
2. "New repository secret" 클릭
3. 환경 변수 추가:
   - `VITE_TMDB_API_KEY`
   - `VITE_TMDB_BASE_URL`
   - `VITE_TMDB_IMAGE_BASE_URL`

### 4. GitHub Pages 활성화

1. Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` / `root`
4. Save

---

## 커스텀 서버 배포

### Nginx 설정

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/movie-reviewer/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip 압축
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # 캐싱 설정
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Apache 설정

`.htaccess` 파일 생성:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Docker 배포

`Dockerfile` 생성:

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_TMDB_API_KEY
ARG VITE_TMDB_BASE_URL
ARG VITE_TMDB_IMAGE_BASE_URL
ENV VITE_TMDB_API_KEY=$VITE_TMDB_API_KEY
ENV VITE_TMDB_BASE_URL=$VITE_TMDB_BASE_URL
ENV VITE_TMDB_IMAGE_BASE_URL=$VITE_TMDB_IMAGE_BASE_URL
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

`docker-compose.yml`:

```yaml
version: '3.8'

services:
  movie-reviewer:
    build:
      context: .
      args:
        VITE_TMDB_API_KEY: ${VITE_TMDB_API_KEY}
        VITE_TMDB_BASE_URL: ${VITE_TMDB_BASE_URL}
        VITE_TMDB_IMAGE_BASE_URL: ${VITE_TMDB_IMAGE_BASE_URL}
    ports:
      - "80:80"
    restart: unless-stopped
```

빌드 및 실행:

```bash
docker-compose up -d
```

---

## 환경 변수 설정

### 프로덕션 환경 변수

각 플랫폼에서 다음 환경 변수를 설정하세요:

| 변수명 | 값 | 설명 |
|--------|-----|------|
| `VITE_TMDB_API_KEY` | your_api_key | TMDB API 키 |
| `VITE_TMDB_BASE_URL` | https://api.themoviedb.org/3 | TMDB API 베이스 URL |
| `VITE_TMDB_IMAGE_BASE_URL` | https://image.tmdb.org/t/p/ | TMDB 이미지 베이스 URL |

### 환경별 설정

개발/스테이징/프로덕션 환경별로 다른 설정이 필요한 경우:

`.env.development`:
```env
VITE_TMDB_API_KEY=dev_api_key
```

`.env.production`:
```env
VITE_TMDB_API_KEY=prod_api_key
```

---

## 배포 후 확인사항

### ✅ 체크리스트

- [ ] 모든 페이지가 정상 작동하는가?
- [ ] 영화 목록이 정상적으로 로드되는가?
- [ ] 검색 기능이 작동하는가?
- [ ] 리뷰 작성/수정/삭제가 정상 작동하는가?
- [ ] 모바일에서 정상 작동하는가?
- [ ] HTTPS가 적용되었는가?
- [ ] 커스텀 도메인이 정상 작동하는가? (설정한 경우)
- [ ] 성능이 만족스러운가? (Lighthouse 점수 확인)

### 성능 최적화

#### 1. 이미지 최적화

이미지 형식을 WebP로 변환하고 lazy loading 사용

#### 2. 코드 스플리팅

React.lazy를 사용한 코드 스플리팅:

```javascript
const MovieDetail = lazy(() => import('./pages/MovieDetail/MovieDetail'));
```

#### 3. CDN 설정

정적 파일을 CDN을 통해 제공

#### 4. Gzip/Brotli 압축

서버에서 압축 활성화

### 모니터링

#### Google Analytics 추가

`index.html`에 추가:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### Sentry 에러 추적

```bash
npm install @sentry/react
```

---

## 트러블슈팅

### 404 에러 발생 시

SPA이므로 모든 요청을 `index.html`로 리다이렉트해야 합니다.

**Vercel/Netlify**: 자동 처리됨

**Nginx**:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### 환경 변수가 반영되지 않을 때

1. 환경 변수 이름이 `VITE_`로 시작하는지 확인
2. 빌드를 다시 실행
3. 브라우저 캐시 클리어

### CORS 에러 발생 시

TMDB API는 CORS를 허용하므로, 다른 API를 사용하는 경우 프록시 설정 필요

---

## 참고 자료

- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html)
- [Vercel 문서](https://vercel.com/docs)
- [Netlify 문서](https://docs.netlify.com/)
- [GitHub Pages 문서](https://docs.github.com/en/pages)

---

## 배포 플랫폼 비교

| 특징 | Vercel | Netlify | GitHub Pages |
|------|--------|---------|--------------|
| 난이도 | ⭐ 쉬움 | ⭐ 쉬움 | ⭐⭐ 보통 |
| 속도 | 매우 빠름 | 빠름 | 보통 |
| 무료 플랜 | ✅ 충분 | ✅ 충분 | ✅ 무제한 |
| 자동 배포 | ✅ | ✅ | ✅ (Actions) |
| 커스텀 도메인 | ✅ | ✅ | ✅ |
| HTTPS | ✅ 자동 | ✅ 자동 | ✅ 자동 |
| 환경 변수 | ✅ | ✅ | ✅ (Secrets) |
| 추천도 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

**추천**: Vite 프로젝트는 Vercel 사용을 권장합니다.

---

**배포 성공을 기원합니다! 🚀**
