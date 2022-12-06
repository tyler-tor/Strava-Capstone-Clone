import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateComment, deleteComment } from '../../store/comments';
import './EditCommentForm.css'
import '../auth/Buttons.css'

const EditCommentForm = ({ onClose, commentId }) => {
  const [errors, setErrors] = useState([]);
  const comment = useSelector((state) => state.comments[commentId].body);
  const [commentInput, setCommentInput] = useState(comment);
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      body: commentInput,
      commentId: commentId
    }

    await dispatch(updateComment(payload)).then((res) => {
      if (res) {
        setErrors(res)
      }else {
        onClose()
      }
    })
  };

  const destroyComment = async (e) => {
    e.preventDefault();
    dispatch(deleteComment(commentId));
  };

  useEffect(() => {
    setErrors([])
}, [commentInput])

  return (
    <div className="edit-comment-container">
      <form onSubmit={handleSubmit} className="ec-form">
        <ul className='err-ul'>
          {errors.length && errors.map((error) => (
            <li key={error}
            className='err-li'>{error}</li>
          ))}
        </ul>
        <div className="ec-input-wrapper">
          <input
            type="text"
            placeholder="comment"
            required
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className='ec-input'
            size={50}
          />
        </div>
        <div className="ec-sub-btn-container">
          <button className={'btn btn--outline btn--medium'} type="submit" onClick={handleSubmit}>
            Edit
          </button>
        </div>
      </form>
      <div className='dlt-btn-container'>
      <button onClick={destroyComment} className={'btn btn--outline btn--medium'}>
        Delete
      </button>
      </div>
    </div>
  );
};

export default EditCommentForm;
