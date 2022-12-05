import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getRouteComments } from '../../store/comments'

function Comments({routeId}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const comments = Object.values(useSelector(state => state.comments))
    const dispatch = useDispatch()

    console.log(comments)
    useEffect(() => {
        dispatch(getRouteComments(routeId))
        setIsLoaded(true)
    }, [])
    return (
        <div className='comm-list-container'>
            {isLoaded && (
                <div className='comm-list'>
                <ul className='comm-ul'>
                    {comments.map(comment => {
                        return (
                            <li className='comm-item'
                            key={comment.id}>
                                {console.log(comment)}
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
