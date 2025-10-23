import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchMovieDetails, fetchTVDetails } from '../../services/tmdbApi';
import { useReviews } from '../../context/ReviewContext';
import { useUser } from '../../context/UserContext';
import {
  getImageUrl,
  formatDate,
  formatRuntime,
  getYouTubeEmbedUrl,
} from '../../utils/helpers';
import { IMAGE_SIZES } from '../../utils/constants';
import ReviewModal from '../../components/Review/ReviewModal';
import ReviewList from '../../components/Review/ReviewList';
import Button from '../../components/UI/Button';
import Loading from '../../components/UI/Loading';
import styles from './MovieDetail.module.css';

const MovieDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const isTVShow = location.pathname.includes('/tv/');
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [refreshReviews, setRefreshReviews] = useState(0); // Trigger for refresh

  const { getMovieReviews } = useReviews();
  const { user } = useUser();

  useEffect(() => {
    loadMovieDetails();
    loadReviews();
  }, [id, refreshReviews]); // Add refreshReviews as dependency

  const loadReviews = async () => {
    try {
      const movieReviews = await getMovieReviews(id);
      setReviews(Array.isArray(movieReviews) ? movieReviews : []);
    } catch (error) {
      console.error('Error loading reviews:', error);
      setReviews([]);
    }
  };

  const loadMovieDetails = async () => {
    try {
      setLoading(true);
      const data = isTVShow ? await fetchTVDetails(id) : await fetchMovieDetails(id);
      setMovie(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>{isTVShow ? 'TV 쇼' : '영화'} 정보를 불러올 수 없습니다</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!movie) {
    return <div className={styles.error}>{isTVShow ? 'TV 쇼를' : '영화를'} 찾을 수 없습니다.</div>;
  }

  // Handle both movie and TV show properties
  const title = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date;
  const runtime = movie.runtime || (movie.episode_run_time && movie.episode_run_time[0]);

  const backdropUrl = getImageUrl(
    movie.backdrop_path,
    IMAGE_SIZES.BACKDROP_ORIGINAL
  );
  const posterUrl = getImageUrl(movie.poster_path, IMAGE_SIZES.POSTER_LARGE);

  const trailer = movie.videos?.results?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return (
    <div className={styles.movieDetail}>
      {/* Hero Section */}
      <div
        className={styles.hero}
        style={{
          backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none',
        }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.posterContainer}>
            {posterUrl ? (
              <img src={posterUrl} alt={title} className={styles.poster} />
            ) : (
              <div className={styles.noPoster}>No Image</div>
            )}
          </div>

          <div className={styles.info}>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>{title}</h1>
              {isTVShow && <span className={styles.mediaBadge}>TV</span>}
            </div>
            {movie.tagline && <p className={styles.tagline}>{movie.tagline}</p>}

            <div className={styles.meta}>
              <span className={styles.rating}>
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
              <span>{formatDate(releaseDate)}</span>
              {runtime && <span>{formatRuntime(runtime)}</span>}
              {isTVShow && movie.number_of_seasons && (
                <span>{movie.number_of_seasons} 시즌</span>
              )}
            </div>

            <div className={styles.genres}>
              {Array.isArray(movie.genres) && movie.genres.map((genre) => (
                <span key={genre.id} className={styles.genre}>
                  {genre.name}
                </span>
              ))}
            </div>

            <p className={styles.overview}>{movie.overview}</p>

            <Button
              variant="primary"
              size="large"
              onClick={() => setIsReviewModalOpen(true)}
            >
              리뷰 작성하기
            </Button>
          </div>
        </div>
      </div>

      {/* Trailer Section */}
      {trailer && (
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>트레일러</h2>
            <div className={styles.videoContainer}>
              <iframe
                src={getYouTubeEmbedUrl(trailer.key)}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.video}
              ></iframe>
            </div>
          </div>
        </section>
      )}

      {/* Cast Section */}
      {Array.isArray(movie.credits?.cast) && movie.credits.cast.length > 0 && (
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>출연진</h2>
            <div className={styles.castList}>
              {movie.credits.cast.slice(0, 10).map((person) => (
                <div key={person.id} className={styles.castCard}>
                  {person.profile_path ? (
                    <img
                      src={getImageUrl(person.profile_path, IMAGE_SIZES.PROFILE)}
                      alt={person.name}
                      className={styles.castImage}
                    />
                  ) : (
                    <div className={styles.noCastImage}>No Image</div>
                  )}
                  <div className={styles.castInfo}>
                    <p className={styles.castName}>{person.name}</p>
                    <p className={styles.castCharacter}>{person.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.reviewHeader}>
            <h2 className={styles.sectionTitle}>
              리뷰 ({reviews.length})
            </h2>
          </div>
          <ReviewList movieId={id} refreshTrigger={refreshReviews} />
        </div>
      </section>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setRefreshReviews(prev => prev + 1); // Trigger refresh
        }}
        movieId={movie.id}
        movieTitle={title}
        moviePoster={posterUrl}
      />
    </div>
  );
};

export default MovieDetail;
