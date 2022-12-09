import React from 'react'
import EditMapModal from './EditMapModal'
import DeleteMapModal from './DeleteMapModal'
import './MapAdjustment.css'

function MapAdjustment({routeId}) {
    return (
        <div className='ed-btn-container'>
            <EditMapModal routeId={routeId} />
            <DeleteMapModal routeId={routeId} />
        </div>
    )
}

export default MapAdjustment
