import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteRoute } from '../../store/routes'
import './MapAdjustment.css'

function DeleteMapForm({routeId, onClose}) {
  const dispatch = useDispatch()
  const history = useHistory()

  const destroyRoute = async (e) => {
    e.preventDefault();
    const data = await dispatch(deleteRoute(routeId)).then(() => {
      history.push('/')
    })
    if(data) {

    }
    history.push('/')
    onClose()
  }
  return (
    <div className='dlt-route-container'>
      <strong className='dlt-route-label'>
        Are you sure you want to delete?
      </strong>
      <button className='dlt-route-btn'
      onClick={destroyRoute}>DELETE</button>
    </div>
  )
}

export default DeleteMapForm
