import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllFriendsActivity } from '../../store/friendsActivity';


function ActivityFeed() {
    const dispatch = useDispatch();
    const [polyRoutes, setPolyRoutes] = useState([])
    const routes = useSelector(state => state.friendsActivity.routes)
    const workouts = useSelector(state => state.friendsActivity.workouts)
    const currUser = useSelector(state => state.session.user)
    let merged

    const compare = (a, b) => {
        if (a.createdAt < b.createdAt ){
            return -1;
        }else if (a.createdAt > b.createdAt) {
            return 1;
        }else {
            return 0;
        };
    };

    if (routes && workouts) {
        merged = [...routes, ...workouts]
        merged.sort(compare).reverse()
    }

    useEffect(async () => {
        if(routes) {
            let arr = [...routes]
            for(let route of arr) {
                await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${route.startingPoint.lat},${route.startingPoint.lng}&destination=${route.endingPoint.lat},${route.endingPoint.lng}&mode=${route.travelMode}&key=${currUser.mapKey}`).then(async (res) => {
                    if(res.ok) {
                        let jsonify = await res.json()
                        route['directionsFetch'] = jsonify
                        route['routeMapSrc'] = `https://maps.googleapis.com/maps/api/staticmap?size=300x300&markers=${route.startingPoint.lat},${route.startingPoint.lng}|${route.endingPoint.lat},${route.endingPoint.lng}&path=enc:${route.directionsFetch.routes[0].overview_polyline.points}&key=${currUser.mapKey}`
                    }
                })
            }
            setPolyRoutes(arr)
        }
    }, [routes])

    useEffect(() => {
        dispatch(getAllFriendsActivity())
    }, [dispatch])

    if (!routes) {
        return null;
    }

    return routes && workouts && currUser && (
        <div className='activity-feed-container'>
            {merged.map(route => {
                return route.startingPoint && route.endingPoint && (
                    <div className='af-posts-container'
                    key={route.title}>
                            {/* {console.log('route', route)} */}
                        <div className='post-info-container'>
                            {route.title}
                        </div>
                        {route && (
                            <div>
                                {/* {console.log(route)} */}
                                <img src={route.routeMapSrc} alt='route map' />
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default ActivityFeed
