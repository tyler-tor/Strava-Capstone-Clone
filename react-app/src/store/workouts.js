const GET_WORKOUTS = 'workouts/GET_WORKOUTS';
const ADD_WORKOUT = 'workouts/ADD_WORKOUT';
const UPDATE_WORKOUT = 'workouts/UPDATE_WORKOUT';
const DELETE_WORKOUT = 'workouts/DELETE_WORKOUT';

const getWorkouts = (workouts) => ({
    type: GET_WORKOUTS,
    payload: workouts
});

const addWorkoutAction = (workout) => ({
    type: ADD_WORKOUT,
    payload: workout
});

const updateWorkoutAction = (workout) => ({
    type: UPDATE_WORKOUT,
    payload: workout
});

const deleteWorkoutAction = (id) => ({
    type: DELETE_WORKOUT,
    payload: id
});

export const getAllWorkouts = () => async (dispatch) => {
    const response = await fetch('/api/workouts');

    if (response.ok) {
        const data = await response.json();
        dispatch(getWorkouts(data.workouts));
        return data
    };
    return response
}

export const addWorkout = (workout) => async (dispatch) => {
    const response = await fetch('/api/workouts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...workout
        })
    });
    if (response.ok) {
        const newWorkout = response.json();
        dispatch(addWorkoutAction(newWorkout));
        return newWorkout;
    }else if (response.status < 500) {
        const data = response.json();
        if (data.errors) {
            return data.errors;
        };
    }else {
        return response
    }
}

export const updateWorkout = (workout) => async (dispatch) => {
    const response = await fetch(`/api/workouts/${workout.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...workout
        })
    });

    if (response.ok) {
        const updatedWorkout = response.json();
        dispatch(updateWorkoutAction(updatedWorkout));
        return updatedWorkout
    }else if (response.status < 500) {
        const data = response.json();
        if (data.errors) {
            return data.errors
        };
    }else {
        return response
    }
};

export const deleteWorkout = (id) => async (disptch) => {
    const response = await fetch(`/api/workouts/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const data = await response.json();
        disptch(deleteWorkoutAction(id));
        return data;
    };
    return response
}


export default function workoutReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_WORKOUTS:
            newState = {}
            action.payload.forEach((workout) => {
                newState[workout.id] = workout
            });
            return newState;
        case ADD_WORKOUT:
            newState = {...state};
            newState[action.payload.id] = action.payload
            return newState;
        case UPDATE_WORKOUT:
            newState = {...state};
            newState[action.payload.id] = {...action.payload}
            return newState;
        case DELETE_WORKOUT:
            newState = {...state};
            delete newState[action.payload]
            return newState;
        default:
            return state
    }
}
