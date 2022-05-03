import { getDataAPI, patchDataAPI, postDataAPI } from "../../service/BaseApi";
import { GLOBALTYPES } from "./globalTypes";

export const CAMPAIGN_TYPES = {
  GET_CAMPAIGN: "GET_CAMPAIGN",
  LOADING_CAMPAIGN: "LOADING_CAMPAIGN",
  GET_CAMPAIGN_ID: "GET_CAMPAIGN_ID",
  GET_CAMPAIGN_ACTIVE: "GET_CAMPAIGN_ACTIVE",
  GET_CAMPAIGN_BY_ID: "GET_CAMPAIGN_BY_ID",
};

export const getCampaign = (page) => async (dispatch) => {
  try {
    dispatch({ type: CAMPAIGN_TYPES.LOADING_CAMPAIGN, payload: true });
    const res = await getDataAPI(`get-all-campaign?page=${page}`);
    dispatch({
      type: CAMPAIGN_TYPES.GET_CAMPAIGN,
      payload: {
        data: res.data.result.campaigns,
        total: res.data.result.total,
      },
    });
    dispatch({ type: CAMPAIGN_TYPES.LOADING_CAMPAIGN, payload: false });
  } catch (error) {
    console.log(error);
  }
};

export const getCampaignById = (id) => async (dispatch) => {
  try {
    dispatch({ type: CAMPAIGN_TYPES.LOADING_CAMPAIGN, payload: true });
    const res = await getDataAPI(`get-campaign/${id}`);
    dispatch({
      type: CAMPAIGN_TYPES.GET_CAMPAIGN_BY_ID,
      payload: {
        data: res.data.result,
      },
    });
    dispatch({ type: CAMPAIGN_TYPES.LOADING_CAMPAIGN, payload: false });
  } catch (error) {
    console.log(error);
  }
};
export const getCampaignActiveById = (id) => async (dispatch) => {
  try {
    dispatch({ type: CAMPAIGN_TYPES.LOADING_CAMPAIGN, payload: true });
    const res = await getDataAPI(`get-campaign/${id}`);
    console.log(res);

    dispatch({
      type: CAMPAIGN_TYPES.GET_CAMPAIGN_ID,
      payload: res.data.result.campaign,
    });
    dispatch({ type: CAMPAIGN_TYPES.LOADING_CAMPAIGN, payload: false });
  } catch (error) {
    console.log(error);
  }
};
export const createCampaign = (data) => async (dispatch) => {
  try {
    // dispatch({ type: CAMPAIGN_TYPES.LOADING_CAMPAIGN, payload: true });
    const res = await postDataAPI("create-campaign", data);
    dispatch({ type: CAMPAIGN_TYPES.LOADING_CAMPAIGN, payload: false });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.msg },
    });
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {},
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateCampaign =
  ({ id, data }) =>
  async (dispatch) => {
    try {
      dispatch({ type: CAMPAIGN_TYPES.LOADING_CAMPAIGN, payload: true });
      const res = await patchDataAPI(`update-campaign/${id}`, data);
      console.log(res);
      dispatch({ type: CAMPAIGN_TYPES.LOADING_CAMPAIGN, payload: false });
    } catch (error) {}
  };
