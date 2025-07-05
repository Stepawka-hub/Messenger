import { SubmitHandler } from "react-hook-form";

export type SendMessageFormProps = {
  disabled?: boolean;
  onSubmit: SubmitHandler<TSendMessageForm>;
};

export type TSendMessageForm = {
  message: string;
};
