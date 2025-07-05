import { TDialog, TMessage, TUserId } from "@types";
import api from "./api";
import { BaseAPI } from "./base.api";
import { TGetMessageResponse, TResponse, TResponseWithData } from "./types";

class DialogsAPI extends BaseAPI {
  startDialog = async (userId: TUserId): Promise<TResponse> => {
    const { data } = await this.api.put<TResponse>(`dialogs/${userId}`);
    return data;
  };

  getDialogs = async (): Promise<TDialog[]> => {
    const { data } = await this.api.get<TDialog[]>(`dialogs`);
    return data;
  };

  getMessages = async (userId: TUserId): Promise<TMessage[]> => {
    const { data } = await this.api.get<TGetMessageResponse>(
      `dialogs/${userId}/messages`
    );
    return data.items;
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
}

export const dialogsAPI = new DialogsAPI(api);
