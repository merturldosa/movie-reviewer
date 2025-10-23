const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

/**
 * Comment Routes
 */

// Get comments for a review
router.get('/review/:reviewId', commentController.getCommentsByReviewId);

// Create a new comment
router.post('/', commentController.createComment);

// Update a comment
router.put('/:id', commentController.updateComment);

// Delete a comment
router.delete('/:id', commentController.deleteComment);

module.exports = router;
