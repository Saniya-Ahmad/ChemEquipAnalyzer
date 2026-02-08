import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

export const uploadCSV = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`${BASE_URL}upload/`, formData);
};

export const getLatestSummary = () => {
  return axios.get(`${BASE_URL}summary/latest/`);
};

export const getHistory = () => {
  return axios.get(`${BASE_URL}history/`);
};
