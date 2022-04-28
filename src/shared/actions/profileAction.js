import { getDataAPI, patchDataAPI } from "../../service/BaseApi";
import { GLOBALTYPES } from "./globalTypes";

export const PROFILE_TYPES = {
  GET_PROFILES: "GET_PROFILES",
  GET_PROFILE: "GET_PROFILE",
  GET_PROFILE_CAMPAIGN: "GET_PROFILE_CAMPAIGN",
  UPDATE_PROFILE: "UPDATE_PROFILE",
  LOADING: "LOADING",
};

export const getProfiles = (page) => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
    const res = await getDataAPI(`all-profiles?page=${page}`);
    dispatch({
      type: PROFILE_TYPES.GET_PROFILES,
      payload: { data: res.data.result.profiles, count: res.data.result.count },
    });
    dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
    const res = await getDataAPI(`get-profile/${id}`);
    dispatch({
      type: PROFILE_TYPES.GET_PROFILE,
      payload: res.data.result,
    });
    dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
  } catch (error) {
    dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
  }
};

export const getProfileByCampaign = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
    const res = await getDataAPI(`get-campaign/${id}`);
    console.log(res);
    dispatch({
      type: PROFILE_TYPES.GET_PROFILE_CAMPAIGN,
      payload: {
        title: res.data.result.campaign[0].title,
        profiles: res.data.result.campaign[0].profiles,
      },
    });
    dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
  } catch (error) {}
};

export const changeStepSingle =
  ({ id, e, date, time }) =>
  async (dispatch) => {
    try {
      dispatch({ type: PROFILE_TYPES.LOADING, payload: true });

      const ress = await patchDataAPI(`change-step-profile/${id}`, {
        step: e,
        date,
        time,
      });
      dispatch({
        type: PROFILE_TYPES.UPDATE_PROFILE,
        payload: ress.data.result,
      });
      dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: ress.data.msg },
      });
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    } catch (error) {
      console.log(error);
    }
  };

export const changeStatus =
  ({ id, e, valueReject }) =>
  async (dispatch) => {
    console.log({ id, e });
    try {
      dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
      const ress = await patchDataAPI(`change-status-profile/${id}`, {
        status: e,
        reason: valueReject,
      });
      console.log(ress);
      dispatch({
        type: PROFILE_TYPES.UPDATE_PROFILE,
        payload: ress.data.result,
      });
      dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: ress.data.msg },
      });
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    } catch (error) {
      console.log(error);
    }
  };

export const filterProfiles = (value) => async (dispatch) => {
  try {
    const res = await getDataAPI(`all-profiles?filter=${value}`);
    dispatch({
      type: PROFILE_TYPES.GET_PROFILES,
      payload: { data: res.data.result.profiles, count: res.data.result.count },
    });
  } catch (error) {}
};
