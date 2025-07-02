import { TAuthUserData } from "@types";
import { BaseAPI } from "./base.api";
import { TLoginPayload, TResponse, TResponseWithData } from "./types";
import api from "./api";

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

export const authAPI = new AuthAPI(api);
