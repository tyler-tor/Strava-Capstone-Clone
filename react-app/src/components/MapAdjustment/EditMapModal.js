import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import EditMapForm from './EditMapForm'

function EditMapModal({routeId}) {
    const [showModal, setShowModal] = useState(false)
    
    return (
        <div>
            <button className='edit-btn'
            onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (<Modal onClose={() => setShowModal(false)}>
                <EditMapForm routeId={routeId}
                onClose={() => setShowModal(false)} />
            </Modal>)}
        </div>

    )
}

export default EditMapModal
