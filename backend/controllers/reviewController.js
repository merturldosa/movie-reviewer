const Review = require('../models/Review');

/**
 * Get all reviews
 * GET /api/reviews
 */
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

/**
 * Get reviews for a specific movie
 * GET /api/reviews/movie/:movieId
 */
exports.getReviewsByMovieId = async (req, res) => {
  try {
    const { movieId } = req.params;
    const reviews = await Review.find({ movieId: Number(movieId) }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    res.status(500).json({ message: 'Error fetching movie reviews', error: error.message });
  }
};

/**
 * Get reviews by user ID
 * GET /api/reviews/user/:userId
 */
exports.getReviewsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const reviews = await Review.find({ userId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    res.status(500).json({ message: 'Error fetching user reviews', error: error.message });
  }
};

/**
 * Get a single review by ID
 * GET /api/reviews/:id
 */
exports.getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(review);
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ message: 'Error fetching review', error: error.message });
  }
};

/**
 * Create a new review
 * POST /api/reviews
 */
exports.createReview = async (req, res) => {
  try {
    const reviewData = req.body;

    // Validate required fields
    const requiredFields = ['movieId', 'movieTitle', 'userId', 'userName', 'title', 'content', 'rating'];
    for (const field of requiredFields) {
      if (!reviewData[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    // Create new review
    const newReview = new Review(reviewData);
    const savedReview = await newReview.save();

    res.status(201).json(savedReview);
  } catch (error) {
    console.error('Error creating review:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: error.message });
    }
    res.status(500).json({ message: 'Error creating review', error: error.message });
  }
};

/**
 * Update an existing review
 * PUT /api/reviews/:id
 */
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Don't allow updating certain fields
    delete updateData._id;
    delete updateData.createdAt;

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(updatedReview);
  } catch (error) {
    console.error('Error updating review:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: error.message });
    }
    res.status(500).json({ message: 'Error updating review', error: error.message });
  }
};

/**
 * Delete a review
 * DELETE /api/reviews/:id
 */
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json({ message: 'Review deleted successfully', id });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
};

/**
 * Check if user has reviewed a movie
 * GET /api/reviews/check/:userId/:movieId
 */
exports.hasUserReviewedMovie = async (req, res) => {
  try {
    const { userId, movieId } = req.params;
    const review = await Review.findOne({ userId, movieId: Number(movieId) });
    res.json({ hasReviewed: !!review });
  } catch (error) {
    console.error('Error checking review:', error);
    res.status(500).json({ message: 'Error checking review', error: error.message });
  }
};

/**
 * Like a review
 * POST /api/reviews/:id/like
 */
exports.likeReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Remove from dislikes if exists
    review.dislikes = review.dislikes.filter(uid => uid !== userId);

    // Toggle like
    if (review.likes.includes(userId)) {
      // Unlike: remove from likes
      review.likes = review.likes.filter(uid => uid !== userId);
    } else {
      // Like: add to likes
      review.likes.push(userId);
    }

    await review.save();
    res.json(review);
  } catch (error) {
    console.error('Error liking review:', error);
    res.status(500).json({ message: 'Error liking review', error: error.message });
  }
};

/**
 * Dislike a review
 * POST /api/reviews/:id/dislike
 */
exports.dislikeReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Remove from likes if exists
    review.likes = review.likes.filter(uid => uid !== userId);

    // Toggle dislike
    if (review.dislikes.includes(userId)) {
      // Remove dislike: remove from dislikes
      review.dislikes = review.dislikes.filter(uid => uid !== userId);
    } else {
      // Dislike: add to dislikes
      review.dislikes.push(userId);
    }

    await review.save();
    res.json(review);
  } catch (error) {
    console.error('Error disliking review:', error);
    res.status(500).json({ message: 'Error disliking review', error: error.message });
  }
};
