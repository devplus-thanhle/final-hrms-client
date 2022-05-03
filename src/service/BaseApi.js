import axios from "axios";

export const login = (user) => {
  const res = axios.post("/api/login", {
    email: user.username,
    password: user.password
  })
  return res;
};
export const getDataAPI = async (url, token) => {
  const res = await axios.get(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};
export const postDataAPI = async (url, data, token) => {
  const res = await axios.post(`/api/${url}`, data, {
    headers: { Authorization: token },
  });
  return res;
};
export const putDataAPI = async (url, data, token) => {
  const res = await axios.put(`/api/${url}`, data, {
    headers: { Authorization: token },
  });
  return res;
};
export const patchDataAPI = async (url, data, token) => {
  const res = await axios.patch(`/api/${url}`, data, {
    headers: { Authorization: token },
  });
  return res;
};
export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};
