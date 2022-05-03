import { combineReducers } from "redux";
import campaigns from "./campaignReducer";
import alert from "./alertReducer";
import profiles from "./profileReducer";
import campaignCandidates from "./campaignAciveReducer";
import login from "./loginReducer"

export default combineReducers({
  campaigns,
  alert,
  profiles,
  campaignCandidates,
  login
});
