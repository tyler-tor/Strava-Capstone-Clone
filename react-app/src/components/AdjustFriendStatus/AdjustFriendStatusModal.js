import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import AdjustFriendStatusAlert from './AdjustFriendStatusAlert';
import './AdjustFriendStatus.css';

function AdjustFriendStatusModal({ userId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='afs-btn-wrapper'>
            <button className='afs-btn'
            onClick={() => setShowModal(true)}>
                here
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AdjustFriendStatusAlert userId={userId}
                    onClose={() => setShowModal(false)} />
                </Modal>
            )}
        </div>
    )
}

export default AdjustFriendStatusModal
