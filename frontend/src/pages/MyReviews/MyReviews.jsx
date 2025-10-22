import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useReviews } from '../../context/ReviewContext';
import ReviewCard from '../../components/Review/ReviewCard';
import { calculateAverageRating } from '../../utils/helpers';
import styles from './MyReviews.module.css';

const MyReviews = () => {
  const { user } = useUser();
  const { getUserReviews } = useReviews();
  const [sortBy, setSortBy] = useState('latest');

  const userReviews = getUserReviews(user.id);

  const sortedReviews = [...userReviews].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  const averageRating = calculateAverageRating(userReviews);

  return (
    <div className={styles.myReviews}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>내 리뷰</h1>
            <p className={styles.subtitle}>
              총 {userReviews.length}개의 리뷰 · 평균 평점 ⭐ {averageRating}
            </p>
          </div>

          {userReviews.length > 0 && (
            <div className={styles.sortContainer}>
              <label htmlFor="sort" className={styles.sortLabel}>
                정렬:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.sortSelect}
              >
                <option value="latest">최신순</option>
                <option value="oldest">오래된순</option>
                <option value="highest">높은 평점순</option>
                <option value="lowest">낮은 평점순</option>
              </select>
            </div>
          )}
        </div>

        {sortedReviews.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>작성한 리뷰가 없습니다</p>
            <p className={styles.emptyText}>
              영화를 보고 첫 번째 리뷰를 작성해보세요!
            </p>
            <Link to="/" className={styles.emptyLink}>
              영화 둘러보기
            </Link>
          </div>
        ) : (
          <div className={styles.reviewsGrid}>
            {sortedReviews.map((review) => (
              <div key={review.id} className={styles.reviewItem}>
                <Link
                  to={`/movie/${review.movieId}`}
                  className={styles.movieLink}
                >
                  {review.moviePoster && (
                    <img
                      src={review.moviePoster}
                      alt={review.movieTitle}
                      className={styles.moviePoster}
                    />
                  )}
                  <h3 className={styles.movieTitle}>{review.movieTitle}</h3>
                </Link>
                <ReviewCard
                  review={review}
                  movieTitle={review.movieTitle}
                  moviePoster={review.moviePoster}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
