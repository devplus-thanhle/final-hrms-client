import { login } from "../../service/BaseApi";

const LOGIN_TYPES = {
    LOGIN: "LOGIN",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAIL: "LOGIN_FAIL"
};
const loginAction = (username, password) => async (dispatch) => {
    try {
        //call server to get the data
        const { data } = await login({ username, password });
        dispatch(loginSuccess(data.data.accessToken))
    } catch (error) {
        dispatch(loginFail("Invalid username or password"))

    }
};
const loginSuccess = (token) => {
    //console.log(token)
    return {
        type: LOGIN_TYPES.LOGIN_SUCCESS,
        payload: token
    }
}
const loginFail = (message) => {
    return {
        type: LOGIN_TYPES.LOGIN_FAIL,
        payload: message
    }
}
export {
    LOGIN_TYPES, loginAction
}
