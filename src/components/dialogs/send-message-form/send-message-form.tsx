import { useSubmitOnEnter } from "@hooks/useSubmitOnEnter";
import { Button } from "@ui/button";
import { Textarea } from "@ui/form-elements";
import {
  maxLengthValidation,
  requiredValidation,
} from "@utils/helpers/validate-helpers";
import { FC } from "react";
import { useForm } from "react-hook-form";
import s from "./send-message-form.module.css";
import { SendMessageFormProps, TSendMessageForm } from "./types";

export const SendMessageForm: FC<SendMessageFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState, reset } =
    useForm<TSendMessageForm>({
      mode: "onChange",
    });
  const error = formState.errors.message?.message;

  const handleSubmitForm = handleSubmit((formData) => {
    onSubmit(formData);
    reset();
  });

  const { handleKeyDown } = useSubmitOnEnter({
    onSubmit: handleSubmitForm,
  });

  return (
    <form className={s.form} onSubmit={handleSubmitForm}>
      <Textarea
        id="new-message"
        placeholder="Send message..."
        error={error}
        {...register("message", {
          ...requiredValidation(),
          ...maxLengthValidation(1024),
        })}
        onKeyDown={handleKeyDown}
      />
      <Button className={s.submit}>Отправить</Button>
    </form>
  );
};
