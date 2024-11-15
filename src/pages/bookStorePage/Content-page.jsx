import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './css/BookStore.css';
import { useAuth } from '../../store/auth';
import { FaStar, FaRegStar, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';

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

  // fetching data
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
        // console.log("THIS IS COMING FROM CONTENT PAGE" ,fetchedData)
        setData(fetchedData);
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error(`Error in frontend service: ${error}`);
    }
  };

  // handle likes
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

  // handle dislikes

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

  // handle rating
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

  // handle AddComment
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

  // handle AddReply

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
      <div className='detailsContainer'>
        <div className='pdfImage'>
          <h1>{data.title}</h1>
          <h2>By {data.author}</h2>
          <img src={data.image} alt={data.title} />
        </div>

        <div className='pdfContainer'>
            <h3>PDF Links:</h3>
            <div>
              {data.pdf && data.pdf.length > 0 ? (
                data.pdf.map((pdfLink, index) => (
                    <Link key={index} className='link'  to={pdfLink}>
                    {index + 1}
                    </Link>
                ))
              ) : (
                <p>No PDF links available.</p>
              )}
            </div>
        </div>
      </div>
      

      <div className="actions">

         <div>
           {/* likes */}
          <button onClick={handleLike}>
            {data.likes.includes() ? (
              <FaThumbsDown/>
            ) : (
              <FaThumbsUp />
            )}
            {data.likes.length}
          </button>

          {/* dislikes */}
          <button onClick={handleDislike}>
            {data.dislikes.includes() ? (
              <FaThumbsUp/>
            ) : (
              <FaThumbsDown />
            )}
            {data.dislikes.length}
          </button>
         </div>

        <div>

          {/* rate */}
          {/* <h3>Rate this Book</h3> */}
          <div className='ratings'>

            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} onClick={() => setUserRating(star)}>
                {userRating >= star ? <FaStar style={{ color: 'gold' }} /> : <FaRegStar />}
              </span>
            ))}

            {/* submit */}
            <p onClick={handleRating}>Submit Rating</p>
          </div>
          <p>Average Rating: {data.averageRating.toFixed(1)}</p>
        </div>
      </div>

      {/* comments */}
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
          
            <strong>
              {comment.email}{' '}
              <span>
                {(() => {
                  const now = new Date();
                  const diff = Math.abs(now - new Date(comment.timestamp));
                  const seconds = Math.floor(diff / 1000);
                  const minutes = Math.floor(seconds / 60);
                  const hours = Math.floor(minutes / 60);
                  const days = Math.floor(hours / 24);

                  return days > 0
                    ? `${days} day${days > 1 ? 's' : ''} ago`
                    : hours > 0
                    ? `${hours} hour${hours > 1 ? 's' : ''} ago`
                    : minutes > 0
                    ? `${minutes} minute${minutes > 1 ? 's' : ''} ago`
                    : `${seconds} second${seconds > 1 ? 's' : ''} ago`;
                })()}
               </span>
            </strong>

            <p>{comment.content}</p>

            <span onClick={() => setReplyingToCommentId(comment._id)}>Reply</span>

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
                  <div  key={reply._id}>
                    <strong>
                      {reply.email}{' '}
                      <span>
                        {(() => {
                          const now = new Date();
                          const diff = Math.abs(now - new Date(reply.timestamp));
                          const seconds = Math.floor(diff / 1000);
                          const minutes = Math.floor(seconds / 60);
                          const hours = Math.floor(minutes / 60);
                          const days = Math.floor(hours / 24);

                          return days > 0
                            ? `${days} day${days > 1 ? 's' : ''} ago`
                            : hours > 0
                            ? `${hours} hour${hours > 1 ? 's' : ''} ago`
                            : minutes > 0
                            ? `${minutes} minute${minutes > 1 ? 's' : ''} ago`
                            : `${seconds} second${seconds > 1 ? 's' : ''} ago`;
                        })()}
                      </span>
                    </strong>
                    <p>👉{reply.content}</p>
                  </div>
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