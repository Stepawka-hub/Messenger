import { API_KEY, API_URL } from "../utils/constants";
import axios from "axios";

class UsersAPI {
  constructor(api) {
    this.api = api;
  }

  getUsers = (currentPage = 1, pageSize = 10) => {
    return this.api
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((res) => res.data);
  }
  
  followUser = (userid) => {
    return this.api
      .post(`follow/${userid}`)
      .then((res) => res.data);
  }
  
  unfollowUser = (userid) => {
    return this.api
      .delete(`follow/${userid}`)
      .then((res) => res.data);
  }
  
  getProfile = (userid) => {
    return this.api
      .get(`profile/${userid}`)
      .then((res) => res.data);
  }
}

class AuthAPI {
  constructor(api) {
    this.api = api;
  }

  me = () => {
    return this.api
    .get(`auth/me`)
    .then((res) => res.data)
  }
}

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "API-KEY": API_KEY,
  },
});

export const usersAPI = new UsersAPI(api);
export const authAPI = new AuthAPI(api);

