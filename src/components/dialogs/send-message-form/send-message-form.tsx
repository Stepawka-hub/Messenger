import { Button } from "@ui/button";
import { Textarea } from "@ui/form-elements";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import s from "./send-message-form.module.css";
import { SendMessageFormProps, TSendMessageForm } from "./types";
import { useSubmitOnEnter } from '@hooks/useSubmitOnEnter';

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

  const { handleKeyDown } = useSubmitOnEnter({
    onSubmit: () => handleSubmit(handleFormSubmit)(),
  });

  return (
    <form className={s.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <Textarea
        id="new-message"
        placeholder="Send message..."
        error={error}
        {...register("message", {
          required: "This field is required!",
          maxLength: {
            value: 1024,
            message: "Maximum number of characters exceeded",
          },
        })}
        onKeyDown={handleKeyDown}
      />
      <Button className={s.submit}>Отправить</Button>
    </form>
  );
};
