import { combineReducers } from "redux";
import campaigns from "./campaignReducer";
import alert from "./alertReducer";
import profiles from "./profileReducer";
import campaignCandidates from "./campaignAciveReducer";

export default combineReducers({
  campaigns,
  alert,
  profiles,
  campaignCandidates
});
