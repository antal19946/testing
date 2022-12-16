import { axiosPost } from "../axiosHelper";
import { ASK_AGRONOMIST } from "./actionType";
import { Alert } from "react-native";

export function AgronomistCreateQuestion(post) {
    return dispatch => {
        return axiosPost({ url: "/farm/agronomist/question/create", reqBody: post, skipAuth: true }, (response) => {
            // if (response.data?.result?.token) window.localStorage.setItem('rtoken', response.data?.result?.token)
            // if (response.data?.result?._id) window.localStorage.setItem('ruserId', response.data?.result?._id)
            // if (response.data?.result?.token) window.localStorage.setItem('token', response.data?.result?.token)
            // if (response.data?.result?._id) window.localStorage.setItem('userId', response.data?.result?._id)
            dispatch({
                type: ASK_AGRONOMIST,
                [ASK_AGRONOMIST]: response.data
            });

            if (response.data?.success === false) {
                errorNotification(response.data?.message)
            }
        })
    };
}
