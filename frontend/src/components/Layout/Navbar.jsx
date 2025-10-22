import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaFilm } from 'react-icons/fa';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <FaFilm className={styles.logoIcon} />
          <span>Movie Reviewer</span>
        </Link>

        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="영화를 검색하세요..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            <FaSearch />
          </button>
        </form>

        <div className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            홈
          </Link>
          <Link to="/my-reviews" className={styles.navLink}>
            내 리뷰
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
