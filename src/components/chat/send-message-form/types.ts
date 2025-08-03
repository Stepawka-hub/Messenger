import { SubmitHandler } from "react-hook-form";

export type SendMessageFormProps = {
  disabled?: boolean;
  maxLength?: number;
  onSubmit: SubmitHandler<TSendMessageForm>;
};

export type TSendMessageForm = {
  message: string;
};
