// import axios from "axios";

// export const apiUrl = import.meta.env.VITE_API_URL;

// const apiInstance = axios.create({
//   baseURL: apiUrl,
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//   },
// });

// // Response interceptor
// apiInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//       localStorage.clear();
//       window.location.reload();
//     }
//     return Promise.reject(error);
//   }
// );

// export const services = {
//   get: (url, params = {}) => apiInstance.get(url, { params }),
//   post: (url, data) => apiInstance.post(url, data),
//   put: (url, data) => apiInstance.put(url, data),
//   delete: (url) => apiInstance.delete(url),
// };


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
