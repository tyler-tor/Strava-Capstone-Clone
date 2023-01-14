import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getCurrentWorkout, getAllWorkouts } from '../../store/workouts';
import Comments from '../Comments/Comments';
import EditWorkoutModal from './EditWorkoutModal';
import DeleteWorkoutModal from './DeleteWorkoutModal';
import './WorkoutDisplay.css';

function WorkoutDisplay() {
    const { workoutId } = useParams();
    const dispatch = useDispatch();
    const workout = useSelector(state => state.workouts.currentWorkout);
    const currUser = useSelector(state => state.session.user);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            await dispatch(getAllWorkouts())
            await dispatch(getCurrentWorkout(workoutId)).then(() => setLoaded(true))

        })()
    }, [dispatch, workoutId])

    if (!workout) {
        return null
    };

    return loaded && workout.ownerInfo && (
        <div className='workout-info-wrapper'>
            <div className='workout-pic-wrapper'>
                <img src={workout?.imageUrl}
                    alt='workout-pic' className='workout-pic' />
            </div>
            <div className='workout-info-container'>
                <ul className='wi-items-list'>
                    <li className='wi-item'>
                        <strong className='wi-item-label'>Title: </strong>
                        <p>
                            {workout?.title}
                        </p>
                    </li>
                    <li className='wi-item'>
                        <strong className='wi-item-label'>Description: </strong>
                        <p>
                            {workout?.description}
                        </p>
                    </li>
                    <li className='wi-item'>
                        <strong className='wi-item-label'>Distance: </strong>
                        <p>
                            {workout?.distance}
                        </p>
                    </li>
                    <li className='wi-item'>
                        <strong className='wi-item-label'>Type: </strong>
                        <p>
                            {workout?.type}
                        </p>
                    </li>
                    <li className='wi-item'>
                        <strong className='wi-item-label'>Total Time: </strong>
                        <p>
                            {workout?.totalTime}
                        </p>
                    </li>
                </ul>
                {currUser.id === workout.userId && (
                    <div className='ed-btn-container'>
                        <EditWorkoutModal workout={workout} />
                        <DeleteWorkoutModal workoutId={workout.id} />
                    </div>
                )}
            </div>
            <div className='owner-info-container'>
                <img src={workout?.ownerInfo.profilePicture}
                    alt='owner' className='user-propic' />
                <ul className='name-list'>
                    <NavLink to={`/users/${workout?.userId}`} className='username-text'>{workout?.ownerInfo?.username}</NavLink>
                    <li className='first-name'>
                        {workout?.ownerInfo.firstName}
                    </li>
                    <li className='last-name'>
                        {workout?.ownerInfo.lastName}
                    </li>
                    <li className='email'>
                        {workout?.ownerInfo.email}
                    </li>
                </ul>
            </div>
            <div className='comm-box-container'>
                <div className='comments-container'>
                    <Comments id={workout.id} />
                </div>
            </div>
        </div>
    )
}

export default WorkoutDisplay
