# Keep-Alive 설정 가이드

Render 무료 플랜은 15분 동안 요청이 없으면 서버가 sleep 모드로 전환됩니다. 이를 방지하기 위한 두 가지 방법을 제공합니다.

## ✅ 방법 1: 자동 Keep-Alive (이미 구현됨)

프론트엔드에서 자동으로 10분마다 백엔드에 ping을 보냅니다.

**위치**: `frontend/src/utils/keepAlive.js`

**동작 방식**:
- 프로덕션 모드에서만 자동 실행
- 10분마다 `/api/health` 엔드포인트에 요청
- 콘솔에 ping 상태 로그 출력

**장점**:
- ✅ 자동으로 작동
- ✅ 추가 설정 불필요
- ✅ 무료

**단점**:
- ⚠️ 사용자가 사이트를 열어둬야 함
- ⚠️ 브라우저를 닫으면 작동 안 함

---

## ✅ 방법 2: 외부 Cron Job 서비스 (추천)

24/7 백엔드를 깨어있게 유지하려면 외부 Cron 서비스를 사용하세요.

### 🔧 UptimeRobot 사용 (무료, 추천)

**1단계: 계정 생성**
- https://uptimerobot.com 방문
- 무료 회원가입

**2단계: 새 모니터 추가**
- Dashboard → **Add New Monitor** 클릭
- **Monitor Type**: HTTP(s)
- **Friendly Name**: Movie Reviewer API
- **URL**: `https://movie-reviewer-api-2dte.onrender.com/api/health`
- **Monitoring Interval**: 5 minutes (무료 플랜)

**3단계: 저장**
- **Create Monitor** 클릭

**결과**: 5분마다 자동으로 백엔드에 요청을 보내 sleep 방지!

### 🔧 Cron-Job.org 사용 (무료, 대안)

**1단계: 계정 생성**
- https://cron-job.org 방문
- 무료 회원가입

**2단계: Cron Job 생성**
- **Create cronjob** 클릭
- **Title**: Keep Movie Reviewer API Alive
- **URL**: `https://movie-reviewer-api-2dte.onrender.com/api/health`
- **Schedule**: Every 10 minutes
  - Minute: `*/10` (매 10분)
  - Hour: `*`
  - Day: `*`
  - Month: `*`
  - Weekday: `*`

**3단계: 저장**
- **Create** 클릭

**결과**: 10분마다 자동으로 백엔드에 요청!

---

## 📊 비교표

| 방법 | 비용 | 신뢰성 | 설정 난이도 |
|------|------|--------|------------|
| 자동 Keep-Alive | 무료 | 중간 (사용자 의존) | ✅ 완료됨 |
| UptimeRobot | 무료 | 높음 (24/7) | 쉬움 (5분) |
| Cron-Job.org | 무료 | 높음 (24/7) | 쉬움 (5분) |

---

## 🎯 권장 사항

**최상의 조합**: 자동 Keep-Alive (이미 있음) + UptimeRobot

- 프론트엔드의 자동 Keep-Alive가 기본으로 작동
- UptimeRobot이 백업으로 24/7 모니터링
- 완전한 sleep 방지 보장!

---

## 🧪 테스트 방법

1. Render 대시보드에서 서비스 로그 확인
2. 15분 이상 기다린 후 프론트엔드 접속
3. 첫 로딩이 빠르면 (sleep 안 됨) → 성공! ✅

---

## 📝 Keep-Alive 로그 확인

프론트엔드 콘솔 (F12):
```
🔄 Keep-alive service started - pinging backend every 10 minutes
✅ Backend ping successful: Movie Reviewer API is running
```

백엔드 Render 로그:
```
GET /api/health 200 - 5.123 ms
```

---

작성일: 2025-10-23
