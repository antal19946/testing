import { PROFILE_UPDATE} from "../actions/actionType"

// import * as actionTypes from '../actions/actionType';
const initialState = {
    [PROFILE_UPDATE]: [],
    
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case PROFILE_UPDATE:
            return Object.assign({}, state, {
                [PROFILE_UPDATE]: action[PROFILE_UPDATE]
            })
      

        default:

            return state;
    }
}

export default reducer;
