/* eslint-disable no-unused-vars */
import { getDataAPI, postDataAPI } from "../../service/BaseApi";
import { GLOBALTYPES } from "./globalTypes";

export const CAMPAIGN_ACTIVE_TYPES = {
    GET_CAMPAIGN_ACTIVE: "GET_CAMPAIGN_ACTIVE",
    LOADING_CAMPAIGN_ACTIVE: "LOADING_CAMPAIGN_ACTIVE",
    GET_CAMPAIGN_ACTIVES: "GET_CAMPAIGN_ACTIVES",

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
          total: res.data.result.total,

        },
      });
      dispatch({ type: CAMPAIGN_ACTIVE_TYPES.LOADING_CAMPAIGN_ACTIVE, payload: false });
    } catch (error) {
      console.log(error);
    }
  };
  export const filterCampaignActive =
  ({ technology, position, page, value }) =>
  async (dispatch) => {
    console.log(value);
    try {
      const search = value ? `&search=${value}` : "";
      const res = await getDataAPI(
        `get-all-campaignActive?${search}&page=${page}&position=${position}&technology=${technology}`
      );
      console.log(res);
      dispatch({
        type: CAMPAIGN_ACTIVE_TYPES.GET_CAMPAIGN_ACTIVES,
        payload: {
          data: res.data.result.campaigns,
          total: res.data.result.total,
        },
      });
    } catch (error) {}
  };