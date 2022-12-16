// import { Navigate } from "react-router-dom";
import { errorNotification, successNotification } from "../../commons/notification";
import { axiosDelete, axiosGet, axiosPost } from "../axiosHelper";
import { ADD_PRODUCT_TO_WISHLIST, ADD_PROPERTY_REVIEW, BOOK_PROPERTY_PARAMETER, CANCEL_PROPERTY_BOOKING, CANCEL_PROPERTY_BOOKING_BY_HOST_USER, CREATE_PROPERTY_BOOKING, DELETE_PROPERTY, GET_ALL_FILTERED_PROPERTY, GET_ALL_PROPERTY, GET_BOOKING_BY_ID, GET_BOOKING_BY_USER_ID, GET_PROPERTY, GET_PROPERTY_BOOKING_LIST_BY_HOST_ID, GET_PROPERTY_BY_PROPERTY_ID, GET_PROPERTY_BY_USERID, LIST_PROPERTY, PROPERTY_ALLOTMENT_GET_DATE, UPDATE_PROPERTY, UPDATE_PROPERTY_BOOKING } from "./actionType";
import { GetUserProfileDetailsById } from "./Profile";

export function AddProperty(post, nevigate) {
    return dispatch => {
        return axiosPost({ url: "/list/property", reqBody: post }, (response) => {
            if (response.data?.success === true) {
                successNotification(response.data?.message);
                dispatch(GetPopertyByUserId(post?.userid))
                nevigate('/hostlist')
            }
            if (response.data?.success === false) {
                errorNotification(response.data?.message)
            }
            dispatch({
                type: LIST_PROPERTY,
                [LIST_PROPERTY]: response.data
            });
        })
    };
}

export function updateProperty(post) {
    return dispatch => {
        return axiosPost({ url: "/property/update", reqBody: post }, (response) => {
            if (response.data?.success === true) {
                successNotification(response.data?.message);
                dispatch(GetPopertyByUserId(post?.userid))
                dispatch({
                    type: GET_PROPERTY_BY_PROPERTY_ID,
                    [GET_PROPERTY_BY_PROPERTY_ID]: {}
                });
            }
            if (response.data?.success === false) {
                errorNotification(response.data?.message)
            }

            dispatch({
                type: UPDATE_PROPERTY,
                [UPDATE_PROPERTY]: response.data
            });
        })
    };
}

export function GetListProperty() {
    return dispatch => {
        return axiosGet({ url: "/property/all", skipAuth: true }, (response) => {
            if (response.status === 403) {
                // dispatch(stopLoading(AUTH_LOADING))
            }
            dispatch({
                type: GET_ALL_PROPERTY,
                [GET_ALL_PROPERTY]: response.data
            });
        })
    };
}

export function GetListSearchedProperty() {
    return dispatch => {
        return axiosGet({ url: "/property/all", skipAuth: true }, (response) => {
            if (response.status === 403) {
                // dispatch(stopLoading(AUTH_LOADING))
            }
            dispatch({
                type: GET_ALL_FILTERED_PROPERTY,
                [GET_ALL_FILTERED_PROPERTY]: response.data
            });
        })
    };
}

export function GetPopertyByUserId(id) {
    return dispatch => {
        return axiosGet({ url: "/user/property/" + id, skipAuth: true }, (response) => {
            console.log("+++++++++++++", response);
            dispatch({
                type: GET_PROPERTY_BY_USERID,
                [GET_PROPERTY_BY_USERID]: response.data
            });
        })
    };
}

export function GetPropertyByPropertyId(id) {
    return dispatch => {
        return axiosGet({ url: "/property/" + id, skipAuth: true }, (response) => {
            dispatch({
                type: GET_PROPERTY_BY_PROPERTY_ID,
                [GET_PROPERTY_BY_PROPERTY_ID]: response.data
            });
        })
    };
}

export function GetPoperty(id) {
    return dispatch => {
        return axiosGet({ url: "/property/" + id, skipAuth: true }, (response) => {
            if (response.status === 403) {
                // dispatch(stopLoading(AUTH_LOADING))
            }
            dispatch({
                type: GET_PROPERTY,
                [GET_PROPERTY]: response.data
            });
        })
    };
}

export function GetPopertyBookingById(userId, bookingId) {
    return dispatch => {
        return axiosGet({ url: "/property/book/" + userId + "/" + bookingId, skipAuth: true }, (response) => {
            dispatch({
                type: GET_BOOKING_BY_ID,
                [GET_BOOKING_BY_ID]: response.data
            });
        })
    };
}

export function GetPopertyBookingByUserId(userId) {
    return dispatch => {
        return axiosGet({ url: "/property/booking/list/" + userId, skipAuth: true }, (response) => {
            dispatch({
                type: GET_BOOKING_BY_USER_ID,
                [GET_BOOKING_BY_USER_ID]: response.data
            });
        })
    };
}

export function CreatePropertyBooking(post, guest_count, navigate) {
    return dispatch => {
        return axiosPost({ url: "/property/book", reqBody: post }, (response) => {
            if (response.data?.success === true) {
                // successNotification(response.data?.message);
                const bookingId = response?.data?.result?._id
                navigate(`/Checkout/${bookingId}?totalCount=${guest_count}`);
            }
            if (response.data?.success === false) {
                // errorNotification(response.data?.message)
            }
            dispatch({
                type: CREATE_PROPERTY_BOOKING,
                [CREATE_PROPERTY_BOOKING]: response.data
            });
        })
    };
}

export function updatePropertyBooking(post, navigate) {
    return dispatch => {
        return axiosPost({ url: "/property/book/conform", reqBody: post }, (response) => {
            if (response.data?.success === true) {
                successNotification(response.data?.message);
                const bookingId = post?.property_booking_id
                navigate(`/CheckoutComplete/${bookingId}`);
            }
            if (response.data?.success === false) {
                errorNotification(response.data?.message)
            }
            dispatch({
                type: UPDATE_PROPERTY_BOOKING,
                [UPDATE_PROPERTY_BOOKING]: response.data
            });
        })
    };
}

export function cancelPropertyBooking(post) {
    return dispatch => {
        return axiosPost({ url: "/property/book/cancel", reqBody: post }, (response) => {
            if (response.data?.success === true) {
                successNotification(response.data?.message);
                dispatch(GetPopertyBookingByUserId(post?.userid))
            }
            if (response.data?.success === false) {
                errorNotification(response.data?.message)
            }
            dispatch({
                type: CANCEL_PROPERTY_BOOKING,
                [CANCEL_PROPERTY_BOOKING]: response.data
            });
        })
    };
}

export function deleteProperty(id, userId) {
    return dispatch => {
        return axiosDelete({ url: "/property/delete/" + id }, (response) => {
            if (response.data?.success === true) {
                successNotification(response.data?.message);
                dispatch(GetPopertyByUserId(userId));
            }
            if (response.data?.success === false) {
                errorNotification(response.data?.message)
            }
            dispatch({
                type: DELETE_PROPERTY,
                [DELETE_PROPERTY]: response.data
            });
        })
    };
}

export function addProductToWishlist(post) {
    return dispatch => {
        return axiosPost({ url: "/property/add/wishlists", reqBody: post }, (response) => {
            if (response.data?.success === true) {
                successNotification(response.data?.message);
                dispatch(GetUserProfileDetailsById(post?.userid))

            }
            if (response.data?.success === false) {
                errorNotification(response.data?.message)
            }
            dispatch({
                type: ADD_PRODUCT_TO_WISHLIST,
                [ADD_PRODUCT_TO_WISHLIST]: response.data
            });
        })
    };
}

export function addPropertyReview(post) {
    return dispatch => {
        return axiosPost({ url: "/property/review/create", reqBody: post }, (response) => {
            if (response.data?.success === true) {
                successNotification(response.data?.message);
                dispatch(GetPropertyByPropertyId(post?.property_id))
            }
            if (response.data?.success === false) {
                errorNotification(response.data?.message)
            }
            dispatch({
                type: ADD_PROPERTY_REVIEW,
                [ADD_PROPERTY_REVIEW]: response.data
            });
        })
    };
}

export function GetPopertyAllotmentDate(propertyId) {
    return dispatch => {
        return axiosGet({ url: "/property/booking/" + propertyId, skipAuth: true }, (response) => {
            dispatch({
                type: PROPERTY_ALLOTMENT_GET_DATE,
                [PROPERTY_ALLOTMENT_GET_DATE]: response?.data
            });
        })
    };
}

export function cancelPropertyBookingByHostUser(post) {
    return dispatch => {
        return axiosPost({ url: "/property/book/conform/by/host", reqBody: post }, (response) => {
            if (response.data?.success === true) {
                successNotification(response.data?.message);
                dispatch(GetPopertyBookingByHostId(post?.userid))
            }
            if (response.data?.success === false) {
                errorNotification(response.data?.message)
            }
            dispatch({
                type: CANCEL_PROPERTY_BOOKING_BY_HOST_USER,
                [CANCEL_PROPERTY_BOOKING_BY_HOST_USER]: response.data
            });
        })
    };
}

export function GetPopertyBookingByHostId(hostUserId) {
    return dispatch => {
        return axiosGet({ url: "/host/property/booking/list/" + hostUserId, skipAuth: true }, (response) => {
            dispatch({
                type: GET_PROPERTY_BOOKING_LIST_BY_HOST_ID,
                [GET_PROPERTY_BOOKING_LIST_BY_HOST_ID]: response.data
            });
        })
    };
}

export function bookPropertyParameter(data) {
    return ({
        type: BOOK_PROPERTY_PARAMETER,
        payload: data
    })
}
