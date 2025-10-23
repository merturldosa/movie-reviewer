const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

/**
 * Review Routes
 */

// Get all reviews
router.get('/', reviewController.getAllReviews);

// Get reviews for a specific movie
router.get('/movie/:movieId', reviewController.getReviewsByMovieId);

// Get reviews by user ID
router.get('/user/:userId', reviewController.getReviewsByUserId);

// Check if user has reviewed a movie
router.get('/check/:userId/:movieId', reviewController.hasUserReviewedMovie);

// Get a single review by ID
router.get('/:id', reviewController.getReviewById);

// Create a new review
router.post('/', reviewController.createReview);

// Update a review
router.put('/:id', reviewController.updateReview);

// Delete a review
router.delete('/:id', reviewController.deleteReview);

// Like a review
router.post('/:id/like', reviewController.likeReview);

// Dislike a review
router.post('/:id/dislike', reviewController.dislikeReview);

module.exports = router;
