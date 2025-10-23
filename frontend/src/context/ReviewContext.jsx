import { createContext, useContext, useState, useEffect } from 'react';
import {
  getAllReviews,
  getReviewsByMovieId,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getReviewsByUserId,
} from '../services/reviewService';

const ReviewContext = createContext();

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within ReviewProvider');
  }
  return context;
};

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const allReviews = await getAllReviews();
      setReviews(allReviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
      setReviews([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const getMovieReviews = async (movieId) => {
    return await getReviewsByMovieId(movieId);
  };

  const getUserReviews = async (userId) => {
    return await getReviewsByUserId(userId);
  };

  const getSingleReview = async (reviewId) => {
    return await getReviewById(reviewId);
  };

  const addReview = async (reviewData) => {
    try {
      setLoading(true);
      const newReview = await createReview(reviewData);
      setReviews([...reviews, newReview]);
      return newReview;
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const editReview = async (reviewId, updatedData) => {
    try {
      setLoading(true);
      const updated = await updateReview(reviewId, updatedData);
      setReviews(reviews.map(r => (r.id === reviewId ? updated : r)));
      return updated;
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeReview = async (reviewId) => {
    try {
      setLoading(true);
      await deleteReview(reviewId);
      setReviews(reviews.filter(r => r.id !== reviewId));
      return true;
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    reviews,
    loading,
    getMovieReviews,
    getUserReviews,
    getSingleReview,
    addReview,
    editReview,
    removeReview,
    refreshReviews: loadReviews,
  };

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
};
