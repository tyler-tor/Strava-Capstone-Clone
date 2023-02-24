import { authenticate } from "./session";
import { getOneUser } from "./users";

const GET_FRIENDS = 'friends/GET_FRIENDS';
const ADD_FRIEND = 'friends/ADD_FRIEND';
const DELETE_FRIEND = 'friends/DELETE_FRIEND';

const getFriends = (friends) => ({
    type: GET_FRIENDS,
    payload: friends
});

const addFriendAction = (user) => ({
    type: ADD_FRIEND,
    payload: user
});

const deleteFriendAction = (id) => ({
    type: DELETE_FRIEND,
    payload: id
});

export const getAllFriends = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/friends`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getFriends(data.friends))
        return data.friends
    };
    return response
}

export const addFriend = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/friends`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addFriendAction(data.friend.id));
        dispatch(authenticate());
        dispatch(getOneUser(data.friend.id))
        return data
    };
    return response
};

export const deleteFriend = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/friends`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteFriendAction(data.unFriended.id));
        dispatch(authenticate());
        dispatch(getOneUser(data.unFriended.id))
        return data
    };
    return response
};


export default function friendsReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_FRIENDS:
            newState = {};
            action.payload.forEach((user) => {
                newState[user.id] = user
            });
            return newState;
        case ADD_FRIEND:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case DELETE_FRIEND:
            newState = {...state};
            delete newState[action.payload]
            return newState;
        default:
            return state
    }
}
