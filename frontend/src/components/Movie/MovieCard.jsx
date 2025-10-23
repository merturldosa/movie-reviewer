import { Link } from 'react-router-dom';
import { getImageUrl } from '../../utils/helpers';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
  const posterUrl = getImageUrl(movie.poster_path);
  const title = movie.title || movie.name;

  // Check if it's a TV show (has 'name' but no 'title', or media_type is 'tv')
  const isMovie = movie.title || movie.media_type === 'movie';
  const isTVShow = movie.media_type === 'tv' || (!movie.title && movie.name);

  const content = (
    <>
      {posterUrl ? (
        <img src={posterUrl} alt={title} className={styles.poster} loading="lazy" />
      ) : (
        <div className={styles.noImage}>
          <span>No Image</span>
        </div>
      )}
      <div className={styles.overlay}>
        <h4 className={styles.title}>{title}</h4>
        {movie.vote_average > 0 && (
          <div className={styles.rating}>
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
          </div>
        )}
        {isTVShow && (
          <div className={styles.tvBadge}>TV</div>
        )}
      </div>
    </>
  );

  // Only make movies clickable, not TV shows
  if (isTVShow) {
    return (
      <div className={`${styles.card} ${styles.disabled}`} title="TV 쇼는 현재 지원하지 않습니다">
        {content}
      </div>
    );
  }

  return (
    <Link to={`/movie/${movie.id}`} className={styles.card}>
      {content}
    </Link>
  );
};

export default MovieCard;
