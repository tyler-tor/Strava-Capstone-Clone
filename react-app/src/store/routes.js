const GET_ROUTES = 'workouts/GET_ROUTES';
const ADD_ROUTE = 'workouts/ADD_ROUTE';
const UPDATE_ROUTE = 'workouts/UPDATE_ROUTE';
const DELETE_ROUTE = 'workouts/DELETE_ROUTE';

const getRoutes = (routes) => ({
    type: GET_ROUTES,
    payload: routes
});

const addRouteAction = (route) => ({
    type: ADD_ROUTE,
    payload: route
});

const updateRouteAction = (route) => ({
    type: UPDATE_ROUTE,
    payload: route
});

const deleteRouteAction = (id) => ({
    type: DELETE_ROUTE,
    payload: id
});

export const getAllRoutes = () => async (dispatch) => {
    const response = await fetch('/api/routes/');

    if (response.ok) {
        const data = await response.json();
        dispatch(getRoutes(data.routes));
        return data
    };
    return response
}

export const addRoute = (route) => async (dispatch) => {
    const response = await fetch('/api/routes/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...route
        })
    });
    if (response.ok) {
        const newRoute = response.json();
        dispatch(addRouteAction(newRoute));
    } else if (response.status < 500) {
        const data = response.json();
        if (data.errors) {
            return data.errors;
        }
    }
}

export const updateRoute = (route) => async (dispatch) => {
    const response = await fetch(`/api/routes/${route.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: route.title,
            description: route.description,
            start_lat: route.start_lat,
            start_lng: route.start_lng,
            end_lat: route.end_lat,
            end_lng: route.end_lng,
            traveling_mode: route.traveling_mode,
            distance: route.distance,
            image_url: route.image_url
        })
    });
    if (response.ok) {
        const updateRoute = response.json();
        dispatch(updateRouteAction(updateRoute));
    } else if (response.status < 500) {
        const data = response.json();
        if (data.errors) {
            return data.errors
        };
    } else {
    }
};

export const deleteRoute = (id) => async (disptch) => {
    const response = await fetch(`/api/routes/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        await response.json();
        disptch(deleteRouteAction(id));
    };
    return response
}


export default function routesReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_ROUTES:
            newState = {}
            action.payload.forEach((route) => {
                newState[route.id] = route
            });
            return newState;
        case ADD_ROUTE:
            newState = { ...state };
            newState[action.payload.id] = action.payload
            return newState;
        case UPDATE_ROUTE:
            newState = { ...state };
            newState[action.payload.id] = { ...action.payload }
            return newState;
        case DELETE_ROUTE:
            newState = { ...state };
            delete newState[action.payload]
            return newState;
        default:
            return state
    }
}
