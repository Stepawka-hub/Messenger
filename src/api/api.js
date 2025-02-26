import { API_URL } from "../utils/constants";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

class BaseAPI {
  constructor(api) {
    this.api = api;
  }
}

class UsersAPI extends BaseAPI {
  getUsers = async (currentPage = 1, pageSize = 10) => {
    const { data } = await this.api.get(`users?page=${currentPage}&count=${pageSize}`);
    return data;
  };

  followUser = async (userid) => {
    const { data } = await this.api.post(`follow/${userid}`);
    return data;
  };

  unfollowUser = async (userid) => {
    const { data } = await this.api.delete(`follow/${userid}`);
    return data;
  };
}

class ProfileAPI extends BaseAPI {
  getProfile = async (userid) => {
    const { data } = await this.api.get(`profile/${userid}`);
    return data;
  };

  getUserStatus = async (userid) => {
    return await this.api.get(`profile/status/${userid}`);
  }

  updateUserStatus = async (status) => {
    return await this.api.put(`profile/status`, { status });
  };

  updatePhoto = async (photoFile) => {
    const formData = new FormData();
    formData.append("image", photoFile);
    
    const { data } = await this.api
      .put(`profile/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    return data;
  };

  updateProfile = async (profileData) => {
    const { data } = await this.api.put("profile", profileData);
    return data;
  };
}

class AuthAPI extends BaseAPI {
  me = async () => {
    const { data } = await this.api.get("auth/me");
    return data;
  };

  login = async (formData) => {
    const { data } = await this.api.post("auth/login", { ...formData });
    return data;
  };

  logout = async () => {
    const { data } = await this.api.delete("auth/login");
    return data;
  };
}

class SecurityAPI extends BaseAPI {
  getCaptchaURL = async () => {
    const { data } = await this.api.get("security/get-captcha-url");
    return data;
  };
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
