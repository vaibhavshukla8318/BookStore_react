import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './css/BookStore.css';
import { useAuth } from '../../store/auth';
import { FaHeart, FaRegHeart, FaStar, FaRegStar } from 'react-icons/fa';

const ContentPage = () => {
  const [data, setData] = useState({
    title: '',
    author: '',
    image: '',
    pdf: [],
    likes: [],
    dislikes: [],
    ratings: [],
    averageRating: 0,
    comments: []
  });
  
  const [userRating, setUserRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  
  const { API, authorizationToken } = useAuth();
  const params = useParams();

  const fetchData = async () => {
    try {
      const response = await fetch(`${API}/api/bookStore/books/${params.id}`, {
        method: 'GET',
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const fetchedData = await response.json();
        setData(fetchedData);
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error(`Error in frontend service: ${error}`);
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`${API}/api/bookStore/books/${params.id}/like`, {
        method: 'PUT',
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) fetchData();
    } catch (error) {
      console.error(`Error in like functionality: ${error}`);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await fetch(`${API}/api/bookStore/books/${params.id}/dislike`, {
        method: 'PUT',
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) fetchData();
    } catch (error) {
      console.error(`Error in dislike functionality: ${error}`);
    }
  };

  const handleRating = async () => {
    try {
      const response = await fetch(`${API}/api/bookStore/books/${params.id}/rate`, {
        method: 'PUT',
        headers: {
          Authorization: authorizationToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating: userRating })
      });
      if (response.ok) fetchData();
    } catch (error) {
      console.error(`Error in rating functionality: ${error}`);
    }
  };

  const handleAddComment = async () => {
    try {
      const response = await fetch(`${API}/api/bookStore/books/${params.id}/comment`, {
        method: 'POST',
        headers: {
          Authorization: authorizationToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: newComment })
      });
      if (response.ok) {
        setNewComment('');
        fetchData();
      }
    } catch (error) {
      console.error(`Error in adding comment: ${error}`);
    }
  };

  const handleAddReply = async (commentId) => {
    try {
      const response = await fetch(`${API}/api/bookStore/books/${params.id}/comment/${commentId}/reply`, {
        method: 'POST',
        headers: {
          Authorization: authorizationToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: replyContent })
      });
      if (response.ok) {
        setReplyContent('');
        setReplyingToCommentId(null);
        fetchData();
      }
    } catch (error) {
      console.error(`Error in adding reply: ${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="contentPage">
      <h1>{data.title}</h1>
      <h2>By {data.author}</h2>
      <img src={data.image} alt={data.title} />

      <h3>PDF Links:</h3>
      {data.pdf && data.pdf.length > 0 ? (
        data.pdf.map((pdfLink, index) => (
          <Link key={index} to={pdfLink}>
            PDF Link {index + 1}
          </Link>
        ))
      ) : (
        <p>No PDF links available.</p>
      )}

      <div className="actions">
        <button onClick={handleLike}>
          {data.likes.includes(/* your user ID */) ? (
            <FaHeart style={{ color: 'red' }} />
          ) : (
            <FaRegHeart />
          )}
          {data.likes.length}
        </button>
        <button onClick={handleDislike}>
          {data.dislikes.includes(/* your user ID */) ? (
            <FaHeart style={{ color: 'gray' }} />
          ) : (
            <FaRegHeart />
          )}
          {data.dislikes.length}
        </button>

        <div>
          <h3>Rate this Book</h3>
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} onClick={() => setUserRating(star)}>
              {userRating >= star ? <FaStar style={{ color: 'gold' }} /> : <FaRegStar />}
            </span>
          ))}
          <button onClick={handleRating}>Submit Rating</button>
          <p>Average Rating: {data.averageRating.toFixed(1)}</p>
        </div>
      </div>

      <div className="comments-section">
        <h3>Comments</h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment}>Post Comment</button>

        {data.comments.map((comment) => (
          <div key={comment._id} className="comment">
            <p><strong>{comment.userId.username}:</strong> {comment.content}</p>
            <button onClick={() => setReplyingToCommentId(comment._id)}>Reply</button>

            {replyingToCommentId === comment._id && (
              <div className="reply-section">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Add a reply..."
                />
                <button onClick={() => handleAddReply(comment._id)}>Post Reply</button>
              </div>
            )}

            {comment.replies && comment.replies.length > 0 && (
              <div className="replies">
                {comment.replies.map((reply) => (
                  <p key={reply._id}><strong>{reply.userId.username}:</strong> {reply.content}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentPage;











