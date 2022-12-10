import React from 'react'
import EditMapModal from './EditMapModal'
import DeleteMapModal from './DeleteMapModal'
import './MapAdjustment.css'

function MapAdjustment({route, setResponse, setLoaded}) {
    return (
        <div className='ed-btn-container'>
            <EditMapModal route={route} setResponse={setResponse} setLoaded={setLoaded} />
            <DeleteMapModal routeId={route.id} />
        </div>
    )
}

export default MapAdjustment
