import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateWorkout } from '../../store/workouts'

function EditWorkoutForm({ workout, onClose }) {
  const currUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState(workout?.title)
  const [type, setType] = useState(workout?.type)
  const [description, setDescription] = useState(workout?.description);
  const [distance, setDistance] = useState(workout?.distance.split(' ')[0]);
  const [distanceMeasurement, setDistanceMeasurement] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: workout.id,
      user_id: currUser.id,
      title: title,
      type: type,
      description: description,
      distance: `${distance} ${distanceMeasurement}`,
      total_time: `${hour} hr ${minute} min`,
      image_url: workout.imageUrl
    }

    const res = await dispatch(updateWorkout(payload))
    if (res) {
      setErrors(res)
    } else {
      onClose()
    }
  }

  useEffect(() => {
    const timeSplit = workout.totalTime.split(' ')
    const distanceMeasure = workout.distance.split(' ')[1]
    setHour(timeSplit[0]);
    setMinute(timeSplit[2])

    if (distanceMeasure === 'miles') setDistanceMeasurement(distanceMeasure);
    if (distanceMeasure === 'kilometers') setDistanceMeasurement(distanceMeasure)
  }, []);

  return (
    <div className='edit-workout-form-wrapper'>
      <div className='ewf-container'>
        <form className='ewf-form'
          onSubmit={handleSubmit}>
      <div className='ewf-item'>
        {errors.map((error, ind) => (
          <div key={ind} className='error-message'>{error}</div>
        ))}
      </div>
          <div className='ewf-item'>
            <label className='ewf-label'>Workout Title: </label>
            <input
              type='text'
              placeholder='title'
              required
              value={title}
              className='ewf-input'
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='ewf-item'>
            <label className='ewf-label'>Workout Description: </label>
            <textarea
              type='text'
              placeholder='description'
              required
              value={description}
              className='ewf-input-ta'
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='ewf-item'>
            <label className='ewf-label'>Workout Type: </label>
            <select
              name='type'
              value={type}
              className='ewf-input'
              required
              onChange={(e) => setType(e.target.value)}
            >
              <option value='' disabled>
                Select a workout type...
              </option>
              <option>Walk</option>
              <option>Run</option>
              <option>Hike</option>
              <option>Bike</option>
              <option>Cardio</option>
              <option>Weight</option>
            </select>
          </div>
          <div className='ewf-item'>
            <label className='ewf-label'>Workout Duration: </label>
            <input
              type='number'
              placeholder='hour'
              required
              value={hour}
              className='ewf-input'
              onChange={(e) => setHour(e.target.value)}
            />
            <input
              type='number'
              placeholder='minute'
              required
              value={minute}
              className='ewf-input'
              onChange={(e) => setMinute(e.target.value)}
            />
          </div>
          <div className='ewf-item'>
            <label className='ewf-label'>Workout Distance: </label>
            <input
              type='number'
              placeholder='distance'
              required
              value={distance}
              className='ewf-input'
              onChange={(e) => setDistance(e.target.value)}
            />
            <select
              name='type'
              value={distanceMeasurement}
              className='ewf-input'
              required
              onChange={(e) => setDistanceMeasurement(e.target.value)}
            >
              <option value='' disabled>
                Select a distance measurement...
              </option>
              <option>miles</option>
              <option>kilometers</option>
            </select>
          </div>
          <div className='ewf-item'>
          <button type='submit' className='update-btn'>Edit Workout</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditWorkoutForm
