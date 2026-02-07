import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

export const uploadCSV = (file, auth) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`${BASE_URL}upload/`, formData, {
    auth: {
      username: auth.username,
      password: auth.password,
    },
  });
};

export const getLatestSummary = (auth) => {
  return axios.get(`${BASE_URL}summary/latest/`, {
    auth: {
      username: auth.username,
      password: auth.password,
    },
  });
};

export const getHistory = (auth) => {
  return axios.get(`${BASE_URL}history/`, {
    auth: {
      username: auth.username,
      password: auth.password,
    },
  });
};
