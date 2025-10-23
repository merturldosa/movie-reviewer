import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { getRecommendations } from '../../services/recommendationService';
import { getImageUrl } from '../../utils/helpers';
import Loading from '../UI/Loading';
import styles from './Recommendations.module.css';

const Recommendations = () => {
  const { user } = useUser();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user && user.id) {
      loadRecommendations();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      const data = await getRecommendations(user.id);
      setRecommendations(data.recommendations || []);
      setMessage(data.message);
    } catch (error) {
      console.error('Error loading recommendations:', error);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  if (!user || !user.id) {
    return (
      <section className={styles.recommendations}>
        <div className={styles.container}>
          <h2 className={styles.title}>추천 영화</h2>
          <div className={styles.loginPrompt}>
            로그인하고 리뷰를 작성하면 맞춤 추천 영화를 받을 수 있습니다!
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className={styles.recommendations}>
        <div className={styles.container}>
          <h2 className={styles.title}>추천 영화</h2>
          <Loading />
        </div>
      </section>
    );
  }

  if (recommendations.length === 0) {
    return (
      <section className={styles.recommendations}>
        <div className={styles.container}>
          <h2 className={styles.title}>추천 영화</h2>
          <div className={styles.emptyState}>
            <p>{message || '아직 추천할 영화가 없습니다.'}</p>
            <p>영화를 리뷰하면 맞춤 추천을 받을 수 있습니다!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.recommendations}>
      <div className={styles.container}>
        <h2 className={styles.title}>당신을 위한 추천 영화</h2>
        <div className={styles.grid}>
          {recommendations.map((rec) => (
            <Link
              key={rec.movieId}
              to={`/movie/${rec.movieId}`}
              className={styles.card}
            >
              <div className={styles.posterContainer}>
                {rec.moviePoster ? (
                  <img
                    src={getImageUrl(rec.moviePoster)}
                    alt={rec.movieTitle}
                    className={styles.poster}
                  />
                ) : (
                  <div className={styles.noPoster}>No Image</div>
                )}
                <div className={styles.overlay}>
                  <div className={styles.rating}>
                    <span>⭐ {rec.avgRating}</span>
                    <span className={styles.reviewCount}>
                      {rec.reviewCount} 리뷰
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.info}>
                <h3 className={styles.movieTitle}>{rec.movieTitle}</h3>
                <p className={styles.reason}>{rec.reason}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommendations;
