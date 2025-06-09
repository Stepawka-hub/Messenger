import { Button } from "@components/common/button";
import { FC } from "react";
import { SendMessageFormProps, TSendMessageForm } from "./types";
import s from "./send-message-form.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@components/form-elements";

export const SendMessageForm: FC<SendMessageFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState, reset } =
    useForm<TSendMessageForm>({
      mode: "onChange",
    });
  const error = formState.errors.message?.message;

  const handleFormSubmit: SubmitHandler<TSendMessageForm> = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <Input
        id="new-message"
        type="text"
        placeholder="Send message..."
        error={error}
        {...register("message", {
          required: "This field is required!",
          maxLength: {
            value: 1024,
            message: "Maximum number of characters exceeded",
          },
        })}
      />
      <Button children="Отправить" className={s.submit} />
    </form>
  );
};
