import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getRouteComments } from '../../store/comments'

function Comments({routeId}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRouteComments(routeId))
    }, [])
    return (
        <div>

        </div>
    )
}

export default Comments
