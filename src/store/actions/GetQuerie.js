import { GET_QUERIES } from "./actionType";
import { axiosPost, axiosGet } from "../axiosHelper";


export function GetQueriesById(id) {
    return (dispatch) => {
        return axiosGet({ url: "/farm/queries/" + id }, (response) => {
            if (response.status === 403) {
            }
            dispatch({
                type: GET_QUERIES,
                [GET_QUERIES]: response.data?.result || {},
            });
        });
    };
}
