import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { useReviews } from '../../context/ReviewContext';
import { validateReviewForm } from '../../utils/helpers';
import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Textarea from '../UI/Textarea';
import Rating from '../UI/Rating';
import Button from '../UI/Button';
import styles from './ReviewModal.module.css';

const ReviewModal = ({
  isOpen,
  onClose,
  movieId,
  movieTitle,
  moviePoster,
  reviewToEdit = null,
}) => {
  const { user } = useUser();
  const { addReview, editReview } = useReviews();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    rating: 0,
    watchedDate: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (reviewToEdit) {
      setFormData({
        title: reviewToEdit.title,
        content: reviewToEdit.content,
        rating: reviewToEdit.rating,
        watchedDate: reviewToEdit.watchedDate?.split('T')[0] || '',
      });
    } else {
      resetForm();
    }
  }, [reviewToEdit, isOpen]);

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      rating: 0,
      watchedDate: new Date().toISOString().split('T')[0],
    });
    setErrors({});
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateReviewForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      setSubmitting(true);

      const reviewData = {
        ...formData,
        movieId: Number(movieId),
        movieTitle,
        moviePoster,
        userId: user.id,
        userName: user.userName,
        userAvatar: user.avatar,
      };

      if (reviewToEdit) {
        await editReview(reviewToEdit.id, reviewData);
      } else {
        await addReview(reviewData);
      }

      resetForm();
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('리뷰 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={reviewToEdit ? '리뷰 수정' : '리뷰 작성'}
      size="large"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.movieInfo}>
          {moviePoster && (
            <img src={moviePoster} alt={movieTitle} className={styles.poster} />
          )}
          <h3 className={styles.movieTitle}>{movieTitle}</h3>
        </div>

        <div className={styles.ratingSection}>
          <label className={styles.label}>
            평점 <span className={styles.required}>*</span>
          </label>
          <Rating
            value={formData.rating}
            onChange={(value) => handleChange('rating', value)}
            size="large"
          />
          {errors.rating && (
            <span className={styles.error}>{errors.rating}</span>
          )}
        </div>

        <Input
          label="제목"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="리뷰 제목을 입력하세요"
          error={errors.title}
          required
        />

        <Textarea
          label="내용"
          value={formData.content}
          onChange={(e) => handleChange('content', e.target.value)}
          placeholder="영화에 대한 리뷰를 작성해주세요 (최소 10자)"
          rows={8}
          maxLength={2000}
          error={errors.content}
          required
        />

        <Input
          label="시청 날짜"
          type="date"
          value={formData.watchedDate}
          onChange={(e) => handleChange('watchedDate', e.target.value)}
        />

        <div className={styles.actions}>
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={submitting}
          >
            취소
          </Button>
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting
              ? '저장 중...'
              : reviewToEdit
              ? '수정하기'
              : '등록하기'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ReviewModal;
