import { SEND_MESSAGE } from "./actionTypes";

export const sendMessageAC = (newMessageText) => ({
  type: SEND_MESSAGE,
  newMessageText,
});
