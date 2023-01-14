import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteWorkout } from '../../store/workouts';
import './WorkoutDisplay.css'

function DeleteWorkoutForm({workoutId, onClose}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const destroyWorkout = async (e) => {
    e.preventDefault();
    const data = await dispatch(deleteWorkout(workoutId)).then(() => {
      history.push('/activity')
    })
    if (!data) {
      history.push('/activity');
      onClose();
    }
  }

  return (
    <div className='dlt-workout-container'>
      <strong className='dlt-workout-label'>
        Are you sure you want to delete?
      </strong>
      <button className='dlt-workout-btn'
      onClick={destroyWorkout}>DELETE</button>
    </div>
  )
}

export default DeleteWorkoutForm
