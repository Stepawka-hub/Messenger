import { TDialog, TUserId } from "@types";
import api from "./api";
import { BaseAPI } from "./base.api";

class DialogsAPI extends BaseAPI {
  startDialog = async (userId: TUserId) => {
    const { data } = await this.api.put(`dialogs/${userId}`);
    console.log(data);
    return data;
  };

  getDialogs = async (): Promise<TDialog[]> => {
    const { data } = await this.api.get<TDialog[]>(`dialogs`);
    return data;
  };

  // getMessages = async (): Promise<> => {
  //   const { data } = await this.api.get<>()
  // }

  // sendMessage = async (): Promise<> => {

  // }
}

export const dialogsAPI = new DialogsAPI(api);
