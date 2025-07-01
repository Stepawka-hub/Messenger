import { TPhotos, TProfile, TUserId } from "@types";
import { BaseAPI } from "./base.api";
import { TResponse, TResponseWithData } from "./types";
import api from './api';

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

export const profileAPI = new ProfileAPI(api);
