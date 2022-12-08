import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import DeleteMapForm from './DeleteMapForm'


function DeleteMapModal({ routeId }) {
    const [showModal, setShowModal] = useState(false)
    return (
        <div>
            <button className='delete-btn'
                onClick={() => setShowModal(true)}>Delete</button>
            {showModal && (<Modal onClose={() => setShowModal(false)}>
                <DeleteMapForm routeId={routeId}
                    onClose={() => setShowModal(false)} />
            </Modal>)}
        </div>
    )
}

export default DeleteMapModal
