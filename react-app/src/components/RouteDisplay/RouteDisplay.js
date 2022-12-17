import React, { useEffect, useState } from 'react'
import { GoogleMap, useLoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// import { getAllRoutes } from '../../store/routes';
import { getCurrentRoute } from '../../store/routes'
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
    const route = useSelector(state => state.routes.currentRoute)
    const currUser = useSelector(state => state.session.user)
    const [response, setResponse] = useState(null)
    const [loaded, setLoaded] = useState(true)

    const dispatch = useDispatch()

    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: currUser.mapKey
    })

    // console.log(route)
    const directionsCallback = (response) => {
        // setLoaded(false)
        if (response !== null) {
            if (response.status === 'OK') {
                setResponse(response)
            }
        }
        // setLoaded(true)
    }


    useEffect(async () => {

            await dispatch(getCurrentRoute(routeId)).then(() => setLoaded(true))


    }, [dispatch, response])


    if (!route) {
        return null
    }


    return route.ownerInfo && (
        <div className='route-info-container'>
            <div className='route-map-info-container'>
                {loaded && isLoaded ?
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
                                            ...route.requestData,
                                            destination: route.requestData.destination,
                                            origin: route.requestData.origin,
                                            travelMode: route.travelMode
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

                                    </>
                                )}

                            </GoogleMap>

                        </div>
                    </>

                    :
                    <div className="loading-text">Loading....</div>
                }
            </div>
            <div className='ui-comment-container'>
                <div className='ur-info-container'>
                    <div className='user-details-container'>
                        <NavLink to={`/users/${route?.userId}`} className='username-text'>{route?.ownerInfo?.username}</NavLink>
                        <ul className='name-list'>
                            <li className='first-name'>
                                {route?.ownerInfo.firstName}
                            </li>
                            <li className='last-name'>
                                {route?.ownerInfo.lastName}
                            </li>
                            <li className='email'>
                                {route?.ownerInfo.email}
                            </li>
                        </ul>
                        <img src={route?.ownerInfo.profilePicture}
                            className='user-propic' />
                        <div className='route-pic-container'>
                            <img src={route?.imageUrl}
                                alt='Route Image'
                                className='route-pic' />
                        </div>
                    </div>
                    <div className='ri-items-container'>
                        <ul className='ri-items-list'>
                            <li className='ri-item'>
                                <strong>Title: </strong>
                                {'   '}
                                <p>
                                    {route?.title}
                                </p>
                            </li>
                            <li className='ri-item'>
                                <strong>Description: </strong>
                                <p>
                                    {route?.description}
                                </p>
                            </li>
                            <li className='ri-item'>
                                <strong>Distance: </strong>
                                <p>
                                    {route?.distance}
                                </p>
                            </li>
                            <li className='ri-item'>
                                <strong>Travel Type: </strong>
                                <p>
                                    {route?.travelMode}
                                </p>
                            </li>
                        </ul>
                        {currUser.id === route?.userId &&
                            <MapAdjustment route={route} setResponse={setResponse} setLoaded={setLoaded} />
                        }
                    </div>
                </div>
                <div className='comm-box-container'>
                    <div className='comments-container'>
                        <Comments routeId={route.id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RouteDisplay
