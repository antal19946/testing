import { ASK_AGRONOMIST } from "../actions/actionType"

// import * as actionTypes from '../actions/actionType';
const initialState = {
    [ASK_AGRONOMIST]: [],

}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ASK_AGRONOMIST:
            return Object.assign({}, state, {
                [ASK_AGRONOMIST]: action[ASK_AGRONOMIST]
            })


        default:

            return state;
    }
}

export default reducer;
