import { deleteDataAPI, login, postDataAPI } from "../../service/BaseApi";
import { GLOBALTYPES } from "./globalTypes";

const LOGIN_TYPES = {
  LOGIN: "LOGIN",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  LOADING_LOGIN: "LOADING_LOGIN",
};
const loginAction = (username, password) => async (dispatch) => {
  try {
    //call server to get the data
    const { data } = await login({ username, password });
    dispatch(
      loginSuccess({ token: data.data.accessToken, user: data.data.user })
    );
  } catch (error) {
    dispatch(loginFail("Invalid username or password"));
  }
};
const loginSuccess = ({ token, user }) => {
  //console.log(token)
  return {
    type: LOGIN_TYPES.LOGIN_SUCCESS,
    payload: {
      token: token,
      user: user,
    },
  };
};
const loginFail = (message) => {
  return {
    type: LOGIN_TYPES.LOGIN_FAIL,
    payload: message,
  };
};
export { LOGIN_TYPES, loginAction };

export const logOut = () => async (dispatch) => {
  try {
    localStorage.removeItem("persist:root");
    await deleteDataAPI("logout");
    window.location.href = "/login";
  } catch (error) {
    console.log(error);
  }
};

export const emailResetPassword = (email) => async (dispatch) => {
  console.log(email);
  try {
    dispatch({ type: LOGIN_TYPES.LOADING_LOGIN, payload: true });
    const res = await postDataAPI(`email-reset-password`, email);
    dispatch({ type: LOGIN_TYPES.LOADING_LOGIN, payload: false });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const resetPassword = (data) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_TYPES.LOADING_LOGIN, payload: true });
    const res = await postDataAPI(`reset-password`, data);
    dispatch({ type: LOGIN_TYPES.LOADING_LOGIN, payload: false });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
    window.location.href = "/login";
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};
