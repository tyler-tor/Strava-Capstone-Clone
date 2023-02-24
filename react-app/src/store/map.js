const GET_MAP_KEY = 'map/GET_MAP_KEY'

const mapKeyAction = (key) => ({
    type: GET_MAP_KEY,
    payload: key
})

export const mapKey = () => async (dispatch) => {
    const res = await fetch('/api/map/key')
    if (res.ok) {
        const data = await res.json()
        dispatch(mapKeyAction(data))
        return;
    }
}

export default function mapReducer(state = {}, action) {
    switch (action.type) {
        case GET_MAP_KEY:
            return {...action.payload}
        default: return state
    }
}
