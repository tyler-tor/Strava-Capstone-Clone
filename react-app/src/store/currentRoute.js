// const GET_CURRENT_ROUTE = 'current_route/GET_CURRENT_ROUTE';
// const UPDATE_CURRENT_ROUTE = 'update_route/UPDATE_CURRENT_ROUTE'

// const getCurrentRouteAction = (route) => ({
//     type: GET_CURRENT_ROUTE,
//     payload: route
// });

// const updateCurrentRouteAction = (route) => ({
//     type: UPDATE_CURRENT_ROUTE,
//     payload: route
// })

// export const getCurrentRoute = (routeId) => async (dispatch) => {
//     const res = await fetch(`/api/routes/${routeId}`)

//     if (res.ok) {
//         const data = await res.json();
//         dispatch(getCurrentRouteAction(data))
//         return data
//     }
// }

// export const updateCurrentRoute = (route) => async (dispatch) => {
    // const response = await fetch(`/api/routes/${route.id}`, {
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         title: route.title,
    //         description: route.description,
    //         start_lat: route.start_lat,
    //         start_lng: route.start_lng,
    //         end_lat: route.end_lat,
    //         end_lng: route.end_lng,
    //         traveling_mode: route.traveling_mode,
    //         distance: route.distance,
    //         image_url: route.image_url
    //     })
    // });
    // // console.log('response------', response.json())
    // if (response.ok) {
    //     const updateRoute = response.json();
        // dispatch(updateCurrentRouteAction(route));
    // } else if (response.status < 500) {
    //     const data = response.json();
    //     if (data.errors) {
    //         return data.errors
    //     };
    // } else {
    // }
// };


// export default function currentRouteReducer(state = { route: null}, action) {
//     let newState;
//     switch(action.type) {
//         case GET_CURRENT_ROUTE:
//             newState = {...state}
//             newState.route = {...action.payload}
//             return newState
//         case UPDATE_CURRENT_ROUTE:
//             newState = {...state}
//             newState.route = {...action.payload}
//             return newState
//         default:
//             return state
//     }
// }
