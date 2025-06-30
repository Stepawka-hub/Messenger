import axios, { AxiosInstance } from "axios";
import { TAuthUserData, TPhotos, TProfile, TUserId } from "src/types";
import {
  TGetCaptchaData,
  TGetUsersData,
  TLoginPayload,
  TResponse,
  TResponseWithData,
} from "./types";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
export const API_CODES = {
  SUCCESS: 0,
  CAPTCHA_REQUIRED: 10,
} as const;

class BaseAPI {
  protected api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }
}

class UsersAPI extends BaseAPI {
  getUsers = async (
    currentPage = 1,
    pageSize = 10,
    term: string,
    friend: boolean
  ): Promise<TGetUsersData> => {
    const { data } = await this.api.get<TGetUsersData>(
      `users?page=${currentPage}&count=${pageSize}&term=${term}&friend=${friend}`,
      { withCredentials: true }
    );

    return data;
  };

  followUser = async (userid: TUserId): Promise<TResponse> => {
    const { data } = await this.api.post<TResponse>(`follow/${userid}`);
    return data;
  };

  unfollowUser = async (userid: TUserId): Promise<TResponse> => {
    const { data } = await this.api.delete<TResponse>(`follow/${userid}`);
    return data;
  };
}

class ProfileAPI extends BaseAPI {
  getProfile = async (userid: TUserId): Promise<TProfile> => {
    const { data } = await this.api.get<TProfile>(`profile/${userid}`);
    return data;
  };

  getUserStatus = async (userid: TUserId): Promise<string> => {
    const { data } = await this.api.get<string>(`profile/status/${userid}`);
    return data;
  };

  updateUserStatus = async (status: string): Promise<TResponse> => {
    const { data } = await this.api.put<TResponse>(`profile/status`, {
      status,
    });
    return data;
  };

  updatePhoto = async (
    photoFile: File
  ): Promise<TResponseWithData<{ photos: TPhotos }>> => {
    const formData = new FormData();
    formData.append("image", photoFile);

    const { data } = await this.api.put<TResponseWithData<{ photos: TPhotos }>>(
      `profile/photo`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  };

  updateProfile = async (profileData: TProfile): Promise<TResponse> => {
    const { data } = await this.api.put<TResponse>("profile", profileData);
    return data;
  };
}

class AuthAPI extends BaseAPI {
  me = async (): Promise<TResponseWithData<TAuthUserData>> => {
    const { data } = await this.api.get<TResponseWithData<TAuthUserData>>(
      "auth/me"
    );
    return data;
  };

  login = async (formData: TLoginPayload): Promise<TResponse> => {
    const { data } = await this.api.post<TResponse>("auth/login", {
      ...formData,
    });
    return data;
  };

  logout = async (): Promise<TResponse> => {
    const { data } = await this.api.delete<TResponse>("auth/login");
    return data;
  };
}

class SecurityAPI extends BaseAPI {
  getCaptchaURL = async (): Promise<TGetCaptchaData> => {
    const { data } = await this.api.get<TGetCaptchaData>(
      "security/get-captcha-url"
    );
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
