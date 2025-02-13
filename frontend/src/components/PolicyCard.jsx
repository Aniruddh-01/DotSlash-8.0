import React, { useState, useEffect } from 'react';
import './PolicyOpinions.css';

function PolicyCard({ policy }) {
  // Load votes & user preference from localStorage
  const savedVotes = JSON.parse(localStorage.getItem(`votes-${policy.id}`)) || { upvotes: 0, downvotes: 0 };
  const savedUserVote = localStorage.getItem(`policy-${policy.id}-vote`);

  const [votes, setVotes] = useState(savedVotes);
  const [userVote, setUserVote] = useState(savedUserVote);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Save votes to localStorage
  useEffect(() => {
    localStorage.setItem(`votes-${policy.id}`, JSON.stringify(votes));
  }, [votes]);

  // Save user vote preference
  useEffect(() => {
    if (userVote) {
      localStorage.setItem(`policy-${policy.id}-vote`, userVote);
    } else {
      localStorage.removeItem(`policy-${policy.id}-vote`);
    }
  }, [userVote]);

  // Fetch comments from server
  useEffect(() => {
    fetchComments();
  }, [policy.id]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:3000/policy-comments/${policy.id}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // Handle voting logic
  const handleVote = (type) => {
    if (userVote === type) {
      setVotes(prev => ({ ...prev, [type]: prev[type] - 1 }));
      setUserVote(null);
    } else {
      setVotes(prev => ({
        upvotes: userVote === 'upvotes' ? prev.upvotes - 1 : prev.upvotes + (type === 'upvotes' ? 1 : 0),
        downvotes: userVote === 'downvotes' ? prev.downvotes - 1 : prev.downvotes + (type === 'downvotes' ? 1 : 0),
      }));
      setUserVote(type);
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/policy-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          policyId: policy.id,
          comment: newComment
        }),
      });
      if (response.ok) {
        setNewComment('');
        fetchComments();
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="policy-card">
      <div className="policy-content">
        <h2 className='font-semibold text-2xl py-5'>{policy.title}</h2>
        <p>{policy.description}</p>
      </div>

      {/* Voting Section */}
      <div className="voting-section">
        <button 
          onClick={() => handleVote('upvotes')} 
          className={`vote-btn ${userVote === 'upvotes' ? 'voted' : ''}`}
        >
          👍 {votes.upvotes}
        </button>
        <button 
          onClick={() => handleVote('downvotes')} 
          className={`vote-btn ${userVote === 'downvotes' ? 'voted' : ''}`}
        >
          👎 {votes.downvotes}
        </button>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your suggestion here..."
          className="comment-input"
        />
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      {/* Comments List */}
      <div className="comments-section">
        <h3 className='text-xl'>Suggestions</h3>
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <p className='bg-gray-100 p-3 rounded-2xl'>{comment.comment}</p>
            <small>{new Date(comment.created_at).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PolicyCard;
