import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useReviews } from '../../context/ReviewContext';
import { formatDateShort, timeAgo } from '../../utils/helpers';
import Rating from '../UI/Rating';
import Button from '../UI/Button';
import ReviewModal from './ReviewModal';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from './ReviewCard.module.css';

const ReviewCard = ({ review, movieTitle, moviePoster }) => {
  const { user } = useUser();
  const { removeReview } = useReviews();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const isOwner = user && user.id === review.userId;
  const shouldTruncate = review.content.length > 300;

  const handleDelete = async () => {
    if (window.confirm('정말 이 리뷰를 삭제하시겠습니까?')) {
      try {
        await removeReview(review.id);
      } catch (error) {
        console.error('Error deleting review:', error);
        alert('리뷰 삭제에 실패했습니다.');
      }
    }
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <img
              src={review.userAvatar}
              alt={review.userName}
              className={styles.avatar}
            />
            <div>
              <p className={styles.userName}>{review.userName}</p>
              <p className={styles.date}>{timeAgo(review.createdAt)}</p>
            </div>
          </div>

          {isOwner && (
            <div className={styles.actions}>
              <button
                className={styles.actionButton}
                onClick={() => setIsEditModalOpen(true)}
                aria-label="Edit review"
              >
                <FaEdit />
              </button>
              <button
                className={styles.actionButton}
                onClick={handleDelete}
                aria-label="Delete review"
              >
                <FaTrash />
              </button>
            </div>
          )}
        </div>

        <div className={styles.rating}>
          <Rating value={review.rating} readonly size="small" />
        </div>

        <h3 className={styles.title}>{review.title}</h3>

        <p className={styles.content}>
          {isExpanded || !shouldTruncate
            ? review.content
            : `${review.content.substring(0, 300)}...`}
        </p>

        {shouldTruncate && (
          <button
            className={styles.toggleButton}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '접기' : '더보기'}
          </button>
        )}

        {review.watchedDate && (
          <p className={styles.watchedDate}>
            시청일: {formatDateShort(review.watchedDate)}
          </p>
        )}

        {review.updatedAt !== review.createdAt && (
          <p className={styles.edited}>수정됨</p>
        )}
      </div>

      <ReviewModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        movieId={review.movieId}
        movieTitle={movieTitle || review.movieTitle}
        moviePoster={moviePoster || review.moviePoster}
        reviewToEdit={review}
      />
    </>
  );
};

export default ReviewCard;
