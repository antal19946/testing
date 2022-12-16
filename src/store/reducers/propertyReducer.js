import {
  GET_ALL_PROPERTY,
  GET_PROPERTY,
  GET_PROPERTY_BY_PROPERTY_ID,
  GET_PROPERTY_BY_USERID,
  LIST_PROPERTY,
  UPDATE_PROPERTY,
  GET_ALL_FILTERED_PROPERTY,
  CREATE_PROPERTY_BOOKING,
  UPDATE_PROPERTY_BOOKING,
  GET_BOOKING_BY_ID,
  BOOK_PROPERTY_PARAMETER,
  DELETE_PROPERTY,
  GET_BOOKING_BY_USER_ID,
  CREATE_WISH_LIST,
  ADD_PROPERTY_REVIEW,
  PROPERTY_ALLOTMENT_GET_DATE,
  CANCEL_PROPERTY_BOOKING,
  GET_PROPERTY_BOOKING_LIST_BY_HOST_ID,
  CANCEL_PROPERTY_BOOKING_BY_HOST_USER,
} from "../actions/actionType";

const initialState = {
  [GET_ALL_PROPERTY]: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROPERTY:
      return Object.assign({}, state, {
        [GET_ALL_PROPERTY]: action[GET_ALL_PROPERTY],
      });

    case GET_ALL_FILTERED_PROPERTY:
      return Object.assign({}, state, {
        [GET_ALL_FILTERED_PROPERTY]: action[GET_ALL_FILTERED_PROPERTY],
      });
    case LIST_PROPERTY:
      return Object.assign({}, state, {
        [LIST_PROPERTY]: action[LIST_PROPERTY],
      });
    case GET_PROPERTY:
      return Object.assign({}, state, {
        [GET_PROPERTY]: action[GET_PROPERTY],
      });
    case GET_PROPERTY_BY_USERID:
      return Object.assign({}, state, {
        [GET_PROPERTY_BY_USERID]: action[GET_PROPERTY_BY_USERID],
      });
    case GET_PROPERTY_BY_PROPERTY_ID:
      return Object.assign({}, state, {
        [GET_PROPERTY_BY_PROPERTY_ID]: action[GET_PROPERTY_BY_PROPERTY_ID],
      });
    case UPDATE_PROPERTY:
      return Object.assign({}, state, {
        [UPDATE_PROPERTY]: action[UPDATE_PROPERTY],
      });
    case CREATE_PROPERTY_BOOKING:
      return Object.assign({}, state, {
        [CREATE_PROPERTY_BOOKING]: action[CREATE_PROPERTY_BOOKING],
      });
    case UPDATE_PROPERTY_BOOKING:
      return Object.assign({}, state, {
        [UPDATE_PROPERTY_BOOKING]: action[UPDATE_PROPERTY_BOOKING],
      });
    case GET_BOOKING_BY_ID:
      return Object.assign({}, state, {
        [GET_BOOKING_BY_ID]: action[GET_BOOKING_BY_ID],
      });
    case GET_BOOKING_BY_USER_ID:
      return Object.assign({}, state, {
        [GET_BOOKING_BY_USER_ID]: action[GET_BOOKING_BY_USER_ID],
      });
    case DELETE_PROPERTY:
      return Object.assign({}, state, {
        [DELETE_PROPERTY]: action[DELETE_PROPERTY],
      });
    case CREATE_WISH_LIST:
      return Object.assign({}, state, {
        [CREATE_WISH_LIST]: action[CREATE_WISH_LIST],
      });
    case ADD_PROPERTY_REVIEW:
      return Object.assign({}, state, {
        [ADD_PROPERTY_REVIEW]: action[ADD_PROPERTY_REVIEW],
      });
    case PROPERTY_ALLOTMENT_GET_DATE:
      return Object.assign({}, state, {
        [PROPERTY_ALLOTMENT_GET_DATE]: action[PROPERTY_ALLOTMENT_GET_DATE],
      });
    case CANCEL_PROPERTY_BOOKING:
      return Object.assign({}, state, {
        [CANCEL_PROPERTY_BOOKING]: action[CANCEL_PROPERTY_BOOKING],
      });
    case GET_PROPERTY_BOOKING_LIST_BY_HOST_ID:
      return Object.assign({}, state, {
        [GET_PROPERTY_BOOKING_LIST_BY_HOST_ID]: action[GET_PROPERTY_BOOKING_LIST_BY_HOST_ID],
      });
    case CANCEL_PROPERTY_BOOKING_BY_HOST_USER:
      return Object.assign({}, state, {
        [CANCEL_PROPERTY_BOOKING_BY_HOST_USER]: action[CANCEL_PROPERTY_BOOKING_BY_HOST_USER],
      });

    case BOOK_PROPERTY_PARAMETER: {
      return { ...state, [BOOK_PROPERTY_PARAMETER]: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
