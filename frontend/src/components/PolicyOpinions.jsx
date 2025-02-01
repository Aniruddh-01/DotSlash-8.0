import React, { useState } from 'react';
import './PolicyOpinions.css';

function PolicyOpinions() {
  // States for managing data
  const [votes, setVotes] = useState({ upvotes: 0, downvotes: 0 });
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Sample policy data (replace with actual API data)
  const policy = {
    title: "New Environmental Protection Policy",
    description: "This policy aims to reduce carbon emissions by 30% by 2025 through implementation of renewable energy sources."
  };

  // Handle votes
  const handleVote = (type) => {
    setVotes(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  };

  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { id: Date.now(), text: newComment }]);
      setNewComment('');
    }
  };

  return (
    <div className="policy-container">
      {/* Policy Section */}
      <div className="policy-content">
        <h2>{policy.title}</h2>
        <p>{policy.description}</p>
      </div>

      {/* Voting Section */}
      <div className="voting-section">
        <button onClick={() => handleVote('upvotes')} className="vote-btn">
          👍 {votes.upvotes}
        </button>
        <button onClick={() => handleVote('downvotes')} className="vote-btn">
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
        <h3>Suggestions</h3>
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PolicyOpinions;
