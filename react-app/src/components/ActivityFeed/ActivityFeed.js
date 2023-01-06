import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllFriendsActivity } from '../../store/friendsActivity';
import './ActivityFeed.css';

function ActivityFeed() {
    const dispatch = useDispatch();
    const [polyRoutes, setPolyRoutes] = useState([])
    const routes = useSelector(state => state.friendsActivity.routes)
    const workouts = useSelector(state => state.friendsActivity.workouts)
    const currUser = useSelector(state => state.session.user)
    let merged

    const compare = (a, b) => {
        if (a.createdAt < b.createdAt) {
            return -1;
        } else if (a.createdAt > b.createdAt) {
            return 1;
        } else {
            return 0;
        };
    };

    if (routes && workouts) {
        merged = [...routes, ...workouts]
        merged.sort(compare).reverse()
    }

    useEffect(() => {
        (async () => {
            if (routes) {
                let arr = [...routes]
                for (let route of arr) {
                    await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${route.startingPoint.lat},${route.startingPoint.lng}&destination=${route.endingPoint.lat},${route.endingPoint.lng}&mode=${route.travelMode}&key=${currUser.mapKey}`).then(async (res) => {
                        if (res.ok) {
                            let jsonify = await res.json()
                            route['directionsFetch'] = jsonify
                            route['routeMapSrc'] = `https://maps.googleapis.com/maps/api/staticmap?size=400x300&markers=${route.startingPoint.lat},${route.startingPoint.lng}|${route.endingPoint.lat},${route.endingPoint.lng}&path=enc:${route.directionsFetch.routes[0].overview_polyline.points}&key=${currUser.mapKey}`
                        }
                    })
                }
                setPolyRoutes(arr)
            }
        })();
    }, [routes, dispatch, currUser.mapKey])

    useEffect(() => {
        dispatch(getAllFriendsActivity())
    }, [dispatch])

    if (!routes) {
        return null;
    }

    return routes && workouts && currUser && (
        <div className='activity-feed-container'>
            {merged.map(activity => {
                return (
                    <div className='af-posts-container'
                        key={activity.title}>
                        {/* <div className='post-info-container'> */}
                        {activity.routeMapSrc ? (
                            <div className='post-info-container'>
                                <div className='img-container'>
                                    <img src={activity.routeMapSrc} alt='route map'
                                        className='static-map'
                                    />
                                </div>
                                <div className='post-info'>
                                    <strong>
                                        {activity.title}
                                    </strong>
                                    <strong>
                                        {activity.description}
                                    </strong>
                                    <strong>
                                        {activity.distance}
                                    </strong>
                                </div>
                                <div className='post-owner-info'>
                                    <img src={activity.ownerInfo.profilePicture} alt='owner'
                                        className='owner-pro-pic'
                                    />
                                    <p>{activity.ownerInfo.username}</p>
                                    <p>{activity.ownerInfo.email}</p>
                                </div>
                            </div>
                        ) : (
                            <div className='post-info-container'>
                                <div className='img-container'>
                                    <img src={activity.imageUrl} alt='workout'
                                        className='workout-pic'
                                    />
                                </div>
                                <div className='post-info'>
                                    <strong>
                                        {activity.title}
                                    </strong>
                                    <strong>
                                        {activity.description}
                                    </strong>
                                    <strong>
                                        {activity.distance}
                                    </strong>
                                    <strong>
                                        {activity.totalTime}
                                    </strong>
                                </div>
                                <div className='post-owner-info'>
                                    <img src={activity.ownerInfo.profilePicture} alt='owner'
                                        className='owner-pro-pic'
                                    />
                                    <p>{activity.ownerInfo.username}</p>
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default ActivityFeed
