const GET_COMMENTS = 'comments/GET_COMMENTS';
const WORKOUT_COMMENT = 'comments/WORKOUT_COMMENT';
const ROUTE_COMMENT = 'comments/ROUTE_COMMENT';
const UPDATE_COMMENT = 'comments/UPDATE_COMMENTS';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';
const CLEAR_COMMENTS = 'comments/CLEAR_COMMENTS';

const getComments = (comments) => ({
    type: GET_COMMENTS,
    payload: comments
});

const workoutCommentAction = (body) => ({
    type: WORKOUT_COMMENT,
    payload: body
});

const routeCommentAction = (body) => ({
    type: ROUTE_COMMENT,
    payload: body
});

const updateCommentAction = (comment) => ({
    type: UPDATE_COMMENT,
    payload: comment
});

const deleteCommentAction = (id) => ({
    type: DELETE_COMMENT,
    payload: id
});

const clearCommentsAction = () => ({
    type: CLEAR_COMMENTS
});

export const getRouteComments = (id) => async (dispatch) => {
    const response = await fetch(`/api/routes/${id}/comments`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getComments(data.comments));
        return data
    };
    return response;
};

export const getWorkoutComments = (id) => async (dispatch) => {
    const response = await fetch(`/api/workouts/${id}/comments`);
    // console.log(response)
    if (response.ok) {
        const data = await response.json();
        // console.log('data--------', data)
        dispatch(getComments(data.comments));
        return data;
    };
    return response;
};

export const newRouteComment = (comment) => async (dispatch) => {
    const { routeId, body } = comment;
    const response = await fetch(`/api/routes/${routeId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            body: body
        })
    });

    if (response.ok) {
        const newComment = await response.json();
        dispatch(routeCommentAction(newComment));
        return newComment
    }else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors
        }
    }else {
        return [{'errors': 'A error occured'}]
    }
};



export const newWorkoutComment = (comment) => async (dispatch) => {
    const { workoutId, body } = comment;
    const response = await fetch(`/api/workouts/${workoutId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            body: body
        })
    });

    if (response.ok) {
        const newComment = await response.json();
        dispatch(workoutCommentAction(newComment));
        return newComment
    }else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors
        }
    }else {
        return [{'errors': 'A error occured'}]
    }
};


export const updateComment = (comment) => async (dispatch) => {
    const { commentId, body } = comment;
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            body: body
        })
    });

    if (response.ok) {
        let newComment = await response.json();
        dispatch(updateCommentAction(newComment));
        return newComment
    }else if(response.status < 500) {
        const data = await response.json();
        if(data.errors) {
            return data.errors
        }
    }else {
        return [{'errors': 'A error occured'}]
    }
};


export const deleteComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(deleteCommentAction(commentId));
        return data
    }
    return response
}


export default function commentsReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_COMMENTS:
            newState = {};
            action.payload.forEach((comment) => {
                newState[comment.id] = comment
            });
            return newState;
        case ROUTE_COMMENT:
            newState = {...state};
            newState[action.payload.id] = action.payload
            return newState;
        case WORKOUT_COMMENT:
            newState = {...state};
            newState[action.payload.id] = action.payload
            return newState;
        case UPDATE_COMMENT:
            newState = {...state};
            newState[action.payload.id].body = action.payload.body;
            return newState;
        case DELETE_COMMENT:
            newState = {...state};
            delete newState[action.payload];
            return newState
        case CLEAR_COMMENTS:
            newState = {};
            return newState;
        default:
            return state
    }
}
