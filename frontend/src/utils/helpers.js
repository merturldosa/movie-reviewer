import { TMDB_IMAGE_BASE_URL, IMAGE_SIZES, GENRE_MAP } from './constants';

/**
 * Get full image URL from TMDB path
 */
export const getImageUrl = (path, size = IMAGE_SIZES.POSTER_MEDIUM) => {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}${size}${path}`;
};

/**
 * Format date to readable string
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format date to short format
 */
export const formatDateShort = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

/**
 * Format runtime to hours and minutes
 */
export const formatRuntime = (minutes) => {
  if (!minutes) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

/**
 * Get genre names from genre IDs
 */
export const getGenreNames = (genreIds) => {
  if (!genreIds || genreIds.length === 0) return [];
  return genreIds.map(id => GENRE_MAP[id] || 'Unknown').filter(Boolean);
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text, maxLength = 200) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Format rating to 1 decimal place
 */
export const formatRating = (rating) => {
  if (!rating) return 'N/A';
  return Number(rating).toFixed(1);
};

/**
 * Calculate average rating
 */
export const calculateAverageRating = (reviews) => {
  if (!reviews || !Array.isArray(reviews) || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
  return (sum / reviews.length).toFixed(1);
};

/**
 * Generate unique ID
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get YouTube embed URL
 */
export const getYouTubeEmbedUrl = (key) => {
  if (!key) return null;
  return `https://www.youtube.com/embed/${key}`;
};

/**
 * Debounce function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Format time ago
 */
export const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  const intervals = {
    년: 31536000,
    개월: 2592000,
    주: 604800,
    일: 86400,
    시간: 3600,
    분: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval}${unit} 전`;
    }
  }

  return '방금 전';
};

/**
 * Validate review form
 */
export const validateReviewForm = ({ title, content, rating }) => {
  const errors = {};

  if (!title || title.trim().length < 2) {
    errors.title = '제목은 최소 2자 이상이어야 합니다.';
  } else if (title.length > 100) {
    errors.title = '제목은 최대 100자까지 입력 가능합니다.';
  }

  if (!content || content.trim().length < 10) {
    errors.content = '내용은 최소 10자 이상이어야 합니다.';
  } else if (content.length > 2000) {
    errors.content = '내용은 최대 2000자까지 입력 가능합니다.';
  }

  if (!rating || rating < 1 || rating > 5) {
    errors.rating = '평점을 선택해주세요.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Handle image upload
 */
export const handleImageUpload = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Check if image is valid
 */
export const isValidImage = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'JPG, PNG, WEBP 형식만 업로드 가능합니다.' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: '파일 크기는 5MB 이하여야 합니다.' };
  }

  return { valid: true };
};
