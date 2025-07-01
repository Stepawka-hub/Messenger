import { TPagination, TSocialUser } from "@types";

export type TResponse = TResponseWithData<object>;

export type TResponseWithData<T extends object> = {
  resultCode: number;
  messages: string[];
  data: T;
};

export type TGetUsersData = {
  items: TSocialUser[];
  totalCount: number;
};

export type TGetCaptchaData = {
  url: string;
};

export type TLoginPayload = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: string;
};

export type TGetUsersPayload = TPagination & {
  term?: string;
  friend?: boolean | null;
};

export type TGetUsersParams = {
  page: number;
  count: number;
  term?: string;
  friend?: boolean;
};
