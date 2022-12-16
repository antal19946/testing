

import { axiosPost, axiosGet } from "../axiosHelper";
import {
  USER_PROFILE_DETAILS,
  USER_UPDATE_PROFILE,
  USER_PROFILE_DETAILSBYID,
  USER_CHANGE_PASSWORD,
  LOGIN_HISTORY,
  HISTORY_LOGOUT,
  ADD_CARD,
  GET_CARD,
  DELETE_CARD,
  GET_USER_NOTIFICATION,
  SET_NOTIFICATION_SETTING,
  DEACTIVATE_USER,
  UPDATE_PROFILE_IMAGE_COVER,
  OTHER_USER_PROFILE_DETAILS,
  USER_CHAT_LIST,
  ADD_USER_REVIEW,
  GET_ALL_NOTIFICATON_BY_USERID,
} from "./actionType";

import AsyncStorage from '@react-native-async-storage/async-storage';
// import { stopLoading } from "./loading";

export function GetUserProfileDetails() {
  return async (dispatch) => {

    return axiosGet({ url: `/user/profile/${user_id}`, skipAuth: true }, (response) => {
      if (response.status === 403) {
        // dispatch(stopLoading(AUTH_LOADING))

        return dispatch({
          type: USER_PROFILE_DETAILS,
          [USER_PROFILE_DETAILS]: {},
        });
      }

      // dispatch(GetUserProfileDetailsById(response.data._id));
      //
    });
  };
}

export function GetUserProfileDetailsById(id) {
  return (dispatch) => {
    return axiosGet({ url: "/user/profile/" + id }, (response) => {
      if (response.status === 403) {
      }
      dispatch({
        type: USER_PROFILE_DETAILS,
        [USER_PROFILE_DETAILS]: response.data?.result || {},
      });
    });
  };
}

export function GetUserChatListById(id) {
  return (dispatch) => {
    return axiosGet({ url: "/chat_user/" + id }, (response) => {
      if (response.status === 403) {
      }
      dispatch({
        type: USER_CHAT_LIST,
        [USER_CHAT_LIST]: response.data?.result || {},
      });
    });
  };
}
export function OtherProfileDetailsById(id) {
  return (dispatch) => {
    return axiosGet({ url: "/user/profile/" + id }, (response) => {
      if (response.status === 403) {
      }
      dispatch({
        type: OTHER_USER_PROFILE_DETAILS,
        [OTHER_USER_PROFILE_DETAILS]: response.data?.result || {},
      });
    });
  };
}
export function GetLoginHistoryByUserID(id) {
  return (dispatch) => {
    return axiosGet({ url: "/login/history/" + id }, (response) => {
      if (response.status === 403) {
      }
      dispatch({
        type: LOGIN_HISTORY,
        [LOGIN_HISTORY]: response.data,
      });
    });
  };
}

export function ChangePassword(post) {
  return (dispatch) => {
    return axiosPost(
      { url: "/user/change_password", reqBody: post },
      (response) => {

        dispatch({
          type: USER_CHANGE_PASSWORD,
          [USER_CHANGE_PASSWORD]: response.data,
        });
      }
    );
  };
}

export function HistoryLogout(post, userId) {
  return (dispatch) => {
    return axiosPost({ url: "/logout", reqBody: post }, (response) => {
      if (response.data?.success === true) {
        successNotification(response.data?.message);
        dispatch(GetLoginHistoryByUserID(userId));
      } else {
        errorNotification(response.data?.message);
      }
      dispatch({
        type: HISTORY_LOGOUT,
        [HISTORY_LOGOUT]: response.data,
      });
    });
  };
}

export function UploadProfileImage(post) {
  return (dispatch) => {
    return axiosPost(
      { url: "user/profile/image", reqBody: post },
      (response) => {
        dispatch({
          type: USER_PROFILE_DETAILS,
          user_profile_details: response.data,
        });
        dispatch(GetUserProfileDetails(post?.userid))
        if (response.data?.success === true) {
          successNotification(response?.data?.message);
        }
        if (response.data?.success === false) {
          errorNotification(response.data?.message);
        }
      }
    );
  };
}

export function UploadProfileImageCover(post) {
  return (dispatch) => {
    return axiosPost(
      { url: "user/profile/cover/image", reqBody: post },
      (response) => {
        dispatch({
          type: UPDATE_PROFILE_IMAGE_COVER,
          [UPDATE_PROFILE_IMAGE_COVER]: response.data,
        });
        dispatch(GetUserProfileDetails(post?.userid))
        if (response.data?.success === true) {
          successNotification(response?.data?.message);
        }
        if (response.data?.success === false) {
          errorNotification(response.data?.message);
        }
      }
    );
  };
}

export function updateUserProfile(post) {
  return (dispatch) => {
    return axiosPost(
      { url: "/user/profile/update", reqBody: post },
      (response) => {
        dispatch({
          type: USER_UPDATE_PROFILE,
          [USER_UPDATE_PROFILE]: response.data,
        });
        dispatch(GetUserProfileDetailsById(post?.userid));
        if (response.data?.success === true) {
          successNotification(response?.data?.message);
        }
        if (response.data?.success === false) {
          errorNotification(response.data?.message);
        }
      }
    );
  };
}

export function Addcard(post) {
  return (dispatch) => {
    return axiosPost(
      { url: "/user/card/add", reqBody: post },
      (response) => {
        if (response.data?.success === true) {
          successNotification(response.data?.message);
          dispatch(GetCard(post?.userid));
        } else {
          errorNotification(response.data?.message);
        }
        dispatch({
          type: ADD_CARD,
          [ADD_CARD]: response.data,
        });
      }
    );
  };
}

export function GetCard(id) {
  return (dispatch) => {
    return axiosGet({ url: "/user/cards/" + id }, (response) => {
      if (response.status === 403) {
      }
      dispatch({
        type: GET_CARD,
        [GET_CARD]: response.data,
      });
    });
  };
}


export function deleteCard(id, userid) {
  return (dispatch) => {
    return axiosPost(
      { url: "/user/card/delete/" + id },
      (response) => {
        dispatch({
          type: DELETE_CARD,
          [DELETE_CARD]: response.data,
        });
        if (response.data?.success === true) {
          successNotification(response?.data?.message);
          dispatch(GetCard(userid));
        }
        if (response.data?.success === false) {
          errorNotification(response.data?.message);
        }
      }
    );
  };
}

export function GetUsernotification(id) {
  return (dispatch) => {
    return axiosGet({ url: "/user/notification/setting/" + id }, (response) => {
      if (response.status === 403) {
      }
      dispatch({
        type: GET_USER_NOTIFICATION,
        [GET_USER_NOTIFICATION]: response.data?.result || {},
      });
    });
  };
}

export function setNotificationSetting(post) {
  return (dispatch) => {
    return axiosPost(
      { url: "/user/notification/setting", reqBody: post },
      (response) => {
        if (response.data?.success === true) {
          // successNotification(response.data?.message);
          dispatch(GetUsernotification(post?.userid));
        } else {
          // errorNotification(response.data?.message);
        }
        dispatch({
          type: SET_NOTIFICATION_SETTING,
          [SET_NOTIFICATION_SETTING]: response.data,
        });
      }
    );
  };
}

export function deactivateUser(userId, navigate) {
  return (dispatch) => {
    return axiosPost(
      { url: "/user_deactive/" + userId },
      (response) => {
        if (response.data?.success === true) {
          // successNotification(response.data?.message);
          navigate(`/`);
          dispatch(GetUserProfileDetails())
        } else {
          errorNotification(response.data?.message);
        }
        // dispatch({
        //   type: DEACTIVATE_USER,
        //   [DEACTIVATE_USER]: response.data,
        // });
      }
    );
  };
}

export function addUserReview(post) {
  return dispatch => {
    return axiosPost({ url: "/user/review/create", reqBody: post }, (response) => {
      if (response.data?.success === true) {
        // successNotification(response.data?.message);
        dispatch(OtherProfileDetailsById(post?.user_id))
      }
      if (response.data?.success === false) {
        errorNotification(response.data?.message)
      }
      dispatch({
        type: ADD_USER_REVIEW,
        [ADD_USER_REVIEW]: response.data
      });
    })
  };
}

export function GetUserNotificationListByUserId(id) {
  return (dispatch) => {
    return axiosGet({ url: "/user/notification/" + id }, (response) => {
      if (response.status === 403) {
      }
      dispatch({
        type: GET_ALL_NOTIFICATON_BY_USERID,
        [GET_ALL_NOTIFICATON_BY_USERID]: response.data || [],
      });
    });
  };
}