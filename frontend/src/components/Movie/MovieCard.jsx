import { Link } from 'react-router-dom';
import { getImageUrl } from '../../utils/helpers';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie, forceTVShow = false }) => {
  const posterUrl = getImageUrl(movie.poster_path);
  const title = movie.title || movie.name;

  // Check if it's a TV show
  // Priority: forceTVShow prop > media_type > title/name detection
  const isTVShow = forceTVShow || movie.media_type === 'tv' || (!movie.title && movie.name);

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

  // Determine the link path based on media type
  const linkPath = isTVShow ? `/tv/${movie.id}` : `/movie/${movie.id}`;

  return (
    <Link to={linkPath} className={styles.card}>
      {content}
    </Link>
  );
};

export default MovieCard;
