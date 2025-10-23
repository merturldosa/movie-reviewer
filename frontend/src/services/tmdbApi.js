import axios from 'axios';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../utils/constants';

// Create axios instance
const api = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'ko-KR',
  },
});

/**
 * Fetch movies by category
 */
export const fetchMoviesByCategory = async (endpoint, params = {}) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data.results || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

/**
 * Fetch movie details
 */
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'credits,videos',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

/**
 * Search movies
 */
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

/**
 * Fetch popular movies
 */
export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await api.get('/movie/popular', { params: { page } });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

/**
 * Fetch top rated movies
 */
export const fetchTopRatedMovies = async (page = 1) => {
  try {
    const response = await api.get('/movie/top_rated', { params: { page } });
    return response.data;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw error;
  }
};

/**
 * Fetch trending movies
 */
export const fetchTrendingMovies = async (timeWindow = 'week') => {
  try {
    const response = await api.get(`/trending/all/${timeWindow}`);
    return response.data.results || [];
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

/**
 * Fetch movies by genre
 */
export const fetchMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await api.get('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw error;
  }
};

/**
 * Fetch TV shows (for Netflix Originals)
 */
export const fetchTVShows = async (networkId = 213, page = 1) => {
  try {
    const response = await api.get('/discover/tv', {
      params: {
        with_networks: networkId,
        page,
      },
    });
    return response.data.results || [];
  } catch (error) {
    console.error('Error fetching TV shows:', error);
    return [];
  }
};

export default api;
