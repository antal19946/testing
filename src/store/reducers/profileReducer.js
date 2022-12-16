import { ADD_CARD, ADD_PRODUCT_TO_WISHLIST, ADD_USER_REVIEW, DEACTIVATE_USER, DELETE_CARD, GET_ALL_NOTIFICATON_BY_USERID, GET_ALL_PROPERTY, GET_CARD, GET_USER_NOTIFICATION, HISTORY_LOGOUT, LIST_PROPERTY, LOGIN_HISTORY, OTHER_USER_PROFILE_DETAILS, SET_NOTIFICATION_SETTING, UPDATE_PROFILE_IMAGE_COVER, USER_CHANGE_PASSWORD, USER_CHAT_LIST, USER_PROFILE_DETAILS, USER_PROFILE_DETAILSBYID, USER_UPDATE_PROFILE } from "../actions/actionType"

const initialState = {
    [USER_PROFILE_DETAILS]: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case USER_PROFILE_DETAILS:
            return Object.assign({}, state, {
                [USER_PROFILE_DETAILS]: action[USER_PROFILE_DETAILS]
            })
        case OTHER_USER_PROFILE_DETAILS:
            return Object.assign({}, state, {
                [OTHER_USER_PROFILE_DETAILS]: action[OTHER_USER_PROFILE_DETAILS]
            })
        case USER_CHAT_LIST:
            return Object.assign({}, state, {
                [USER_CHAT_LIST]: action[USER_CHAT_LIST]
            })
        case USER_PROFILE_DETAILSBYID:
            return Object.assign({}, state, {
                [USER_PROFILE_DETAILSBYID]: action[USER_PROFILE_DETAILSBYID]
            })
        case USER_UPDATE_PROFILE:
            return Object.assign({}, state, {
                [USER_UPDATE_PROFILE]: action[USER_UPDATE_PROFILE]
            })
        case USER_CHANGE_PASSWORD:
            return Object.assign({}, state, {
                [USER_CHANGE_PASSWORD]: action[USER_CHANGE_PASSWORD]
            })
        case LOGIN_HISTORY:
            return Object.assign({}, state, {
                [LOGIN_HISTORY]: action[LOGIN_HISTORY]
            })
        case HISTORY_LOGOUT:
            return Object.assign({}, state, {
                [HISTORY_LOGOUT]: action[HISTORY_LOGOUT]
            })
        case ADD_CARD:
            return Object.assign({}, state, {
                [ADD_CARD]: action[ADD_CARD]
            })
        case GET_CARD:
            return Object.assign({}, state, {
                [GET_CARD]: action[GET_CARD]
            })
        case GET_USER_NOTIFICATION:
            return Object.assign({}, state, {
                [GET_USER_NOTIFICATION]: action[GET_USER_NOTIFICATION]
            })
        case SET_NOTIFICATION_SETTING:
            return Object.assign({}, state, {
                [SET_NOTIFICATION_SETTING]: action[SET_NOTIFICATION_SETTING]
            })
        case UPDATE_PROFILE_IMAGE_COVER:
            return Object.assign({}, state, {
                [UPDATE_PROFILE_IMAGE_COVER]: action[UPDATE_PROFILE_IMAGE_COVER]
            })
        case ADD_PRODUCT_TO_WISHLIST:
            return Object.assign({}, state, {
                [ADD_PRODUCT_TO_WISHLIST]: action[ADD_PRODUCT_TO_WISHLIST]
            })
        case DELETE_CARD:
            return Object.assign({}, state, {
                [DELETE_CARD]: action[DELETE_CARD]
            })
        case DEACTIVATE_USER:
            return Object.assign({}, state, {
                [DEACTIVATE_USER]: action[DEACTIVATE_USER]
            })
        case ADD_USER_REVIEW:
            return Object.assign({}, state, {
                [ADD_USER_REVIEW]: action[ADD_USER_REVIEW]
            })
        case GET_ALL_NOTIFICATON_BY_USERID:
            return Object.assign({}, state, {
                [GET_ALL_NOTIFICATON_BY_USERID]: action[GET_ALL_NOTIFICATON_BY_USERID]
            })

        default:
            return state;
    }
}

export default reducer;