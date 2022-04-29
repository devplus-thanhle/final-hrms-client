import { getDataAPI, postDataAPI } from "../../service/BaseApi";
import { GLOBALTYPES } from "./globalTypes";

export const CAMPAIGN_ACTIVE_TYPES = {
    GET_CAMPAIGN_ACTIVE: "GET_CAMPAIGN_ACTIVE",
    LOADING_CAMPAIGN_ACTIVE: "LOADING_CAMPAIGN_ACTIVE",
}

export const getCampaignActive = (page) => async (dispatch) => {
    try {
      dispatch({ type: CAMPAIGN_ACTIVE_TYPES.LOADING_CAMPAIGN_ACTIVE, payload: true });
      const res = await getDataAPI(`get-all-campaignActive?page=${page}`);
      console.log(res)
      dispatch({
        type: CAMPAIGN_ACTIVE_TYPES.GET_CAMPAIGN_ACTIVE,
        payload: {
          data: res.data.result.campaigns,
          count: res.data.result.count,
        },
      });
      dispatch({ type: CAMPAIGN_ACTIVE_TYPES.LOADING_CAMPAIGN_ACTIVE, payload: false });
    } catch (error) {
      console.log(error);
    }
  };