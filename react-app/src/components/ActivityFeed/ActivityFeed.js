import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllFriendsActivity } from '../../store/friendsActivity';


function ActivityFeed() {
    const dispatch = useDispatch();
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


    const setPolyline = async (route) => {
        // console.log(`https://maps.googleapis.com/maps/api/directions/json?origin=${route.startingPoint.lat},${route.startingPoint.lng}&destination=${route.endingPoint.lat},${route.endingPoint.lng}&mode=${route.travelMode}&key=${currUser.mapKey}`)
        let res = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${route.startingPoint.lat},${route.startingPoint.lng}&destination=${route.endingPoint.lat},${route.endingPoint.lng}&mode=${route.travelMode}&key=${currUser.mapKey}`)
        const polyLine = await res.json()
        // console.log('polyline', polyLine)
        let map = await fetch(`${route.staticMap}&path=${polyLine.routes[0].overview_polyline.points}&key=${currUser.mapKey}`)
        // console.log('map', map)
        let res2 = map.url
        // console.log('res2', res2)
        return res2
    }

    useEffect(() => {
        dispatch(getAllFriendsActivity())
    }, [])

    if (!routes) {
        return null;
    };


    return routes && workouts && currUser && (
        <div className='activity-feed-container'>
            {merged.map(route => {
                return route.startingPoint && route.endingPoint && (
                    <div className='af-posts-container'
                        key={route.title}>
                        <div className='post-info-container'>
                            {route.title}
                        </div>
                        {/* {setPolyline(route)} */}
                        {route && (
                            <div>
                                {console.log(setPolyline(route).then((res) => console.log(res)))}
                                <img async src={setPolyline(route).then((res) => {
                                    return res
                                    })} alt='route map' />
                                {/* // <img src={setMap(route)} alt='route map' /> */}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default ActivityFeed
