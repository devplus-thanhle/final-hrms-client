import { combineReducers } from "redux";
import campaigns from "./campaignReducer";
import alert from "./alertReducer";

export default combineReducers({
  campaigns,
  alert,
});
