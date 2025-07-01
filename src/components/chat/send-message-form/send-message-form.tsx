import { useSubmitOnEnter } from "@hooks/useSubmitOnEnter";
import { useDispatch } from "@store";
import { Button } from "@ui/button";
import { Textarea } from "@ui/form-elements";
import {
  maxLengthValidation,
  requiredValidation,
} from "@utils/helpers/validate-helpers";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import s from "./send-message-form.module.css";
import { TSendMessageForm } from "./types";

export const SendMessageForm: FC = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState, reset } =
    useForm<TSendMessageForm>({
      mode: "onChange",
    });
  const error = formState.errors.message?.message;

  const onSubmit: SubmitHandler<TSendMessageForm> = (formData) => {
    // dispatch(addMessage(formData.message));
    reset();
  };

  const { handleKeyDown } = useSubmitOnEnter({
    onSubmit: () => handleSubmit(onSubmit)(),
  });

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
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
