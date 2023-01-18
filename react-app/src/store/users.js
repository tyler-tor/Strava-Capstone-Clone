const GET_USERS = 'users/GET_USERS'
const GET_ONE_USER = 'users/GET_ONE_USER'

const getUsers = (users) => ({
    type: GET_USERS,
    payload: users
});

const getOneUserAction = (user) => ({
    type: GET_ONE_USER,
    payload: user
});

export const getAllUsers = () => async (dispatch) => {
    const response = await fetch('/api/users/')

    if(response.ok) {
        const data = await response.json()
        dispatch(getUsers(data.users))
        return data
    }
    return response
};

export const getOneUser = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`)

    if(res.ok) {
        const user = await res.json();
        dispatch(getOneUserAction(user))
    }else if (res.status < 500) {
        const data = await res.json();
        if(data.errors) {
            return data.errors
        }
    }
}

export default function usersReducer(state = {currentUser: null, users: null}, action) {
    let newState;
    switch (action.type) {
        case GET_USERS:
            newState = {
                currentUser: null,
                users: {}
            }
            action.payload.forEach((user) => {
                newState.users[user.id] = user
            })
            return newState
        case GET_ONE_USER:
            newState = {...state};
            newState.currentUser = {...action.payload};
            return newState;
        default:
            return state
    }
}
