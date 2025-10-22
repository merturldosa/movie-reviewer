// API Configuration
export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
export const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

// Image Sizes
export const IMAGE_SIZES = {
  POSTER_SMALL: 'w185',
  POSTER_MEDIUM: 'w342',
  POSTER_LARGE: 'w500',
  BACKDROP_SMALL: 'w780',
  BACKDROP_LARGE: 'w1280',
  BACKDROP_ORIGINAL: 'original',
  PROFILE: 'w185',
};

// Movie Categories
export const MOVIE_CATEGORIES = [
  {
    id: 'netflix',
    title: 'Netflix Originals',
    endpoint: '/discover/tv',
    params: { with_networks: 213 },
  },
  {
    id: 'trending',
    title: '추천 AI 인물 매칭',
    endpoint: '/movie/popular',
  },
  {
    id: 'trending_now',
    title: 'Trending Now',
    endpoint: '/trending/all/week',
  },
  {
    id: 'top_rated',
    title: 'Top Rated',
    endpoint: '/movie/top_rated',
  },
  {
    id: 'action',
    title: 'Action Movies',
    endpoint: '/discover/movie',
    params: { with_genres: 28 },
  },
  {
    id: 'comedy',
    title: 'Comedy Movies',
    endpoint: '/discover/movie',
    params: { with_genres: 35 },
  },
  {
    id: 'horror',
    title: 'Horror Movies',
    endpoint: '/discover/movie',
    params: { with_genres: 27 },
  },
  {
    id: 'romance',
    title: 'Romance Movies',
    endpoint: '/discover/movie',
    params: { with_genres: 10749 },
  },
  {
    id: 'documentaries',
    title: 'Documentaries',
    endpoint: '/discover/movie',
    params: { with_genres: 99 },
  },
];

// Genre Map
export const GENRE_MAP = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

// LocalStorage Keys
export const STORAGE_KEYS = {
  REVIEWS: 'movieReviewer_reviews',
  USER: 'movieReviewer_user',
};

// Routes
export const ROUTES = {
  HOME: '/',
  MOVIE_DETAIL: '/movie/:id',
  SEARCH: '/search',
  MY_REVIEWS: '/my-reviews',
};

// Form Validation
export const VALIDATION = {
  REVIEW_TITLE_MIN: 2,
  REVIEW_TITLE_MAX: 100,
  REVIEW_CONTENT_MIN: 10,
  REVIEW_CONTENT_MAX: 2000,
  MAX_IMAGES: 5,
  RATING_MIN: 1,
  RATING_MAX: 5,
};

// Default Values
export const DEFAULT_USER = {
  id: 'default-user',
  userName: 'Movie Lover',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MovieLover',
};
