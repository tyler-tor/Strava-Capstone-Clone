import React, { useEffect, useState } from 'react'
import { GoogleMap, useLoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllRoutes } from '../../store/routes';
import { NavLink } from 'react-router-dom';
import Comments from '../Comments/Comments';
import MapAdjustment from '../MapAdjustment/MapAdjustment';
import './RouteDisplay.css'

const center = {
    lat: 47.649133,
    lng: -117.420902
};


function RouteDisplay() {
    const { routeId } = useParams();
    const route = useSelector(state => state.routes[routeId])
    const currUser = useSelector(state => state.session.user)
    // const [destination, setDestination] = useState({ ...route.endingPoint } ? route : '')
    // const [origin, setOrigin] = useState({ ...route.startingPoint })
    const [response, setResponse] = useState(null)

    const dispatch = useDispatch()

    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: currUser.mapKey
    })
    // `https://maps.googleapis.com/maps/api/staticmap?size=500x400&markers=${route.startingPoint.lat}|${route.startingPoint.lng}
    // &markers=${route.endingPoint.lat}|${route.endingPoint.lng}&key=${currUser.mapKey}`
    const image = {
        url: 'https://capstone-strava-clone-aktiv.s3.us-west-2.amazonaws.com/flag-marker.png',
        scaledSize: { height: 40, width: 40 }
    }
    // console.log("Route: " + response.distance);

    const directionsCallback = (response) => {
        if (response !== null) {
            if (response.status === 'OK') {
                setResponse(response)
            } else {
                // console.log("Route: " + response.status);
            }
        }
    }

    // const startMarker = () => {
    //     return (
    //         <Marker
    //             position={{ ...route.startingPoint }}>
    //         </Marker >
    //     )
    // }


    // useEffect(() => {
    //     dispatch(getAllRoutes());
    // }, [])


    if (!route) {
        return null
    }

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
                                <strong>Title: </strong>
                                <p>

                                    {route.title}
                                </p>
                            </li>
                            <li className='ri-item'>
                                <strong>Description: </strong>
                                <p>
                                    {route.description}
                                </p>
                            </li>
                            <li className='ri-item'>
                                <strong>Distance: </strong>
                                <p>
                                    {route.distance}
                                </p>
                            </li>
                            <li className='ri-item'>
                            <strong>Travel Type: </strong>
                                <p>
                                    {route.travelMode}
                                </p>
                            </li>
                        </ul>
                        {currUser.id === route.userId &&
                            <MapAdjustment routeId={route.id} />
                        }
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
                                {(route.endingPoint !== '' && response === null) && (
                                    <DirectionsService
                                        options={{
                                            // destination: destination,
                                            // origin: origin,
                                            // travelMode: route.travelMode
                                            ...route.requestData
                                        }}
                                        callback={directionsCallback}
                                    />
                                )
                                }
                                {response !== null && (
                                    <>

                                        <DirectionsRenderer
                                            panel={document.getElementById("panel")}
                                            options={{
                                                directions: response
                                            }}

                                        />
                                        {/* <Marker
                                            position={{ ...route.startingPoint }}>
                                        </Marker >
                                        <Marker
                                            position={{ ...route.endingPoint }}
                                            icon={image}
                                        >
                                        </Marker > */}
                                    </>
                                )}

                            </GoogleMap>
                            {/* <div id='panel'>

                            </div> */}
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