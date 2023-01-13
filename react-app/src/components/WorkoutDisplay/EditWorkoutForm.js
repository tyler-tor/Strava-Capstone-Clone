import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateWorkout } from '../../store/workouts'

function EditWorkoutForm({ workout, onClose }) {
  const currUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(workout?.title)
  const [description, setDescription] = useState(workout?.description);
  const [distance, setDistance] = useState(workout?.distance);
  const [distanceMeasurement, setDistanceMeasurement] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: workout.id,
      user_id: currUser.id,
      title: title,
      description: description,
      distance: `${distance} ${distanceMeasurement}`,
      total_time: `${hour} hr ${minute} min`,
      image_url: workout.imageUrl
    }
  }

  useEffect(() => {
    const timeSplit = workout.totalTime.split(' ')
    const distanceMeasure = workout.distance.split(' ')[1]
    setHour(timeSplit[0]);
    setMinute(timeSplit[2])

    if(distanceMeasure === 'miles') setDistanceMeasurement(distanceMeasure);
    if(distanceMeasure === 'kilometers') setDistanceMeasurement(distanceMeasure)
  }, []);

  return (
    <div>

    </div>
  )
}

export default EditWorkoutForm
