import { combineReducers } from "redux";
import campaigns from "./campaignReducer";
import alert from "./alertReducer";
import profiles from "./profileReducer";

export default combineReducers({
  campaigns,
  alert,
  profiles,
});
