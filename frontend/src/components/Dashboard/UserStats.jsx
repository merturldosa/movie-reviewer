import { useUser } from '../../context/UserContext';
import { useReviews } from '../../context/ReviewContext';
import { calculateAverageRating } from '../../utils/helpers';
import styles from './UserStats.module.css';

const UserStats = () => {
  const { user } = useUser();
  const { getUserReviews } = useReviews();

  if (!user) return null;

  const userReviews = getUserReviews(user.id);
  const totalReviews = userReviews.length;
  const averageRating = calculateAverageRating(userReviews);

  // 최근 7일간 작성한 리뷰 수
  const recentReviews = userReviews.filter((review) => {
    const reviewDate = new Date(review.createdAt);
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return reviewDate > weekAgo;
  }).length;

  const stats = [
    {
      id: 'total',
      label: '작성한 리뷰',
      value: totalReviews,
      icon: '📝',
      suffix: '개',
    },
    {
      id: 'average',
      label: '평균 평점',
      value: averageRating,
      icon: '⭐',
      suffix: '',
    },
    {
      id: 'recent',
      label: '이번 주 리뷰',
      value: recentReviews,
      icon: '🔥',
      suffix: '개',
    },
  ];

  return (
    <div className={styles.userStats}>
      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.id} className={styles.statCard}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>{stat.label}</p>
              <p className={styles.statValue}>
                {stat.value}
                {stat.suffix && <span className={styles.statSuffix}>{stat.suffix}</span>}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStats;
