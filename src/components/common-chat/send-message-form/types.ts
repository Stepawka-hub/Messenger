import { SubmitHandler } from "react-hook-form";

export type SendMessageFormProps = {
  onSubmit: SubmitHandler<TSendMessageForm>;
};

export type TSendMessageForm = {
  message: string;
};
