const mongoose = require('mongoose');

/**
 * Comment Schema for Review Comments
 */
const commentSchema = new mongoose.Schema(
  {
    reviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
      required: [true, 'Review ID is required'],
      index: true,
    },
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      index: true,
    },
    userName: {
      type: String,
      required: [true, 'User name is required'],
    },
    userAvatar: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      minlength: [1, 'Comment must be at least 1 character'],
      maxlength: [500, 'Comment cannot exceed 500 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
commentSchema.index({ reviewId: 1, createdAt: -1 });

// Include virtuals when converting to JSON
commentSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
