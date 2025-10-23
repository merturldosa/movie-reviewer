import { useState, useEffect } from 'react';
import { useReviews } from '../../context/ReviewContext';
import ReviewCard from './ReviewCard';
import styles from './ReviewList.module.css';

const ReviewList = ({ movieId, refreshTrigger = 0 }) => {
  const { getMovieReviews } = useReviews();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, [movieId, refreshTrigger]); // Add refreshTrigger as dependency

  const loadReviews = async () => {
    try {
      setLoading(true);
      const movieReviews = await getMovieReviews(movieId);
      setReviews(Array.isArray(movieReviews) ? movieReviews : []);
    } catch (error) {
      console.error('Error loading reviews:', error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.empty}>리뷰를 불러오는 중...</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className={styles.empty}>
        <p>아직 작성된 리뷰가 없습니다.</p>
        <p>첫 번째 리뷰를 작성해보세요!</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
