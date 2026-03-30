import { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { useUserStore } from '../../store';
import type { Comment } from '../../types';

interface CommentModalProps {
  postId: number;
  isOpen: boolean;
  onClose: () => void;
}

export const CommentModal = ({ postId, isOpen, onClose }: CommentModalProps) => {
  const { user, isLoggedIn } = useUserStore();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen, postId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/comment/post/${postId}`);
      const data = await res.json();
      if (data.code === 200) {
        setComments(data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setSubmitting(true);
    try {
      const res = await fetch(`http://localhost:8080/api/comment?userId=${user.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          content: newComment,
        }),
      });
      const data = await res.json();
      if (data.code === 200) {
        setNewComment('');
        fetchComments(); // Refresh comments
      }
    } catch (err) {
      console.error('Failed to post comment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70">
      <div className="w-full max-w-lg bg-gray-900 rounded-t-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h3 className="text-lg font-medium text-white">评论</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full">
            <X className="text-gray-400" size={20} />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="text-center text-gray-400 py-8">加载中...</div>
          ) : comments.length === 0 ? (
            <div className="text-center text-gray-400 py-8">暂无评论，快来抢沙发</div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <img
                  src={comment.user.avatar}
                  alt={comment.user.nickname}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white text-sm">
                      {comment.user.nickname}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {comment.createdAt && new Date(comment.createdAt).toLocaleDateString('zh-CN')}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mt-1">{comment.content}</p>
                  
                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-3 pl-4 border-l-2 border-gray-800 space-y-3">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-2">
                          <img
                            src={reply.user.avatar}
                            alt={reply.user.nickname}
                            className="w-8 h-8 rounded-full flex-shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-white text-xs">
                                {reply.user.nickname}
                              </span>
                            </div>
                            <p className="text-gray-300 text-sm">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-800">
          {isLoggedIn ? (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                placeholder="写评论..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-full border border-gray-700 focus:border-pink-500 focus:outline-none text-sm"
              />
              <button
                type="submit"
                disabled={!newComment.trim() || submitting}
                className="p-2 bg-pink-500 text-white rounded-full disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </form>
          ) : (
            <div className="text-center text-gray-400 text-sm">
              请先登录后再评论
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
