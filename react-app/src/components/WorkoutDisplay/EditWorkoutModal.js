import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditWorkoutForm from './EditWorkoutForm';

function EditWorkoutModal({ workout }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button className='edit-btn' onClick={() => setShowModal(true)}>
        Edit
      </button>
      {showModal && (<Modal onClose={() => setShowModal(false)}>
        <EditWorkoutForm workout={workout}
          onClose={() => setShowModal(false)} />
      </Modal>)}
    </div>
  )
}

export default EditWorkoutModal
