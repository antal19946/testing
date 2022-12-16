import { TRAINING_MODULE } from "../actions/actionType"

// import * as actionTypes from '../actions/actionType';
const initialState = {
    [TRAINING_MODULE]: [],

}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case TRAINING_MODULE:
            return Object.assign({}, state, {
                [TRAINING_MODULE]: action[TRAINING_MODULE]
            })


        default:

            return state;
    }
}

export default reducer;
