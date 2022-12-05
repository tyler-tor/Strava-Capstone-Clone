import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllRoutes } from "../../store/routes";
import './MapComponent.css'

const containerStyle = {
    width: '100wh',
    height: '100vh'
};


const MapComponent = ({ lat, lng }) => {
    const dispatch = useDispatch()
    const routes = Object.values(useSelector(state => state.routes));
    const [selected, setSelected] = useState(null)
    //loads the map if the api key for google maps api exist
    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    });
    //sets the center of the map based on the lat,lng props that are passed
    const center = useMemo(() => {
        if (lat && lng) {
            return { lat, lng }
        }
    }, [lat, lng])

    useEffect(() => {
        dispatch(getAllRoutes())
    }, [])

    return isLoaded ? (
        <>
            <script async defer src={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`}>
            </script>
            <div id='map'>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    zoom={10}
                    center={center}
                    mapContainerClassName='map-container'
                    >
                    {routes.map(route => {
                        return (
                        <div key={route.id}>
                            <Marker position={{lat: route.startingPoint.lat, lng: route.startingPoint.lng}}
                            onClick={() => {
                                setSelected({'coord':route.startingPoint, 'route': route})
                            }}
                            />
                        </div>
                        )
                    })}

                    {selected ? (
                        <InfoWindow position={{lat: selected.coord.lat, lng: selected.coord.lng}}
                        onCloseClick={() => {
                            setSelected(null)
                        }}>
                            <div className="iw-container">
                                <p>Click title to view Route...</p>
                                <NavLink to={`/routes/${selected.route.id}`}
                                className='iw-title'>{selected.route.title}</NavLink>
                                <p className="iw-description">{selected.route.description}</p>
                            </div>
                        </InfoWindow>
                    ) : null}
                </GoogleMap>
            </div>
        </>
    ) : <div className="loading-text">Loading....</div>;
}

export default React.memo(MapComponent)
