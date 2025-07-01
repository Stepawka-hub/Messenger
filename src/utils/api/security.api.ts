import api from './api';
import { BaseAPI } from "./base.api";
import { TGetCaptchaData } from "./types";

class SecurityAPI extends BaseAPI {
  getCaptchaURL = async (): Promise<TGetCaptchaData> => {
    const { data } = await this.api.get<TGetCaptchaData>(
      "security/get-captcha-url"
    );
    return data;
  };
}

export const securityAPI = new SecurityAPI(api);