import axios from "axios";

const rootURL = axios.defaults.baseURL;

export const promotionRequest = axios.create({
  withCredentials: true,
  baseURL: `${rootURL}/api/Promotion`,
});

export const accountRequest = axios.create({
  withCredentials: true,
  baseURL: `${rootURL}/api/Account`,
});
