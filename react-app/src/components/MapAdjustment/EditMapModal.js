import React, { useState} from 'react'
import { Modal } from '../../context/Modal'
import EditMapForm from './EditMapForm'

function EditMapModal({route, setResponse, setLoaded}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <button className='edit-btn'
            onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (<Modal onClose={() => setShowModal(false)}>
                <EditMapForm route={route} setResponse={setResponse} setLoaded={setLoaded}
                onClose={() => setShowModal(false)} />
            </Modal>)}
        </div>

    )
}

export default EditMapModal
