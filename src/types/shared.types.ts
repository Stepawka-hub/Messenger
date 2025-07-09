import { Id, ToastContent, ToastOptions } from "react-toastify";

export type TPagination = {
  currentPage: number;
  pageSize: number;
};

export type TPhotos = {
  small: string | null;
  large: string | null;
};

export type TContacts = {
  vk: string;
  facebook: string;
  twitter: string;
  instagram: string;
  github: string;
};

export type TUserFilter = "all" | "friends" | "nofriends";

export type TSocketStatus = "pending" | "ready" | "error";

export type TToast = {
  type: "error" | "info" | "success" | "warning";
  content?: ToastContent;
  options?: ToastOptions;
};
export type TToastId = Id;
export type TToastWithKey = TToast & {
  id: TToastId;
};
