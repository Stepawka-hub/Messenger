import { TUserId } from "@types";
import { BaseAPI } from "./base.api";
import { TGetUsersData, TGetUsersParams, TResponse } from "./types";
import api from "./api";

class UsersAPI extends BaseAPI {
  getUsers = async (
    currentPage = 1,
    pageSize = 10,
    term: string,
    friend: boolean | null
  ): Promise<TGetUsersData> => {
    const params: TGetUsersParams = {
      page: currentPage,
      count: pageSize,
      ...(term ? { term } : {}),
      ...(friend !== null ? { friend } : {}),
    };

    const { data } = await this.api.get<TGetUsersData>(`users`, {
      params,
      withCredentials: true,
    });

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

export const usersAPI = new UsersAPI(api);
