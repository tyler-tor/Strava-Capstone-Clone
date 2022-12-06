import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { newRouteComment } from '../../store/comments';
import './AddCommentForm.css'

function AddCommentForm({ onClose, routeId }) {
    const [errors, setErrors] = useState([]);
    const [commentInput, setCommentInput] = useState('');
    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            body: commentInput,
            routeId: routeId
        }

        await dispatch(newRouteComment(payload)).then((res) => {
            if (res) {
                setErrors(res)
            }else {
                onClose()
            }
        })
    };

    useEffect(() => {
        setErrors([])
    }, [commentInput])

    return (
        <div className="add-comm-container">
            <form onSubmit={handleSubmit} className="ac-form">
                <ul className='err-ul'>
                    {errors.length && errors.map((error) => (
                        <li key={error}
                            className='err-li'>{error}
                        </li>
                    ))}
                </ul>
                <div className="ac-input-wrapper">
                    <input
                        type="text"
                        placeholder="comment"
                        required
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        className='ac-input'
                        size={50}
                    />
                </div>
                <div className="ac-sub-btn-container">
                    <button className={'btn btn--outline btn--medium'} type="submit" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddCommentForm
