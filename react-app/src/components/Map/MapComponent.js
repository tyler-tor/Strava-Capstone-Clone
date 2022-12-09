import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllRoutes } from "../../store/routes";
import './MapComponent.css'

const containerStyle = {
    width: '100vw',
    height: '84vh'
};


const MapComponent = ({ lat, lng }) => {
    const dispatch = useDispatch()
    const routes = Object.values(useSelector(state => state.routes));
    const currUser = useSelector(state => state.session.user)
    const [selected, setSelected] = useState(null)
    //loads the map if the api key for google maps api exist
    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: currUser.mapKey
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
            <div id='map'>
            <script async defer src={`https://maps.googleapis.com/maps/api/js?key=${currUser.mapKey}&callback=initMap`}>
            </script>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    zoom={4}
                    center={center}
                    mapContainerClassName='map-container'

                    >
                    {routes && routes.map(route => {
                        return (
                        <div key={route.id}>
                            <Marker position={{...route.startingPoint}}
                            onClick={() => {
                                setSelected({'coord':{...route.startingPoint}, 'route': route})
                            }}
                            />
                        </div>
                        )
                    })}

                    {selected ? (
                        <InfoWindow position={{lat: parseFloat(selected.coord.lat), lng: parseFloat(selected.coord.lng)}}
                        onCloseClick={() => {
                            setSelected(null)
                        }}>
                            <div className="iw-container">
                                <p>Click title to view Route...</p>
                                <NavLink to={`/routes/${selected.route.id}`}
                                className='iw-title'>{selected.route.title}</NavLink>
                                <p className="iw-description">{selected.route.description}</p>
                                <p className="iw-description">{selected.route.distance}</p>
                            </div>
                        </InfoWindow>
                    ) : null}
                </GoogleMap>
            </div>
        </>
    ) : <div className="loading-text">Loading....</div>;
}

export default React.memo(MapComponent)
