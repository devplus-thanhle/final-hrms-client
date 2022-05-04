import { LOGIN_TYPES } from "../actions/loginAction";
import { REHYDRATE } from "redux-persist";

const initialState = {
  user: {},
  token: "",
  message: "",
  error: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_TYPES.LOGIN_SUCCESS:
      return {
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGIN_TYPES.LOGIN_FAIL:
      return {
        user: {},
        message: action.payload,
        error: true,
      };
    default:
      return state;
  }
};

export default loginReducer;
