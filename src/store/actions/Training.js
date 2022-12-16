import { TRAINING_MODULE } from "./actionType";
import { axiosPost, axiosGet } from "../axiosHelper";

export function GetTrainingModuls() {
  return async (dispatch) => {

    return axiosGet({ url: `/member/training/all`, skipAuth: true }, (response) => {
      if (response.status === 403) {
        // dispatch(stopLoading(AUTH_LOADING))

        return dispatch({
          type: TRAINING_MODULE,
          [TRAINING_MODULE]: response.data,
        });
      }

      // dispatch(GetUserProfileDetailsById(response.data._id));
      //
    });
  };
}