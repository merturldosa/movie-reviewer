import { Link } from 'react-router-dom';
import { getImageUrl } from '../../utils/helpers';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
  const posterUrl = getImageUrl(movie.poster_path);
  const title = movie.title || movie.name;

  return (
    <Link to={`/movie/${movie.id}`} className={styles.card}>
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
      </div>
    </Link>
  );
};

export default MovieCard;
