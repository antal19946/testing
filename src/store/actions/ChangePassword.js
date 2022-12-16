import { axiosPost } from "../axiosHelper";
import { USER_CHANGE_PASSWORD } from "./actionType";
import { Alert } from "react-native";
export function UserChangePassword(post) {
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
