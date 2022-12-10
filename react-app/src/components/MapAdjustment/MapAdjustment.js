import React from 'react'
import EditMapModal from './EditMapModal'
import DeleteMapModal from './DeleteMapModal'
import './MapAdjustment.css'

function MapAdjustment({routeId, setResponse}) {
    return (
        <div className='ed-btn-container'>
            <EditMapModal routeId={routeId} setResponse={setResponse} />
            <DeleteMapModal routeId={routeId} />
        </div>
    )
}

export default MapAdjustment
