const Review = require('../models/Review');

/**
 * Get movie recommendations for a user
 * GET /api/recommendations/:userId
 */
exports.getRecommendations = async (req, res) => {
  try {
    const { userId } = req.params;

    // Get all reviews by the user
    const userReviews = await Review.find({ userId }).sort({ rating: -1 });

    if (userReviews.length === 0) {
      return res.json({
        message: 'No recommendations available yet. Start reviewing movies!',
        recommendations: [],
      });
    }

    // Extract movie IDs that user has already reviewed
    const reviewedMovieIds = userReviews.map(review => review.movieId);

    // Get highly rated movies from other users (rating >= 4)
    // Exclude movies already reviewed by this user
    const popularReviews = await Review.aggregate([
      {
        $match: {
          userId: { $ne: userId },
          movieId: { $nin: reviewedMovieIds },
          rating: { $gte: 4 },
        },
      },
      {
        $group: {
          _id: '$movieId',
          avgRating: { $avg: '$rating' },
          reviewCount: { $sum: 1 },
          movieTitle: { $first: '$movieTitle' },
          moviePoster: { $first: '$moviePoster' },
        },
      },
      {
        $match: {
          reviewCount: { $gte: 2 }, // At least 2 reviews
        },
      },
      {
        $sort: {
          avgRating: -1,
          reviewCount: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);

    const recommendations = popularReviews.map(item => ({
      movieId: item._id,
      movieTitle: item.movieTitle,
      moviePoster: item.moviePoster,
      avgRating: item.avgRating.toFixed(1),
      reviewCount: item.reviewCount,
      reason: 'Highly rated by other users',
    }));

    res.json({
      message: 'Recommendations generated successfully',
      recommendations,
      userReviewCount: userReviews.length,
    });
  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({
      message: 'Error getting recommendations',
      error: error.message,
    });
  }
};

/**
 * Get similar movies based on a specific movie
 * GET /api/recommendations/similar/:movieId
 */
exports.getSimilarMovies = async (req, res) => {
  try {
    const { movieId } = req.params;

    // Get reviews for the specified movie
    const movieReviews = await Review.find({ movieId: Number(movieId) }).sort({
      rating: -1,
    });

    if (movieReviews.length === 0) {
      return res.json({
        message: 'No similar movies found',
        similar: [],
      });
    }

    // Get user IDs who rated this movie highly (rating >= 4)
    const similarUserIds = movieReviews
      .filter(review => review.rating >= 4)
      .map(review => review.userId);

    // Get other highly rated movies by these users
    const similarMovies = await Review.aggregate([
      {
        $match: {
          userId: { $in: similarUserIds },
          movieId: { $ne: Number(movieId) },
          rating: { $gte: 4 },
        },
      },
      {
        $group: {
          _id: '$movieId',
          avgRating: { $avg: '$rating' },
          reviewCount: { $sum: 1 },
          movieTitle: { $first: '$movieTitle' },
          moviePoster: { $first: '$moviePoster' },
        },
      },
      {
        $sort: {
          reviewCount: -1,
          avgRating: -1,
        },
      },
      {
        $limit: 6,
      },
    ]);

    const recommendations = similarMovies.map(item => ({
      movieId: item._id,
      movieTitle: item.movieTitle,
      moviePoster: item.moviePoster,
      avgRating: item.avgRating.toFixed(1),
      reviewCount: item.reviewCount,
      reason: 'Users who liked this also liked',
    }));

    res.json({
      message: 'Similar movies found',
      similar: recommendations,
    });
  } catch (error) {
    console.error('Error getting similar movies:', error);
    res.status(500).json({
      message: 'Error getting similar movies',
      error: error.message,
    });
  }
};
