const mongoose = require('mongoose');

/**
 * Review Schema for Movie Reviews
 */
const reviewSchema = new mongoose.Schema(
  {
    movieId: {
      type: Number,
      required: [true, 'Movie ID is required'],
      index: true, // Index for faster queries
    },
    movieTitle: {
      type: String,
      required: [true, 'Movie title is required'],
    },
    moviePoster: {
      type: String,
      default: '',
    },
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      index: true, // Index for faster queries
    },
    userName: {
      type: String,
      required: [true, 'User name is required'],
    },
    userAvatar: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: [true, 'Review title is required'],
      minlength: [2, 'Title must be at least 2 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    content: {
      type: String,
      required: [true, 'Review content is required'],
      minlength: [10, 'Content must be at least 10 characters'],
      maxlength: [2000, 'Content cannot exceed 2000 characters'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    images: {
      type: [String],
      default: [],
    },
    watchedDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create indexes for better query performance
reviewSchema.index({ movieId: 1, userId: 1 });
reviewSchema.index({ createdAt: -1 });

// Virtual field for review ID as string (for compatibility)
reviewSchema.virtual('id').get(function () {
  return this._id.toString();
});

// Include virtuals when converting to JSON
reviewSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
