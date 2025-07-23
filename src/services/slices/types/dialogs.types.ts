export type TSetDeletedPayload = {
  messageId: string;
  value: boolean;
};

export type TSetDialogActivityDatePayload = {
  dialogId: number;
  date: string;
}