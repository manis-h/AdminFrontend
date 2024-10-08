import axios from "axios";
import * as types from "./actionTypes";

const REACT_APP_API_URL = "http://localhost:4000";

const userAuthentication = (payload) => (dispatch) => {
    dispatch({ type: types.USER_LOGIN_REQUEST });
    return axios
        .post(`${REACT_APP_API_URL}/login`, payload)
        .then((res) => {
            // console.log(res.data)
            return dispatch({
                type: types.USER_LOGIN_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            return dispatch({ type: types.USER_LOGIN_FAILURE, payload: err });
        });
};

const userSignout = () => (dispatch) => {
    return dispatch({ type: types.USER_SIGNOUT_SUCCESS });
};

export { userAuthentication, userSignout };
