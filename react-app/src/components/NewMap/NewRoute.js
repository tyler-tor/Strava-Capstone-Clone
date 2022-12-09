import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { addRoute } from '../../store/routes'
import ImageUploadComponent from '../ImageUploadComponenet';
import { GoogleMap, useLoadScript, Marker, DistanceMatrixService } from '@react-google-maps/api';
import './NewRoute.css'

const center = {
  lat: 47.649133,
  lng: -117.420902
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      user_id: currUser.id,
      title: title,
      description: description,
      start_lat: start.lat,
      start_lng: start.lng,
      end_lat: end.lat,
      end_lng: end.lng,
      traveling_mode: travelingMode,
      distance: distance,
      image_url: url
    }

    const data = await dispatch(addRoute(payload))
    if (data) {
      console.log(data)
    }else {
      history.push(`/`)
    }
  }

  const handleMarkerSet = (e) => {
    if (allowStart === true) {
      setStart({ lat: e.latLng.lat(), lng: e.latLng.lng() })
    }
    if (allowEnd === true) {
      setEnd({ lat: e.latLng.lat(), lng: e.latLng.lng() })
    }
  }
  // console.log(url)

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
                  zoom={10}
                  center={center}
                  mapContainerClassName='nrf-map-container'
                  onClick={(e) => handleMarkerSet(e)}
                >
                {start && end && travelingMode && (<DistanceMatrixService
                    options={{
                      destinations: [{ ...end }],
                      origins: [{ ...start }],
                      travelMode: travelingMode,
                    }}
                    callback={(response) => { setDistance(response.rows[0].elements[0].distance.text) }}
                  />)}
                  <Marker
                    position={start}
                    draggable={true}
                    onDragEnd={(e) => setStart({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
                    title='Start Point'>
                  </Marker >
                  <Marker
                    position={end}
                    draggable={true}
                    onDragEnd={(e) => setEnd({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
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
          <button className='start-btn'
            onClick={() => {
              setAllowStart(true)
              setAllowEnd(false)
            }}>Set Start Point</button>
          <button className='end-btn'
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