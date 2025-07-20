

import axios from "axios";

export const apiUrl = import.meta.env.VITE_API_URL;
const header = {
  // "Content-Type": "application/json",
  // "Access-Control-Allow-Origin": "*",
  Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
};

export const services = {
  get: (url, params = {}) => {
    return axios.get(`${apiUrl}${url}`, { params, headers: header });
  },
  post: (url, data) => {
    return axios.post(`${apiUrl}${url}`, data, { headers: header });
  },
  put: (url, data) => {
    return axios.put(`${apiUrl}${url}`, data, { headers: header });
  },
  delete: (url) => {
    return axios.delete(`${apiUrl}${url}`, { headers: header });
  },
};
