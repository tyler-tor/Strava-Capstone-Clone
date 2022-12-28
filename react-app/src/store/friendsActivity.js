const GET_FRIENDS_ACTIVITY = 'friends/GET_FRIENDS_ACTIVITY';

const getFriendsActivityAction = (activity) => ({
    type: GET_FRIENDS_ACTIVITY,
    payload: activity
});

export const getAllFriendsActivity = () => async (dispatch) => {
    const res = await fetch('/api/me/friends/activity');
    if (res.ok) {
        const data = await res.json();
        dispatch(getFriendsActivityAction(data));
    };
    return res;
};


export default function friendsActivityReducer(state = {routes: null, workouts: null}, action) {
    let newState = {}
    switch(action.type) {
        case GET_FRIENDS_ACTIVITY:
                newState = {...state}
                newState.routes = action.payload.routes
                newState.workouts = action.payload.workouts
                return newState;
        default:
            return state;
    }
}
