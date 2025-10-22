import { useReviews } from '../../context/ReviewContext';
import ReviewCard from './ReviewCard';
import styles from './ReviewList.module.css';

const ReviewList = ({ movieId }) => {
  const { getMovieReviews } = useReviews();
  const reviews = getMovieReviews(movieId);

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
