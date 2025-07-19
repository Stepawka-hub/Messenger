import { TErrorMessage, TMessage, TPagination, TUserId } from "@types";

// Base
export type TResponse = TResponseWithData<object>;

export type TResponseWithData<T extends object> = {
  resultCode: number;
  messages: string[];
  data: T;
};

export type TGetItemsDataResponse<T> = {
  items: T[];
  totalCount: number;
};

// Users
export type TGetUsersParams = {
  page: number;
  count: number;
  term?: string;
  friend?: boolean;
};

export type TGetUsersPayload = TPagination & {
  term?: string;
  friend?: boolean | null;
};

// Login
export type TGetCaptchaDataResponse = {
  url: string;
};

export type TLoginPayload = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: string;
};

// Dialogs
export type TSendMessagePayload = {
  userId: TUserId;
  message: string;
};

// Fetch messages
export type TGetMessageResponse = {
  totalCount: number;
  items: TMessage[];
  error: TErrorMessage;
};

export type TGetMessagesParams = {
  page: number;
  count: number;
};

export type TGetMessagesPayload = TPagination & {
  userId: TUserId;
};

// New messages
export type TGetNewMessagesParams = {
  newerThen: string;
};

export type TGetNewMessagesPayload = {
  userId: TUserId;
  date: string;
};
