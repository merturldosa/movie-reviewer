# 🔒 보안 정책 (Security Policy)

Movie Reviewer 프로젝트의 보안을 유지하기 위한 정책과 가이드라인입니다.

---

## 목차

1. [지원 버전](#지원-버전)
2. [보안 취약점 보고](#보안-취약점-보고)
3. [보안 모범 사례](#보안-모범-사례)
4. [알려진 보안 고려사항](#알려진-보안-고려사항)
5. [보안 업데이트](#보안-업데이트)

---

## 지원 버전

현재 보안 업데이트를 받는 버전:

| 버전 | 지원 여부 |
| ---- | --------- |
| 1.0.x | ✅ 지원됨 |
| < 1.0 | ❌ 지원 안 됨 |

---

## 보안 취약점 보고

### 보고 방법

보안 취약점을 발견하면 **공개 이슈로 보고하지 마세요**.

대신 다음 방법으로 비공개로 보고해주세요:

1. **이메일**: security@moviereviewer.com (가상 이메일)
2. **GitHub Security Advisory**: [Create Security Advisory](https://github.com/your-repo/movie-reviewer/security/advisories/new)

### 보고 시 포함할 정보

```markdown
**취약점 유형**
예: XSS, CSRF, SQL Injection 등

**영향 범위**
예: 사용자 데이터 유출, 계정 탈취 등

**재현 단계**
1. 단계 1
2. 단계 2
3. ...

**영향 받는 버전**
예: v1.0.0 ~ v1.0.5

**PoC (Proof of Concept)**
[코드나 스크린샷]

**제안 해결책**
[있는 경우]
```

### 응답 시간

- **초기 응답**: 48시간 이내
- **상세 분석**: 7일 이내
- **패치 배포**: 심각도에 따라 1-30일

### 보상 프로그램

현재 보상 프로그램은 운영하지 않지만, 기여자 명단에 이름을 올려드립니다.

---

## 보안 모범 사례

### 개발자를 위한 가이드라인

#### 1. API 키 관리

**✅ 올바른 방법**:

```javascript
// .env 파일에 저장
VITE_TMDB_API_KEY=your_api_key

// 코드에서 사용
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
```

**❌ 잘못된 방법**:

```javascript
// 하드코딩 (절대 금지!)
const apiKey = 'abc123def456'; // ❌

// 코드에 직접 포함
const url = `https://api.tmdb.org?api_key=abc123`; // ❌
```

**.gitignore에 추가**:

```gitignore
.env
.env.local
.env.production
```

#### 2. 입력값 검증

**사용자 입력을 항상 검증**:

```javascript
// ✅ 올바른 예시
const validateReview = (content) => {
  if (!content || typeof content !== 'string') {
    throw new Error('Invalid content');
  }

  if (content.length < 10 || content.length > 2000) {
    throw new Error('Content length must be between 10 and 2000');
  }

  // 위험한 문자 제거
  return content.trim();
};

// ❌ 잘못된 예시
const saveReview = (content) => {
  localStorage.setItem('review', content); // 검증 없음 ❌
};
```

#### 3. XSS 방지

React는 기본적으로 XSS를 방지하지만, `dangerouslySetInnerHTML`은 피하세요:

```javascript
// ✅ 올바른 예시
<div>{userContent}</div>

// ❌ 위험한 예시
<div dangerouslySetInnerHTML={{ __html: userContent }} /> // ❌
```

#### 4. HTTPS 사용

**프로덕션에서 항상 HTTPS 사용**:

```javascript
// ✅ 올바른 예시
const API_URL = 'https://api.example.com'; // HTTPS

// ❌ 잘못된 예시
const API_URL = 'http://api.example.com'; // HTTP ❌
```

#### 5. 의존성 보안

```bash
# 정기적으로 보안 취약점 체크
npm audit

# 자동 수정
npm audit fix

# 강제 수정 (주의)
npm audit fix --force
```

#### 6. 민감한 데이터 로깅 금지

```javascript
// ❌ 잘못된 예시
console.log('User data:', user); // 민감한 정보 로깅 ❌
console.log('API Key:', apiKey); // ❌

// ✅ 올바른 예시
if (import.meta.env.DEV) {
  console.log('Debug info:', { userId: user.id }); // 필요한 정보만
}
```

### 사용자를 위한 가이드라인

#### 1. 브라우저 보안

- 최신 버전의 브라우저 사용
- 알 수 없는 확장 프로그램 설치 금지
- 공용 컴퓨터에서 사용 후 로그아웃

#### 2. API 키 보호

- TMDB API 키를 다른 사람과 공유하지 마세요
- GitHub 등에 업로드하지 마세요
- 유출 시 즉시 재발급

#### 3. LocalStorage 주의사항

- 브라우저를 공유하는 경우 데이터가 노출될 수 있습니다
- 중요한 정보는 저장하지 마세요
- 정기적으로 데이터 정리

---

## 알려진 보안 고려사항

### 1. LocalStorage 사용

**위험**:
- XSS 공격 시 데이터 접근 가능
- 브라우저 공유 시 데이터 노출

**완화 방법**:
- XSS 방지 (React 기본 제공)
- 민감한 정보 저장 안 함
- 향후 백엔드 전환 계획

### 2. 클라이언트 사이드 API 키

**위험**:
- API 키가 클라이언트 코드에 노출됨
- 브라우저 개발자 도구로 확인 가능

**완화 방법**:
- TMDB 무료 플랜은 제한적 노출 허용
- Rate limiting으로 남용 방지
- 향후 백엔드 프록시 구현 계획

### 3. CORS

**현재**:
- TMDB API가 CORS 허용
- 클라이언트에서 직접 호출

**향후 계획**:
- 백엔드 프록시 구현
- API 키 서버에서 관리

---

## 보안 체크리스트

### 개발 시

- [ ] API 키를 .env에 저장했는가?
- [ ] .env를 .gitignore에 추가했는가?
- [ ] 사용자 입력을 검증하는가?
- [ ] XSS 방지 조치를 했는가?
- [ ] HTTPS를 사용하는가? (프로덕션)
- [ ] 민감한 정보를 로깅하지 않는가?
- [ ] 의존성 보안 체크를 했는가?

### 배포 시

- [ ] 환경 변수를 플랫폼에 설정했는가?
- [ ] HTTPS가 활성화되었는가?
- [ ] 불필요한 파일이 제외되었는가?
- [ ] 소스맵을 비활성화했는가? (선택)
- [ ] 보안 헤더를 설정했는가?

---

## 보안 헤더

### 권장 HTTP 보안 헤더

프로덕션 서버에 다음 헤더 설정:

```nginx
# Nginx 예시
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' data: https:; connect-src 'self' https:;" always;
```

### Vercel/Netlify

`vercel.json` 또는 `netlify.toml`에 추가:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## 보안 업데이트

### 알림 받기

보안 업데이트 알림을 받으려면:

1. GitHub에서 "Watch" → "Custom" → "Security alerts" 활성화
2. [GitHub Security Advisories](https://github.com/your-repo/movie-reviewer/security/advisories) 구독

### 업데이트 적용

보안 업데이트가 발표되면:

```bash
# 최신 버전으로 업데이트
git pull origin main
npm install
npm run build
```

---

## 책임 있는 공개

보안 취약점 발견 시:

1. **비공개로 보고** (공개 이슈 금지)
2. **패치 개발 기다림** (90일)
3. **패치 배포 후 공개** (크레딧 제공)

### 공개 타임라인

1. **Day 0**: 취약점 보고 접수
2. **Day 1-7**: 검증 및 분석
3. **Day 7-30**: 패치 개발
4. **Day 30**: 패치 배포
5. **Day 90**: 공개 (미해결 시에도)

---

## 연락처

보안 관련 문의:

- **이메일**: security@moviereviewer.com (가상)
- **GitHub**: [Security Advisories](https://github.com/your-repo/movie-reviewer/security/advisories)

---

## 참고 자료

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security Best Practices](https://react.dev/learn/security)
- [npm Security Best Practices](https://docs.npmjs.com/security)

---

**보안은 모두의 책임입니다. 의심스러운 활동을 발견하면 즉시 보고해주세요. 🔒**
