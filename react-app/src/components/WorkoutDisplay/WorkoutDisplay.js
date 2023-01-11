import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCurrentWorkout } from '../../store/workouts';
import './WorkoutDisplay.css';

function WorkoutDisplay() {
    const { workoutId } = useParams();
    const dispatch = useDispatch();
    const workout = useSelector(state => state.workouts.currentWorkout);
    const currUser = useSelector(state => state.session.user);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            await dispatch(getCurrentWorkout(workoutId)).then(() => setLoaded(true))
        })()
    },[dispatch, workoutId])

    if(!workout) return null;

    return loaded && (
        <div>
            {console.log('workout', workout)}
        </div>
    )
}

export default WorkoutDisplay
