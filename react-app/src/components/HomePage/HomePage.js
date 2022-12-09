import React from 'react'
import MapComponent from '../Map';
import './HomePage.css'

const center = {
  lat: 37.090240,
  lng: -95.712891
};

function HomePage() {
  return (
    <div className='homepage-container'>
      <MapComponent lat={center.lat} lng={center.lng} />
    </div>
  )
}

export default HomePage
