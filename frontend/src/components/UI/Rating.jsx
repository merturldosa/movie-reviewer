import { FaStar, FaRegStar } from 'react-icons/fa';
import styles from './Rating.module.css';

const Rating = ({
  value = 0,
  max = 5,
  onChange,
  readonly = false,
  size = 'medium',
}) => {
  const handleClick = (rating) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  const stars = [];
  for (let i = 1; i <= max; i++) {
    stars.push(
      <button
        key={i}
        type="button"
        className={`${styles.star} ${styles[size]} ${
          readonly ? styles.readonly : ''
        }`}
        onClick={() => handleClick(i)}
        disabled={readonly}
      >
        {i <= value ? (
          <FaStar className={styles.filled} />
        ) : (
          <FaRegStar className={styles.empty} />
        )}
      </button>
    );
  }

  return <div className={styles.rating}>{stars}</div>;
};

export default Rating;
