import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { addRoute } from '../../store/routes'
import ImageUploadComponent from '../ImageUploadComponenet';
import { GoogleMap, useLoadScript, Marker, DistanceMatrixService } from '@react-google-maps/api';
import './NewRoute.css'

const center = {
  lat: 37.090240,
  lng: -95.712891
};

function NewRoute() {
  const currUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const history = useHistory()
  const [allowStart, setAllowStart] = useState(false)
  const [allowEnd, setAllowEnd] = useState(false)
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('');
  const [travelingMode, setTravelingMode] = useState('')
  const [distance, setDistance] = useState(null)

  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: currUser.mapKey
  })

  // const center = navigator.geolocation.getCurrentPosition(showPosition)
  // console.log(center)

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('start', start)
    // console.log('end', end)
    if(!start && !end) {
      setErrors(['You need to set a Start and End point'])
    }else if (!start) {
      setErrors(['You need to set a Start Point'])
    }else if (!end) {
      setErrors(['You need to set a End Point'])
    }else if (!url) {
      setErrors(['You need to upload a image for your route'])
    }else {
      // console.log(errors)
      if(errors.length < 1){
        const payload = {
          user_id: currUser.id,
          title: title,
          description: description,
          start_lat: parseFloat(start.lat),
          start_lng: parseFloat(start.lng),
          end_lat: parseFloat(end.lat),
          end_lng: parseFloat(end.lng),
          traveling_mode: travelingMode,
          distance: distance,
          image_url: url
        }

        const data = await dispatch(addRoute(payload))
        // console.log(data)
        if (data) {
          setErrors(data)
        }else {
          history.push(`/`)
        }
      }
    }
  }

  const handleMarkerSet = (e) => {
    if (allowStart === true) {
      setStart({ lat: parseFloat(e.latLng.lat()), lng: parseFloat(e.latLng.lng()) })
    }
    if (allowEnd === true) {
      setEnd({ lat: parseFloat(e.latLng.lat()), lng: parseFloat(e.latLng.lng()) })
    }
  }

  const styleStart = () => {
    if (allowStart === true) {
      return 'start-btn-active'
    }else {
      return 'start-btn'
    }
  }

  const styleEnd = () => {
    if (allowEnd === true) {
      return 'end-btn-active'
    }else {
      return 'end-btn'
    }
  }

  useEffect(() => {
    setErrors([])
  }, [start, end, url])

  return (
    <div className='new-route-form-container'>
      <div className='nrf-map-error-container'>
        <div className='errors-container'>
          {errors.map((error, ind) => (
            <div key={ind} className='error-message'>{error}</div>
          ))}
        </div>
        <div className='nrf-map'>
          {isLoaded ?
            <>
              <script async defer src={`https://maps.googleapis.com/maps/api/js?key=${currUser.mapKey}&callback=initMap`}></script>
              <div id='map'>
                <GoogleMap
                  zoom={4}
                  center={center}
                  mapContainerClassName='nrf-map-container'
                  onClick={(e) => handleMarkerSet(e)}
                >
                {start && end && travelingMode && (<DistanceMatrixService
                    options={{
                      destinations: [{ lat:parseFloat(end.lat), lng: parseFloat(end.lng) }],
                      origins: [{ lat:parseFloat(start.lat), lng: parseFloat(start.lng) }],
                      travelMode: travelingMode,
                    }}
                    callback={(response) => { setDistance(response.rows[0].elements[0].distance.text) }}
                  />)}
                  <Marker
                    position={start}
                    draggable={true}
                    onDragEnd={(e) => setStart({ lat: parseFloat(e.latLng.lat()), lng: parseFloat(e.latLng.lng()) })}
                    title='Start Point'>
                  </Marker >
                  <Marker
                    position={end}
                    draggable={true}
                    onDragEnd={(e) => setEnd({ lat: parseFloat(e.latLng.lat()), lng: parseFloat(e.latLng.lng()) })}
                    title='End Point'
                  >
                  </Marker >
                </GoogleMap>
              </div>
            </>
            :
            <div className="loading-text">Loading....</div>
          }
        </div>
      </div>
      <div className='nrf-btn-form-container'>
        <div className='nrf-btn-container'>
          <button className={styleStart()}
            onClick={() => {
              setAllowStart(true)
              setAllowEnd(false)
            }}>Set Start Point</button>
          <button className={styleEnd()}
            onClick={() => {
              setAllowEnd(true)
              setAllowStart(false)
            }}>Set End Point</button>
        </div>
        <div className='nrf-form-container'>
            <div className='nrf-item-container'>
              <label className='nrf-label'>Route Picture: </label>
              <ImageUploadComponent setUrl={setUrl} />
            </div>
          <form className='nrf-form'
          onSubmit={handleSubmit}
          >
            <div className='nrf-item-container'>
              <label className='nrf-label'>Update Title: </label>
              <input
                type='text'
                placeholder='title'
                required
                value={title}
                className='nrf-input'
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='nrf-item-container'>
              <label className='nrf-label'>Update Description: </label>
              <textarea
                type='text'
                placeholder='description'
                required
                value={description}
                className='nrf-input'
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='nrf-item-container'>
              <label className='nrf-label'>Update Travel Type: </label>
              <select
                name='travelMode'
                value={travelingMode}
                className='nrf-input'
                onChange={(e) => setTravelingMode(e.target.value)}
              >
                <option value='' disabled>
                  Select a travel type...
                </option>
                <option>WALKING</option>
                <option>BICYCLING</option>
              </select>
            </div>
            <div className='nrf-item-container'>
            <button type='submit' className='update-btn'>Submit New Route</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewRoute
