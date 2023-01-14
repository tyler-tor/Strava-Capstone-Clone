import React from 'react'
import { useDispatch } from 'react-redux'
import { useState } from 'react';
import { addFriend, deleteFriend } from '../../store/friends';

function AdjustFriendStatusAlert({ userId, status, setStatus, onClose}) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;

    if(!status) {
      res = await dispatch(addFriend(userId))
      // console.log('resadd',res)
      if(res.error) {
        setErrors(res)
      }else {
        setStatus(true)
        // console.log('statusadd', status)
          onClose()
        }
    }else {
      res = await dispatch(deleteFriend(userId))
      // console.log('resdelete',res)
      // console.log('statusdelete', status)
        if(res.error) {
          setErrors(res)
        }else {
          setStatus(false)
          onClose()
        }
      }
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
