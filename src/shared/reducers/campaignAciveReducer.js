import { CAMPAIGN_ACTIVE_TYPES } from "../actions/campaignActiveAction";

const initialState = {
  campaigns: [],
  count: 0,
  loading: false,
};

const campaignActiveReducer = (state = initialState, action) => {
  switch (action.type) {
    case CAMPAIGN_ACTIVE_TYPES.LOADING_CAMPAIGN_ACTIVE:
      return {
        ...state,
        loading: action.payload,
      };
    case CAMPAIGN_ACTIVE_TYPES.GET_CAMPAIGN_ACTIVE:
      return {
        campaigns: action.payload.data,
        count: action.payload.count,
      };
    
    default:
      return state;
  }
};

export default campaignActiveReducer;
