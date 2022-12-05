import React from 'react'
import MapComponent from '../Map';
import './HomePage.css'

const center = {
  lat: 47.658779,
  lng: -117.426048
};

function HomePage() {
  return (
    <div className='homepage-container'>
      <MapComponent lat={center.lat} lng={center.lng} />
    </div>
  )
}

export default HomePage
