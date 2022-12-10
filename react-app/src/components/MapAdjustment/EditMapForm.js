import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateRoute } from '../../store/routes';
import { GoogleMap, useLoadScript, Marker, DistanceMatrixService } from '@react-google-maps/api';
import './MapAdjustment.css'


function EditMapForm({ route, onClose, setResponse, setLoaded }) {
    // const route = useSelector(state => state.routes[routeId])
    const currUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [start, setStart] = useState({ ...route?.startingPoint })
    const [end, setEnd] = useState({ ...route?.endingPoint })
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState(route?.title)
    const [description, setDescription] = useState(route?.description)
    const [travelingMode, setTravelingMode] = useState(route?.travelMode)
    const [distance, setDistance] = useState(route?.distance)

    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: currUser.mapKey
    })

    const center = {
        lat: (route?.startingPoint.lat + route?.endingPoint.lat) / 2,
        lng: (route?.startingPoint.lng + route?.endingPoint.lng) / 2
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            id: route.id,
            user_id: currUser.id,
            title: title,
            description: description,
            start_lat: start.lat,
            start_lng: start.lng,
            end_lat: end.lat,
            end_lng: end.lng,
            traveling_mode: travelingMode,
            distance: distance,
            image_url: route.imageUrl
        }
        const res = await dispatch(updateRoute(payload))
        if (res) {
            setErrors(res)
        } else {
            setResponse(null)
            setLoaded(false)
            onClose()
        }
    }

    // useEffect(() => {
    //     dispatch(getAllRoutes())
    // }, [dispatch])


    useEffect(() => {
        setErrors([])
    }, [title, description, travelingMode])

    if (!route) {
        return null
    }
    // console.log(route)

    return (
        <div className='edit-map-form-container'>
            <div className='emf-mapadjust-container'>
                <div className='errors-container'>
                    {errors.map((error, ind) => (
                        <div key={ind} className='error-message'>{error}</div>
                    ))}
                </div>
                <div className='emf-mapadjust'>
                    {isLoaded ?
                        <>
                            <script async defer src={`https://maps.googleapis.com/maps/api/js?key=${currUser.mapKey}&callback=initMap`}></script>
                            <div id='map'>
                                <GoogleMap
                                    zoom={6}
                                    center={center}
                                    mapContainerClassName='emf-map-container'
                                >
                                    <DistanceMatrixService
                                        options={{
                                            destinations: [{...end}],
                                            origins: [{...start}],
                                            travelMode: travelingMode,
                                        }}
                                        callback={(response) => { setDistance(response.rows[0].elements[0].distance.text) }}
                                    />
                                    {route && (
                                        <>
                                            <Marker
                                                position={start}
                                                draggable={true}
                                                onDragEnd={(e) =>setStart({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
                                                title='Start Point'>
                                            </Marker >
                                            <Marker
                                                position={end}
                                                draggable={true}
                                                onDragEnd={(e) => setEnd({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
                                                title='End Point'
                                            >
                                            </Marker >
                                        </>
                                    )
                                    }
                                </GoogleMap>
                            </div>
                        </>
                        :
                        <div className="loading-text">Loading....</div>
                    }
                </div>
                <div className='emf-form-container'>
                    <form className='emf-form'
                        onSubmit={handleSubmit}>
                        <div className='emf-item-container'>
                            <label className='emf-label'>Update Title: </label>
                            <input
                                type='text'
                                placeholder='title'
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className='emf-input'
                            />
                        </div>
                        <div className='emf-item-container'>
                            <label className='emf-label'>Update Description: </label>
                            <textarea
                                type='text'
                                placeholder='description'
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className='emf-input'
                            />
                        </div>
                        <div className='emf-item-container'>
                            <label className='emf-label'>Update Title: </label>
                            <select
                                name='travelMode'
                                value={travelingMode}
                                onChange={(e) => setTravelingMode(e.target.value)}
                                className='emf-input'
                            >
                                <option>WALKING</option>
                                <option>BICYCLING</option>
                            </select>
                        </div>
                        <div className='emf-item-container'>
                            <button type='submit' className='update-btn'>Update Route</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditMapForm
