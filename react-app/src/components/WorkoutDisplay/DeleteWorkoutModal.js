import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteWorkoutForm from './DeleteWorkoutForm'

function DeleteWorkoutModal({workoutId}) {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <button className='delete-btn'
        onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (<Modal onClose={() => setShowModal(false)}>
        <DeleteWorkoutForm workoutId={workoutId}
          onClose={() => setShowModal(false)} />
      </Modal>)}
    </div>
  )
}

export default DeleteWorkoutModal
