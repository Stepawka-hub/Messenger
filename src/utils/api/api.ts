import axios, { AxiosInstance } from "axios";
import { TAuthUserData, TPhotos, TProfile, TUserId } from "src/types";
import {
  TGetCaptchaData,
  TGetUsersData,
  TLoginPayload,
  TResponse,
  TResponseWithData,
} from "./types";

const API_URL = process.env.VITE_API_URL;
const API_KEY = process.env.VITE_API_KEY;
export const SUCCESS_CODE = 0;

class BaseAPI {
  protected api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }
}

class UsersAPI extends BaseAPI {
  getUsers = async (currentPage = 1, pageSize = 10): Promise<TGetUsersData> => {
    const { data } = await this.api.get(
      `users?page=${currentPage}&count=${pageSize}`
    );
    return data;
  };

  followUser = async (userid: TUserId): Promise<TResponse> => {
    const { data } = await this.api.post(`follow/${userid}`);
    return data;
  };

  unfollowUser = async (userid: TUserId): Promise<TResponse> => {
    const { data } = await this.api.delete(`follow/${userid}`);
    return data;
  };
}

class ProfileAPI extends BaseAPI {
  getProfile = async (userid: TUserId): Promise<TProfile> => {
    const { data } = await this.api.get(`profile/${userid}`);
    return data;
  };

  getUserStatus = async (userid: TUserId): Promise<string> => {
    return await this.api.get(`profile/status/${userid}`);
  };

  updateUserStatus = async (status: string): Promise<TResponse> => {
    return await this.api.put(`profile/status`, { status });
  };

  updatePhoto = async (
    photoFile: File
  ): Promise<TResponseWithData<{ photos: TPhotos }>> => {
    const formData = new FormData();
    formData.append("image", photoFile);

    const { data } = await this.api.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  };

  updateProfile = async (profileData: TProfile): Promise<TResponse> => {
    const { data } = await this.api.put("profile", profileData);
    return data;
  };
}

class AuthAPI extends BaseAPI {
  me = async (): Promise<TResponseWithData<TAuthUserData>> => {
    const { data } = await this.api.get("auth/me");
    return data;
  };

  login = async (formData: TLoginPayload): Promise<TResponse> => {
    const { data } = await this.api.post("auth/login", { ...formData });
    return data;
  };

  logout = async (): Promise<TResponse> => {
    const { data } = await this.api.delete("auth/login");
    return data;
  };
}

class SecurityAPI extends BaseAPI {
  getCaptchaURL = async (): Promise<TGetCaptchaData> => {
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
