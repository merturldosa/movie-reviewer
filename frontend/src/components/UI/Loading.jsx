import styles from './Loading.module.css';

const Loading = ({ size = 'medium', fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className={styles.fullScreen}>
        <div className={`${styles.spinner} ${styles[size]}`}></div>
        <p className={styles.text}>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${styles[size]}`}></div>
    </div>
  );
};

export default Loading;
