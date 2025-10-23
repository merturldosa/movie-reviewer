import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Get personalized recommendations for a user
 */
export const getRecommendations = async (userId) => {
  try {
    const response = await api.get(`/recommendations/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};

/**
 * Get similar movies based on a specific movie
 */
export const getSimilarMovies = async (movieId) => {
  try {
    const response = await api.get(`/recommendations/similar/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching similar movies:', error);
    throw error;
  }
};
