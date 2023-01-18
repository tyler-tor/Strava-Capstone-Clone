import React from 'react'
import { useDispatch } from 'react-redux'
import { useState } from 'react';
import { addFriend, deleteFriend } from '../../store/friends';

function AdjustFriendStatusAlert({ userId, status, setStatus, onClose, setLoading }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;

    if (!status) {
      res = await dispatch(addFriend(userId))
      if (res.error) {
        setErrors(res)
      } else {
        setStatus(true)
        onClose()
      }
    } else {
      res = await dispatch(deleteFriend(userId))
      if (res.error) {
        setErrors(res)
      } else {
        setStatus(false)
        onClose()
      }
    }
    setLoading(true)
  }
  console.log(status)
  return (
    <div className='friend-alert-wrapper'>
      {errors.map((error, ind) => {
        return (
          <div key={ind} className='error-message'>
            {error}
          </div>
        )
      })}
      <button className='confirm-afs-btn'
        onClick={handleSubmit}>
        Are you sure?
      </button>
    </div>
  )
}

export default AdjustFriendStatusAlert
