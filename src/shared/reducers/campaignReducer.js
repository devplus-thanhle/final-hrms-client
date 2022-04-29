import { CAMPAIGN_TYPES } from "../actions/campaignAction";

const initialState = {
  campaigns: [],
  campaign: {},
  count: 0,
  loading: false,
};

const campaignReducer = (state = initialState, action) => {
  switch (action.type) {
    case CAMPAIGN_TYPES.LOADING_CAMPAIGN:
      return {
        ...state,
        loading: action.payload,
      };
    case CAMPAIGN_TYPES.GET_CAMPAIGN:
      return {
        campaigns: action.payload.data,
        count: action.payload.count,
      };
      case CAMPAIGN_TYPES.GET_CAMPAIGN_ID:
        return {
          ...state,
          campaign: action.payload,
        }
    
    default:
      return state;
  }
};

export default campaignReducer;
