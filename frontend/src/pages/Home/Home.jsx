import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useReviews } from '../../context/ReviewContext';
import { fetchTrendingMovies } from '../../services/tmdbApi';
import { getImageUrl } from '../../utils/helpers';
import { IMAGE_SIZES } from '../../utils/constants';
import MovieRow from '../../components/Movie/MovieRow';
import ReviewCard from '../../components/Review/ReviewCard';
import UserStats from '../../components/Dashboard/UserStats';
import { MOVIE_CATEGORIES } from '../../utils/constants';
import { FaSearch } from 'react-icons/fa';
import styles from './Home.module.css';

const Home = () => {
  const { user } = useUser();
  const { getUserReviews } = useReviews();
  const navigate = useNavigate();
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // 사용자의 최근 리뷰 3개 가져오기
  const userReviews = user
    ? getUserReviews(user.id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3)
    : [];

  // 추천 영화 가져오기
  useEffect(() => {
    const loadFeaturedMovie = async () => {
      try {
        const movies = await fetchTrendingMovies();
        if (movies && movies.length > 0) {
          // 랜덤하게 하나 선택
          const randomMovie = movies[Math.floor(Math.random() * Math.min(5, movies.length))];
          setFeaturedMovie(randomMovie);
        }
      } catch (error) {
        console.error('Error loading featured movie:', error);
      }
    };
    loadFeaturedMovie();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const backdropUrl = featuredMovie
    ? getImageUrl(featuredMovie.backdrop_path, IMAGE_SIZES.BACKDROP_ORIGINAL)
    : null;

  return (
    <div className={styles.home}>
      <div
        className={styles.hero}
        style={{
          backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none',
        }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>영화 리뷰어</h1>
          <p className={styles.heroSubtitle}>
            당신의 영화 경험을 기록하고 공유하세요
          </p>

          {/* 검색 바 */}
          <form className={styles.searchForm} onSubmit={handleSearch}>
            <div className={styles.searchInputWrapper}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="영화 제목을 검색하세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <button type="submit" className={styles.searchButton}>
              검색
            </button>
          </form>

          {/* 추천 영화 정보 */}
          {featuredMovie && (
            <div className={styles.featuredInfo}>
              <Link
                to={`/movie/${featuredMovie.id}`}
                className={styles.featuredLink}
              >
                <span className={styles.featuredBadge}>오늘의 추천</span>
                <h2 className={styles.featuredTitle}>
                  {featuredMovie.title || featuredMovie.name}
                </h2>
                <p className={styles.featuredOverview}>
                  {featuredMovie.overview?.slice(0, 150)}
                  {featuredMovie.overview?.length > 150 ? '...' : ''}
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* 통계 대시보드 */}
      <UserStats />

      {/* 내 최근 리뷰 섹션 */}
      <div className={styles.myReviewsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>내가 작성한 리뷰</h2>
          {userReviews.length > 0 && (
            <Link to="/my-reviews" className={styles.viewAllLink}>
              모든 리뷰 보기 →
            </Link>
          )}
        </div>

        {userReviews.length === 0 ? (
          <div className={styles.emptyReviews}>
            <p className={styles.emptyText}>아직 작성한 리뷰가 없습니다</p>
            <p className={styles.emptySubtext}>
              영화를 보고 첫 번째 리뷰를 작성해보세요!
            </p>
          </div>
        ) : (
          <div className={styles.reviewsGrid}>
            {userReviews.map((review) => (
              <div key={review.id} className={styles.reviewCardWrapper}>
                <Link
                  to={`/movie/${review.movieId}`}
                  className={styles.reviewMovieLink}
                >
                  {review.moviePoster && (
                    <img
                      src={review.moviePoster}
                      alt={review.movieTitle}
                      className={styles.reviewMoviePoster}
                    />
                  )}
                  <h3 className={styles.reviewMovieTitle}>{review.movieTitle}</h3>
                </Link>
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.categories}>
        {MOVIE_CATEGORIES.map((category) => (
          <MovieRow
            key={category.id}
            title={category.title}
            endpoint={category.endpoint}
            params={category.params}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
