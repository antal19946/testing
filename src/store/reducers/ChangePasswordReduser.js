import { USER_CHANGE_PASSWORD } from "../actions/actionType"

// import * as actionTypes from '../actions/actionType';
const initialState = {
    [USER_CHANGE_PASSWORD]: [],

}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case USER_CHANGE_PASSWORD:
            return Object.assign({}, state, {
                [USER_CHANGE_PASSWORD]: action[USER_CHANGE_PASSWORD]
            })


        default:

            return state;
    }
}

export default reducer;
