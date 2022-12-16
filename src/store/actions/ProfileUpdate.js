import { axiosPost } from "../axiosHelper";

import { PROFILE_UPDATE } from "./actionType";
import { Alert } from "react-native";
export function UpdateProfile(post) {
  return dispatch => {
    return axiosPost({ url: "/user/profile/update", reqBody: post, skipAuth: true }, (response) => {
      // if (response.data?.result?.token) window.localStorage.setItem('rtoken', response.data?.result?.token)
      // if (response.data?.result?._id) window.localStorage.setItem('ruserId', response.data?.result?._id)
      // if (response.data?.result?.token) window.localStorage.setItem('token', response.data?.result?.token)
      // if (response.data?.result?._id) window.localStorage.setItem('userId', response.data?.result?._id)
      dispatch({
        type: PROFILE_UPDATE,
        [PROFILE_UPDATE]: response.data
      });
      if (response.data?.success === true) {
        Alert.alert(
          "HELLO!",
          "Password do not Match",

          [

            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
        // successNotification(response.data?.message);
        // setTimeout(function(){
        //     window.location.href = '/auth/verify-email'
        //     // window.location.href = `/auth/verify-email?email=${response.data?.result?.email}`
        // },500)
      }
      if (response.data?.success === false) {
        errorNotification(response.data?.message)
      }
    })
  };
}
