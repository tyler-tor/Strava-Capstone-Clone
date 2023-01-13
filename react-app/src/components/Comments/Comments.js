import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getRouteComments } from '../../store/comments'
import EditCommentModal from '../EditComment/EditCommentModal';
import AddCommentModal from '../AddCommentModal/AddCommentModal';

function Comments({ id }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const comments = Object.values(useSelector(state => state.comments)).reverse()
    const currUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getRouteComments(id))
        setIsLoaded(true)
    }, [dispatch, id])

    return (
        <div className='comm-list-container'>
            <AddCommentModal id={id} />
            {isLoaded && (
                <div className='comm-list'>
                    <ul className='comm-ul'>
                        {comments.map(comment => {
                            return (
                                <li className='comm-item'
                                    key={comment.id}>
                                    <div className='comm-info'>
                                        <img src={comment.user.profilePicture} alt=""
                                            className='comm-pro-pic' />
                                        <div className="comm-text">
                                            <strong>{comment.user.username} : </strong>
                                            <span className="comm-item-text">
                                                {comment.body}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        {currUser.id === comment.userId && (
                                            <EditCommentModal commentId={comment.id} />
                                        )}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Comments
