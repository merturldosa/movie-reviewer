const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

/**
 * Recommendation Routes
 */

// Get personalized recommendations for a user
router.get('/:userId', recommendationController.getRecommendations);

// Get similar movies based on a specific movie
router.get('/similar/:movieId', recommendationController.getSimilarMovies);

module.exports = router;
