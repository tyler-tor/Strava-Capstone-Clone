const GET_FRIENDS_ACTIVITY = 'friends/GET_FRIENDS_ACTIVITY';

const getFriendsActivityAction = (routes) => ({
    type: GET_FRIENDS_ACTIVITY,
    payload: routes
});

export const getAllFriendsActivity = () => async (dispatch) => {
    const response = await fetch('/api/me/friends/activity');
    if (response.ok) {
        const data = await response.json();
        // console.log(data.routes)
        dispatch(getFriendsActivityAction(data.routes));
        return data;
    };
    return response;
};


export default function friendsActivityReducer(state = {}, action) {
    let newState = {}
    switch(action.type) {
        case GET_FRIENDS_ACTIVITY:
                newState = {...state}
                // console.log('payload-------', action.payload)
                action.payload.forEach(route => {
                    newState[route.id] = route
                })
                // console.log('newstate------', newState)
                return newState;
        default:
            return state;
    }
}
