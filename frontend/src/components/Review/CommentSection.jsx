import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import {
  getCommentsByReviewId,
  createComment,
  updateComment,
  deleteComment,
} from '../../services/commentService';
import { timeAgo } from '../../utils/helpers';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from './CommentSection.module.css';

const CommentSection = ({ reviewId }) => {
  const { user } = useUser();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadComments();
  }, [reviewId]);

  const loadComments = async () => {
    try {
      setLoading(true);
      const data = await getCommentsByReviewId(reviewId);
      setComments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading comments:', error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('댓글을 작성하려면 로그인이 필요합니다.');
      return;
    }

    if (!newComment.trim()) {
      return;
    }

    try {
      setSubmitting(true);
      const commentData = {
        reviewId,
        userId: user.id,
        userName: user.userName,
        userAvatar: user.avatar,
        content: newComment.trim(),
      };

      const savedComment = await createComment(commentData);
      setComments([...comments, savedComment]);
      setNewComment('');
    } catch (error) {
      console.error('Error creating comment:', error);
      alert('댓글 작성에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  const handleUpdateComment = async (commentId) => {
    try {
      const updatedComment = await updateComment(commentId, {
        content: editingContent.trim(),
      });
      setComments(comments.map(c => (c.id === commentId ? updatedComment : c)));
      setEditingCommentId(null);
      setEditingContent('');
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('댓글 수정에 실패했습니다.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('정말 이 댓글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteComment(commentId);
      setComments(comments.filter(c => c.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  if (loading) {
    return <div className={styles.loading}>댓글 로딩 중...</div>;
  }

  return (
    <div className={styles.commentSection}>
      <h4 className={styles.title}>댓글 ({comments.length})</h4>

      {/* Comment Form */}
      {user && (
        <form onSubmit={handleSubmitComment} className={styles.commentForm}>
          <div className={styles.formHeader}>
            <img
              src={user.avatar}
              alt={user.userName}
              className={styles.avatar}
            />
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
              className={styles.textarea}
              maxLength={500}
              disabled={submitting}
            />
          </div>
          <div className={styles.formActions}>
            <span className={styles.charCount}>
              {newComment.length} / 500
            </span>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={submitting || !newComment.trim()}
            >
              {submitting ? '작성 중...' : '댓글 작성'}
            </button>
          </div>
        </form>
      )}

      {!user && (
        <div className={styles.loginPrompt}>
          댓글을 작성하려면 로그인이 필요합니다.
        </div>
      )}

      {/* Comments List */}
      <div className={styles.commentsList}>
        {comments.length === 0 ? (
          <div className={styles.noComments}>
            아직 댓글이 없습니다. 첫 댓글을 작성해보세요!
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <img
                src={comment.userAvatar}
                alt={comment.userName}
                className={styles.avatar}
              />
              <div className={styles.commentContent}>
                <div className={styles.commentHeader}>
                  <span className={styles.userName}>{comment.userName}</span>
                  <span className={styles.timestamp}>
                    {timeAgo(comment.createdAt)}
                  </span>
                </div>

                {editingCommentId === comment.id ? (
                  <div className={styles.editForm}>
                    <textarea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      className={styles.editTextarea}
                      maxLength={500}
                    />
                    <div className={styles.editActions}>
                      <button
                        onClick={() => handleUpdateComment(comment.id)}
                        className={styles.saveButton}
                        disabled={!editingContent.trim()}
                      >
                        저장
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className={styles.cancelButton}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className={styles.commentText}>{comment.content}</p>
                    {user && user.id === comment.userId && (
                      <div className={styles.commentActions}>
                        <button
                          onClick={() => handleEditComment(comment)}
                          className={styles.actionButton}
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className={styles.actionButton}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
