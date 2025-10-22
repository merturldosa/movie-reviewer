import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Nav.css"; // (원한다면 분리 가능, 예시는 App.css에 포함)

export default function Nav() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/" className="logo">
          MovieReviewer
        </Link>

        <nav className="nav__right">
          <ul className="nav__tabs">
            <li>
              <NavLink to="/" end className={({ isActive }) => isActive ? "tab active" : "tab"}>
                영화
              </NavLink>
            </li>
            <li>
              <NavLink to="/record" className="tab" onClick={(e)=>e.preventDefault()}>
                기록
              </NavLink>
              {/* TODO: /record 라우트 만들면 위 onClick 제거하고 라우팅 연결 */}
            </li>
          </ul>

          <form className="nav__search" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="검색"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="검색어"
            />
          </form>
        </nav>
      </div>
    </header>
  );
}
