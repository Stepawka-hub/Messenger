import { TBaseMessage, TDialog, TMessage, TUserId } from "@types";
import api from "./api";
import { BaseAPI } from "./base.api";
import {
  TGetItemsDataResponse,
  TGetMessagesParams,
  TGetMessagesPayload,
  TGetNewMessagesParams,
  TGetNewMessagesPayload,
  TResponse,
  TResponseWithData
} from "./types";

class DialogsAPI extends BaseAPI {
  startDialog = async (userId: TUserId): Promise<TResponse> => {
    const { data } = await this.api.put<TResponse>(`dialogs/${userId}`);
    return data;
  };

  getDialogs = async (): Promise<TDialog[]> => {
    const { data } = await this.api.get<TDialog[]>(`dialogs`);
    return data;
  };

  getMessages = async ({
    userId,
    currentPage = 1,
    pageSize = 10,
  }: TGetMessagesPayload): Promise<TGetItemsDataResponse<TBaseMessage>> => {
    const params: TGetMessagesParams = {
      page: currentPage,
      count: pageSize,
    };

    const { data } = await this.api.get<TGetItemsDataResponse<TBaseMessage>>(
      `dialogs/${userId}/messages`,
      { params }
    );
    return data;
  };

  sendMessage = async (
    userId: TUserId,
    message: string
  ): Promise<TResponseWithData<{ message: TMessage }>> => {
    const { data } = await this.api.post<
      TResponseWithData<{ message: TMessage }>
    >(`dialogs/${userId}/messages`, {
      body: message,
    });
    return data;
  };

  getMessageViewStatus = async (messageId: string) => {
    const { data } = await this.api.get(`dialogs/messages/${messageId}/viewed`);
    return data;
  };

  deleteMessage = async (messageId: string): Promise<TResponse> => {
    const { data } = await this.api.delete<TResponse>(
      `dialogs/messages/${messageId}`
    );
    return data;
  };

  restoreMessage = async (messageId: string): Promise<TResponse> => {
    const { data } = await this.api.put<TResponse>(
      `dialogs/messages/${messageId}/restore`
    );
    return data;
  };

  getNewMessageCount = async () => {
    const { data } = await this.api.get(`dialogs/messages/new/count`);
    return data;
  };

  getNewMessages = async ({ userId, date }: TGetNewMessagesPayload) => {
    const params: TGetNewMessagesParams = {
      newerThen: date,
    };

    const { data } = await this.api.get(`dialogs/${userId}/messages/new`, {
      params,
    });
    console.log(data);
    return data;
  };
}

export const dialogsAPI = new DialogsAPI(api);
