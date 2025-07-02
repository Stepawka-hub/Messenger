import { AxiosInstance } from "axios";

export class BaseAPI {
  protected api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }
}
