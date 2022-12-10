const GET_CURRENT_ROUTE = 'current_route/GET_CURRENT_ROUTE';

const getCurrentRouteAction = (route) => ({
    type: GET_CURRENT_ROUTE,
    payload: route
});

export const getCurrentRoute = (routeId) => async (dispatch) => {
    const res = await fetch(`/api/routes/${routeId}`)

    if (res.ok) {
        const data = await res.json();
        dispatch(getCurrentRouteAction(data))
        return data
    }
}


export default function currentRouteReducer(state = {}, action) {
    let newState;
    switch(action.type) {
        case GET_CURRENT_ROUTE:
            newState = {}
            newState = {...action.payload}
            return newState
        default:
            return state
    }
}
