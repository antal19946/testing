import {GET_QUERIES} from "../actions/actionType"

const initialState = {
    [GET_QUERIES]: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_QUERIES:
            return Object.assign({}, state, {
                [GET_QUERIES]: action[GET_QUERIES]
            })
       
        default:
            return state;
    }
}

export default reducer;