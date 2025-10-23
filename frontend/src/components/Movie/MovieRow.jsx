import { useState, useEffect } from 'react';
import { fetchMoviesByCategory } from '../../services/tmdbApi';
import MovieCard from './MovieCard';
import Loading from '../UI/Loading';
import styles from './MovieRow.module.css';

const MovieRow = ({ title, endpoint, params = {} }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMovies();
  }, [endpoint]);

  const loadMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMoviesByCategory(endpoint, params);
      setMovies(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(`Error loading movies for ${title}:`, err);
      setError(err.message || '영화를 불러오는데 실패했습니다.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>영화를 불러오는데 실패했습니다.</p>
        <p style={{ fontSize: '0.9em', color: '#999' }}>카테고리: {title}</p>
        <p style={{ fontSize: '0.9em', color: '#999' }}>오류: {error}</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return null;
  }

  // Check if this is a TV category (Netflix Originals or any /tv endpoint)
  const isTVCategory = endpoint.includes('/tv');

  return (
    <div className={styles.row}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.scrollContainer}>
        <div className={styles.movieList}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} forceTVShow={isTVCategory} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
