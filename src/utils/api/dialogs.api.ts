import { TDialog, TMessage, TUserId } from "@types";
import api from "./api";
import { BaseAPI } from "./base.api";
import {
  TGetMessageResponse,
  TGetMessagesParams,
  TGetMessagesPayload,
  TGetNewMessagesParams,
  TGetNewMessagesPayload,
  TResponse,
  TResponseWithData,
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
  }: TGetMessagesPayload): Promise<TGetMessageResponse> => {
    const params: TGetMessagesParams = {
      page: currentPage,
      count: pageSize,
    };

    const { data } = await this.api.get<TGetMessageResponse>(
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

  getMessageViewStatus = async (messageId: number) => {
    const { data } = await this.api.get(`dialogs/messages/${messageId}/viewed`);
    console.log(data);
    return data;
  };

  addMessageToSpam = async (messageId: number) => {
    const { data } = await this.api.post(`dialogs/messages/${messageId}/spam`);
    console.log(data);
    return data;
  };

  deleteMessage = async (messageId: number) => {
    const { data } = await this.api.delete(`dialogs/messages/${messageId}`);
    console.log(data);
    return data;
  };

  restoreMessage = async (messageId: number) => {
    const { data } = await this.api.put(
      `dialogs/messages/${messageId}/restore`
    );
    console.log(data);
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
