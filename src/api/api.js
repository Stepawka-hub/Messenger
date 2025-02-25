import { API_URL } from "../utils/constants";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

class BaseAPI {
  constructor(api) {
    this.api = api;
  }
}

class UsersAPI extends BaseAPI {
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
}

class ProfileAPI extends BaseAPI  {
  getProfile = (userid) => {
    return this.api
      .get(`profile/${userid}`)
      .then((res) => res.data);
  }

  getUserStatus = (userid) => {
    return this.api.get(`profile/status/${userid}`);
  }

  updateUserStatus = (status) => {
    return this.api.put(`profile/status`, {status});
  }

  updatePhoto = (photoFile) => {
    const formData = new FormData();
    formData.append('image', photoFile)
    return this.api
    .put(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => res.data);
  }

  updateProfile = (profileData) => {
    return this.api
    .put('profile', profileData)
    .then(res => res.data);
  }
}

class AuthAPI extends BaseAPI  {
  me = () => {
    return this.api
      .get('auth/me')
      .then((res) => res.data);
  }

  login = (formData) => {
    return this.api
      .post('auth/login', {...formData})
      .then((res) => res.data);
  }

  logout = () => {
    return this.api
      .delete('auth/login')
      .then((res) => res.data);
  }
}

class SecurityAPI extends BaseAPI  {
  getCaptchaURL = () => {
    return this.api
      .get('security/get-captcha-url')
      .then(res => res.data)
  }
}

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "API-KEY": API_KEY,
  },
});

export const authAPI = new AuthAPI(api);
export const securityAPI = new SecurityAPI(api);
export const usersAPI = new UsersAPI(api);
export const profileAPI = new ProfileAPI(api);