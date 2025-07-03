import { TDialog, TMessage, TUserId } from "@types";
import api from "./api";
import { BaseAPI } from "./base.api";
import { TGetMessageResponse } from "./types";

class DialogsAPI extends BaseAPI {
  // responseCode === 0
  startDialog = async (userId: TUserId) => {
    const { data } = await this.api.put(`dialogs/${userId}`);
    console.log(data);
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
    console.log(data.items);
    return data.items;
  };

  sendMessage = async (userId: TUserId, message: string) => {
    const { data } = await this.api.post(`dialogs/${userId}/messages`, {
      body: message,
    });
    console.log(data);
    return data;
  };
}

export const dialogsAPI = new DialogsAPI(api);
