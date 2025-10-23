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
 * Get comments for a specific review
 */
export const getCommentsByReviewId = async (reviewId) => {
  try {
    const response = await api.get(`/comments/review/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

/**
 * Create a new comment
 */
export const createComment = async (commentData) => {
  try {
    const response = await api.post('/comments', commentData);
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

/**
 * Update a comment
 */
export const updateComment = async (commentId, updatedData) => {
  try {
    const response = await api.put(`/comments/${commentId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

/**
 * Delete a comment
 */
export const deleteComment = async (commentId) => {
  try {
    await api.delete(`/comments/${commentId}`);
    return true;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};
