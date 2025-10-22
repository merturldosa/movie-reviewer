import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Get all reviews from backend API
 */
export const getAllReviews = async () => {
  try {
    const response = await api.get('/reviews');
    return response.data;
  } catch (error) {
    console.error('Error reading reviews:', error);
    throw error;
  }
};

/**
 * Get reviews for a specific movie
 */
export const getReviewsByMovieId = async (movieId) => {
  try {
    const response = await api.get(`/reviews/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    throw error;
  }
};

/**
 * Get a single review by ID
 */
export const getReviewById = async (reviewId) => {
  try {
    const response = await api.get(`/reviews/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching review:', error);
    throw error;
  }
};

/**
 * Create a new review
 */
export const createReview = async (reviewData) => {
  try {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

/**
 * Update an existing review
 */
export const updateReview = async (reviewId, updatedData) => {
  try {
    const response = await api.put(`/reviews/${reviewId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};

/**
 * Delete a review
 */
export const deleteReview = async (reviewId) => {
  try {
    await api.delete(`/reviews/${reviewId}`);
    return true;
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};

/**
 * Get reviews by user ID
 */
export const getReviewsByUserId = async (userId) => {
  try {
    const response = await api.get(`/reviews/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    throw error;
  }
};

/**
 * Check if user has reviewed a movie
 */
export const hasUserReviewedMovie = async (userId, movieId) => {
  try {
    const response = await api.get(`/reviews/check/${userId}/${movieId}`);
    return response.data.hasReviewed;
  } catch (error) {
    console.error('Error checking review:', error);
    throw error;
  }
};
