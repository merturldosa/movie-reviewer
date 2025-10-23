const Comment = require('../models/Comment');

/**
 * Get all comments for a review
 * GET /api/comments/review/:reviewId
 */
exports.getCommentsByReviewId = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const comments = await Comment.find({ reviewId }).sort({ createdAt: 1 });
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments', error: error.message });
  }
};

/**
 * Create a new comment
 * POST /api/comments
 */
exports.createComment = async (req, res) => {
  try {
    const commentData = req.body;

    // Validate required fields
    const requiredFields = ['reviewId', 'userId', 'userName', 'content'];
    for (const field of requiredFields) {
      if (!commentData[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    // Create new comment
    const newComment = new Comment(commentData);
    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: error.message });
    }
    res.status(500).json({ message: 'Error creating comment', error: error.message });
  }
};

/**
 * Update a comment
 * PUT /api/comments/:id
 */
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Don't allow updating certain fields
    delete updateData._id;
    delete updateData.createdAt;
    delete updateData.reviewId;
    delete updateData.userId;

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json(updatedComment);
  } catch (error) {
    console.error('Error updating comment:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: error.message });
    }
    res.status(500).json({ message: 'Error updating comment', error: error.message });
  }
};

/**
 * Delete a comment
 * DELETE /api/comments/:id
 */
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json({ message: 'Comment deleted successfully', id });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Error deleting comment', error: error.message });
  }
};
