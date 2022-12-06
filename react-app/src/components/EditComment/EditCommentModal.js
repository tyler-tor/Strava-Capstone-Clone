import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import EditCommentForm from '../EditCommentForm/EditCommentForm'
import './EditComment.css'

function EditCommentModal({ commentId }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className='comm-btn'>
            <i className="fas fa-edit" onClick={() => setShowModal(true)}></i>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditCommentForm
                        commentId={commentId}
                        onClose={() => setShowModal(false)}
                    />
                </Modal>
            )}
        </div>
    )
}

export default EditCommentModal
