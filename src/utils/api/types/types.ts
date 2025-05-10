import { TUser } from "src/types";

export type TResponse = TResponseWithData<object>;

export type TResponseWithData<T extends object> = {
  resultCode: number;
  messages: string[];
  data: T;
};

export type TGetUsersData = {
  items: TUser[];
  totalCount: number;
};

export type TGetCaptchaData = {
  url: string;
};

export type TLoginPayload = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: boolean;
};
