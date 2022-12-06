import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getRouteComments } from '../../store/comments'
import EditCommentModal from '../EditComment/EditCommentModal';
import AddCommentModal from '../AddCommentModal/AddCommentModal';
// import '../auth/Buttons.css'

function Comments({ routeId }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const comments = Object.values(useSelector(state => state.comments)).reverse()
    const currUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getRouteComments(routeId))
        setIsLoaded(true)
    }, [dispatch, routeId])

    return (
        <div className='comm-list-container'>
            <AddCommentModal routeId={routeId} />
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
