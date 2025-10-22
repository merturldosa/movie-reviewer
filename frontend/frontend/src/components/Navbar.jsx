// src/components/Navbar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const PRIMARY_LOGO = "https://ifh.cc/g/454NHm.png"; // 네가 준 주소
const FALLBACK_LOGO = "/logo.png";                  // public/logo.png (없으면 넣어줘)

export default function Navbar() {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const [q, setQ] = useState("");

  function submit(e) {
    e.preventDefault();
    const s = q.trim();
    if (!s) return;
    nav(`/search?q=${encodeURIComponent(s)}`);
  }

  const item = (to, label) => (
    <Link
      to={to}
      className={`px-3 py-2 text-sm ${pathname === to ? "text-white" : "text-neutral-400 hover:text-white"}`}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-10 border-b border-neutral-900 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 py-4 flex items-center justify-between gap-4">
        {/* 좌측 로고 */}
        <Link to="/" className="flex items-center gap-2" aria-label="moviereviewer 홈">
          <img
            src={PRIMARY_LOGO}
            alt="moviereviewer"
            className="h-12 md:h-14 w-auto object-contain"
            referrerPolicy="no-referrer"               // 핫링크 차단 우회
            onError={(e) => {                          // 외부 로고 실패 시 local로 폴백
              e.currentTarget.onerror = null;          // 무한 루프 방지
              e.currentTarget.src = FALLBACK_LOGO;
            }}
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
        </Link>

        {/* 우측 메뉴 + 검색 */}
        <div className="flex items-center gap-3">
          <nav className="hidden sm:flex items-center">
            {item("/", "영화")}
            {item("/logs", "기록")}
          </nav>
          <form onSubmit={submit} className="flex items-center">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="영화 검색..."
              className="w-24 sm:w-40 md:w-56 rounded-lg bg-neutral-900 px-3 py-2 text-sm text-white
                         ring-1 ring-white/10 placeholder:text-neutral-500 focus:outline-none focus:ring-white/30"
            />
          </form>
        </div>
      </div>
    </header>
  );
}
