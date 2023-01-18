import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import AdjustFriendStatusAlert from './AdjustFriendStatusAlert';
import './AdjustFriendStatus.css';

function AdjustFriendStatusModal({ userId, status, setStatus, setLoading }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='afs-btn-wrapper'>
            <button className='afs-btn'
            onClick={() => setShowModal(true)}>
                {status ? 'Unfriend User' : 'Friend User'}
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AdjustFriendStatusAlert userId={userId} status={status} setStatus={setStatus} setLoading={setLoading}
                    onClose={() => setShowModal(false)} />
                </Modal>
            )}
        </div>
    )
}

export default AdjustFriendStatusModal
