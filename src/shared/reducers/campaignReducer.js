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
        total: action.payload.total,
      };
    // case CAMPAIGN_TYPES.GET_CAMPAIGN_ID:
    //   return {
    //     ...state,
    //     campaign: action.payload,
    //   }
    case CAMPAIGN_TYPES.GET_CAMPAIGN_BY_ID:
      return {
        ...state,
        campaign: action.payload.data,
      };

    default:
      return state;
  }
};

export default campaignReducer;
