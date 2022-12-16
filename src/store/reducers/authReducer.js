import { LOGIN, REGISTRATION, VERIFY_OTP } from "../actions/actionType"

const initialState = {
    login_user_data: {},
    [REGISTRATION]: {},
    [LOGIN]: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, {
                [LOGIN]: action[LOGIN]
            })

        case REGISTRATION:
            return Object.assign({}, state, {
                [REGISTRATION]: action[REGISTRATION]
            })
        case VERIFY_OTP:
            return Object.assign({}, state, {
                [VERIFY_OTP]: action[VERIFY_OTP]
            })

        default:
            return state;
    }
}

export default reducer;