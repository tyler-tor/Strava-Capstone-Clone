const GET_WORKOUTS = 'workouts/GET_WORKOUTS';
const GET_CURRENT_WORKOUT = 'workouts/GET_CURRENT_WORKOUT'
const ADD_WORKOUT = 'workouts/ADD_WORKOUT';
const UPDATE_WORKOUT = 'workouts/UPDATE_WORKOUT';
const DELETE_WORKOUT = 'workouts/DELETE_WORKOUT';

const getWorkouts = (workouts) => ({
    type: GET_WORKOUTS,
    payload: workouts
});

const getCurrentWorkoutAction = (workout) => ({
    type: GET_CURRENT_WORKOUT,
    payload: workout
})

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
    const response = await fetch('/api/workouts/');

    if (response.ok) {
        const data = await response.json();
        dispatch(getWorkouts(data.workouts));
        return data
    };
    return response
};

export const getCurrentWorkout = (workoutId) => async (dispatch) => {
    const res = await fetch(`/api/workouts/${workoutId}`);

    if (res.ok) {
        const data = await res.json();
        dispatch(getCurrentWorkoutAction(data));
        return data
    }
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
        const newWorkout = await response.json();
        dispatch(addWorkoutAction(newWorkout));
        return newWorkout;
    }else if (response.status < 500) {
        const data = response.json();
        if (data) {
            return data;
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
        const updatedWorkout = await response.json();
        dispatch(updateWorkoutAction(updatedWorkout));
    }else if (response.status < 500) {
        const data = response.json();
        if (data.errors) {
            return data.errors
        };
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


export default function workoutReducer(state = {workouts: null, currentWorkout: null}, action) {
    let newState;
    switch (action.type) {
        case GET_WORKOUTS:
            newState = {
                currentWorkout: null,
                workouts: {}
            }
            action.payload.forEach((workout) => {
                newState.workouts[workout.id] = workout
            });
            return newState;
        case GET_CURRENT_WORKOUT:
            newState = { ...state }
            newState.currentWorkout = { ...action.payload }
            return newState;
        case ADD_WORKOUT:
            newState = {...state};
            newState.workouts[action.payload.id] = action.payload
            return newState;
        case UPDATE_WORKOUT:
            newState = {...state};
            newState.currentWorkout = {...action.payload}
            newState.workouts[action.payload.id] = {...action.payload}
            return newState;
        case DELETE_WORKOUT:
            newState = {...state};
            delete newState.workouts[action.payload]
            return newState;
        default:
            return state
    }
}
