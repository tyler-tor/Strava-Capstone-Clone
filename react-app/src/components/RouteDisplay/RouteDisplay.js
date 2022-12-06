import React, { useEffect, useState } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllRoutes } from '../../store/routes';
import { NavLink } from 'react-router-dom';
import Comments from '../Comments/Comments';
import { mapKey } from '../../store/map';
import './RouteDisplay.css'

const center = {
    lat: 47.649133,
    lng: -117.420902
};


function RouteDisplay() {
    const { routeId } = useParams();
    const route = useSelector(state => state.routes[routeId])
    const currUser = useSelector(state => state.session.user)
    const googleKey = useSelector(state => state.mapKey.mapKey)
    const dispatch = useDispatch()

    console.log(googleKey)
    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: currUser.mapKey
    })

    // const center = () => {
    //     let bounds = new window.google.maps.LatLngBounds();
    //     bounds.extend({ ...route.startingPoint })
    //     bounds.extend({ ...route.endingPoint })
    //     console.log(bounds.getCenter())
    //     let center = new window.google.maps.Map.fitBounds(bounds)
    //     return center
    // }

    useEffect(() => {
        dispatch(getAllRoutes());
    }, [dispatch])

    if (!route) {
        return null
    } else {

    };

    return (
        <div className='route-info-container'>
            <div className='ui-comment-container'>
                <div className='ur-info-container'>
                    <img src={route.ownerInfo.profilePicture}
                        className='user-propic' />
                    <div className='user-details-container'>
                        <NavLink to={`/users/${route.userId}`} className='username-text'>{route.ownerInfo.username}</NavLink>
                        <ul className='name-list'>
                            <li className='first-name'>
                                {route.ownerInfo.firstName}
                            </li>
                            <li className='last-name'>
                                {route.ownerInfo.lastName}
                            </li>
                            <li className='email'>
                                {route.ownerInfo.email}
                            </li>
                        </ul>
                        <div className='route-pic-container'>
                            <img src={route.imageUrl}
                                alt='Route Image'
                                className='route-pic' />
                        </div>
                    </div>
                    <div className='ri-items-container'>
                        <ul className='ri-items-list'>
                            <li className='ri-item'>
                                {route.title}
                            </li>
                            <li className='ri-item'>
                                {route.description}
                            </li>
                            <li className='ri-item'>
                                <p>
                                    {route.distance}
                                </p>
                            </li>
                            <li className='ri-item'>
                                {route.travelMode}
                            </li>
                        </ul>
                        {currUser.id === route.userId &&
                            <div className='ed-btn-container'>
                                <button className='edit-btn'>Edit</button>
                                <button className='delete-btn'>Delete</button>
                            </div>}
                    </div>
                </div>
                <div className='comm-box-container'>
                    <div className='comments-container'>
                        <Comments routeId={route.id} />
                    </div>
                </div>
            </div>
            <div className='route-map-info-container'>
                {isLoaded ?
                    <>
                        <script async defer src={`https://maps.googleapis.com/maps/api/js?key=${currUser.mapKey}&callback=initMap`}></script>
                        <div id='map'>
                            <GoogleMap
                                zoom={10}
                                center={center}
                                mapContainerClassName='route-map-container'
                            >
                                <Marker
                                    position={{ ...route.startingPoint }}>
                                </Marker >
                                <Marker
                                    position={{ ...route.endingPoint }}>
                                </Marker >

                            </GoogleMap>
                        </div>
                    </>

                    :
                    <div className="loading-text">Loading....</div>
                }
            </div>
        </div>
    )
}

export default RouteDisplay
