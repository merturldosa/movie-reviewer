import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMulti } from '../../services/tmdbApi';
import MovieCard from '../../components/Movie/MovieCard';
import Loading from '../../components/UI/Loading';
import styles from './Search.module.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const [results, setResults] = useState([]);
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
      const data = await searchMulti(searchQuery, pageNum);
      // Filter to only include movies and TV shows
      const filteredResults = data.results.filter(
        item => item.media_type === 'movie' || item.media_type === 'tv'
      );
      setResults(pageNum === 1 ? filteredResults : [...results, ...filteredResults]);
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
          "{query}" 검색 결과 ({results.length}개)
        </h1>

        {results.length === 0 ? (
          <div className={styles.noResults}>
            <p>검색 결과가 없습니다.</p>
            <p>다른 검색어로 시도해보세요.</p>
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {results.map((item) => (
                <MovieCard key={`${item.media_type}-${item.id}`} movie={item} />
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
