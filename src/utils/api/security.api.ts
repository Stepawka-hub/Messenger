import api from "./api";
import { BaseAPI } from "./base.api";
import { TGetCaptchaDataResponse } from "./types";

class SecurityAPI extends BaseAPI {
  getCaptchaURL = async (): Promise<TGetCaptchaDataResponse> => {
    const { data } = await this.api.get<TGetCaptchaDataResponse>(
      "security/get-captcha-url"
    );
    return data;
  };
}

export const securityAPI = new SecurityAPI(api);
