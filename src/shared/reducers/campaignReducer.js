import { CAMPAIGN_TYPES } from "../actions/campaignAction";

const initialState = {
  campaigns: [],
  campaign: {},
  campaignOfMonth: {},
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
    case CAMPAIGN_TYPES.GET_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.payload.data,
        total: action.payload.total,
        page: action.payload.page,
      };
    case CAMPAIGN_TYPES.GET_CAMPAIGN_OF_MONTH:
      return {
        ...state,
        campaignOfMonth: {
          campaign: action.payload.campaignOfMonth,
          profile: action.payload.profilesOfMonth,
          profileAccept: action.payload.profileAccept,
          profileProcessing: action.payload.profileProcessing,
          allProfiles: action.payload.allProfiles,
          profileReject: action.payload.profileReject,
        },
      };
    default:
      return state;
  }
};

export default campaignReducer;
