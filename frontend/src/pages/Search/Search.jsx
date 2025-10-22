import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/tmdbApi';
import MovieCard from '../../components/Movie/MovieCard';
import Loading from '../../components/UI/Loading';
import styles from './Search.module.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (query) {
      performSearch(query, 1);
    }
  }, [query]);

  const performSearch = async (searchQuery, pageNum) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchMovies(searchQuery, pageNum);
      setMovies(pageNum === 1 ? data.results : [...movies, ...data.results]);
      setTotalPages(data.total_pages);
      setPage(pageNum);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (page < totalPages) {
      performSearch(query, page + 1);
    }
  };

  if (!query) {
    return (
      <div className={styles.empty}>
        <h2>검색어를 입력해주세요</h2>
      </div>
    );
  }

  if (loading && page === 1) {
    return <Loading fullScreen />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>검색 중 오류가 발생했습니다</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.search}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          "{query}" 검색 결과 ({movies.length}개)
        </h1>

        {movies.length === 0 ? (
          <div className={styles.noResults}>
            <p>검색 결과가 없습니다.</p>
            <p>다른 검색어로 시도해보세요.</p>
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {page < totalPages && (
              <div className={styles.loadMoreContainer}>
                <button
                  className={styles.loadMore}
                  onClick={loadMore}
                  disabled={loading}
                >
                  {loading ? '로딩 중...' : '더 보기'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
