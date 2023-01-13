import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllFriendsActivity } from '../../store/friendsActivity';
import { getAllRoutes } from '../../store/routes';
import { getAllWorkouts } from '../../store/workouts';
import { NavLink, useHistory } from 'react-router-dom';
import './ActivityFeed.css';

function ActivityFeed() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [polyRoutes, setPolyRoutes] = useState([])
    const [following, setFollowing] = useState('Following')
    const [merged, setMerged] = useState([])
    const friendsRoutes = useSelector(state => state.friendsActivity.routes)
    const routes = Object.values(useSelector(state => state.routes.routes ? state.routes.routes : {}))
    const workouts = Object.values(useSelector(state => state.workouts.workouts ? state.workouts.workouts : {}))
    const friendsWorkouts = useSelector(state => state.friendsActivity.workouts)
    const currUser = useSelector(state => state.session.user)
    // let merged

    const compare = (a, b) => {
        if (a.createdAt < b.createdAt) {
            return -1;
        } else if (a.createdAt > b.createdAt) {
            return 1;
        } else {
            return 0;
        };
    };

    const handleActivityRedirect = (activity) => {
        if (activity.routeMapSrc) {
            history.push(`/routes/${activity.id}`)
        } else {
            history.push(`/workouts/${activity.id}`)
        }
    }

    // if (routes && workouts) {
    //     setMerged([...routes, ...workouts])
    //     merged.sort(compare).reverse()
    // }

    useEffect(() => {
        (async () => {
            if (friendsRoutes && routes) {
                let arr = (following === 'Following') ? [...friendsRoutes] : [...routes]
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
    }, [currUser.mapKey, following, dispatch, merged])

    useEffect(() => {
        dispatch(getAllFriendsActivity())
        dispatch(getAllRoutes());
        dispatch(getAllWorkouts())
    }, [dispatch])

    useEffect(() => {
        if (friendsRoutes && friendsWorkouts && (following === 'Following')) {
            setMerged([...friendsRoutes, ...friendsWorkouts].sort(compare))
        }else {
            setMerged([...routes, ...workouts].sort(compare))
        }
    }, [friendsRoutes, friendsWorkouts, dispatch, following])

    if (!friendsRoutes) {
        return null;
    }

    return friendsRoutes && friendsWorkouts && currUser && (
        <div className='activity-feed-container'>
            <div className='curruser-container'>
                <div className='propic-wrapper'>
                    <img className='propic' src={currUser.profilePicture} alt='user-pic' />
                </div>
                <div className='user-info'>
                    <ul className='ui-list'>
                        <li className='userinfo-item'>
                            {currUser.username}
                        </li>
                        <li className='userinfo-item'>
                            {currUser.firstName}
                        </li>
                        <li className='userinfo-item'>
                            {currUser.lastName}
                        </li>
                        <li className='userinfo-item'>
                            {currUser.createdAt}
                        </li>
                        <li className='userinfo-item'>
                            Activity: {currUser.routes.length + currUser.workouts.length}
                        </li>
                        <li className='userinfo-item'>
                            {currUser.friends.map(friend => {
                                return (
                                    <div className='friend-list'
                                        key={friend.userId}
                                        onClick={(activity) => handleActivityRedirect(activity)}>
                                        <img className='friend-propic'
                                            src={friend.profilePicture}
                                            alt='friend-pic' />
                                        <NavLink
                                            to={`/users/${friend.userId}`}
                                            className='friend-link'>
                                            {friend.username}
                                        </NavLink>
                                    </div>
                                )
                            })}
                        </li>
                    </ul>
                </div>
            </div>
            <div className='activity-container'>
                <div className='activity-select-container'>
                    <select
                        name='following'
                        value={following}
                        onChange={(e) => setFollowing(e.target.value)}
                        className='select-input'
                    >
                        <option>Following</option>
                        <option>All Activity</option>
                    </select>
                </div>
                {merged.map(activity => {
                    return (
                        <div className='af-posts-container'
                            key={activity.title}>
                            {activity.routeMapSrc ? (
                                <div className='post-info-container'>
                                    <a className='img-container'
                                        href={`/routes/${activity.id}`}>
                                        <img src={activity.routeMapSrc} alt='route map'
                                            className='static-map'
                                        />
                                    </a>
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
                                            {activity.createdAt}
                                        </strong>
                                        <strong>
                                            Comments: {activity.comments.length}
                                        </strong>
                                    </div>
                                    <div className='post-owner-info'>
                                        <a className='owner-propic-wrapper'
                                            href={`/users/${activity.userId}`}>
                                            <img src={activity.ownerInfo.profilePicture} alt='owner'
                                                className='owner-pro-pic'
                                            />
                                        </a>
                                        <p>{activity.ownerInfo.username}</p>
                                        <p>{activity.ownerInfo.email}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className='post-info-container'>
                                    <a className='img-container'
                                        href={`/workouts/${activity.id}`}>
                                        <img src={activity.imageUrl} alt='workout'
                                            className='workout-pic'
                                        />
                                    </a>
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
                                        <strong>
                                            {activity.createdAt}
                                        </strong>
                                        <strong>
                                            Comments: {activity.comments.length}
                                        </strong>
                                    </div>
                                    <div className='post-owner-info'>
                                        <a className='owner-propic-wrapper'
                                            href={`/users/${activity.userId}`}>
                                            <img src={activity.ownerInfo.profilePicture} alt='owner'
                                                className='owner-pro-pic'
                                            />
                                        </a>
                                        <p>{activity.ownerInfo.username}</p>
                                        <p>{activity.ownerInfo.email}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
            <div className='nonfriend-container'>
                {currUser?.nonFriends.map(non => {
                    return (
                        <div className='nonfriend-info-container'
                            key={non.id}>
                            <p>{non.username}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ActivityFeed
