import { TGetItemsDataResponse } from "@api/types";
import { TBaseMessage } from "@types";

export type TSetDeletedPayload = {
  messageId: string;
  value: boolean;
};

export type TSetDialogActivityDatePayload = {
  dialogId: number;
  date: string;
};

export type TGetMessagesReturnValue = TGetItemsDataResponse<TBaseMessage> & {
  numberOfRead: number;
};
