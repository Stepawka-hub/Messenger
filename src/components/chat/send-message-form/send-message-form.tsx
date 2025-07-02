import { useSubmitOnEnter } from "@hooks/useSubmitOnEnter";
import { getStatus } from "@slices/dialogs";
import { useDispatch, useSelector } from "@store";
import { sendMessageAsync } from "@thunks/chat";
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
  const status = useSelector(getStatus);

  const { register, handleSubmit, formState, reset } =
    useForm<TSendMessageForm>({
      mode: "onChange",
    });
  const error = formState.errors.message?.message;

  const onSubmit: SubmitHandler<TSendMessageForm> = ({ message }) => {
    dispatch(sendMessageAsync(message));
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
      <Button className={s.submit} disabled={status !== "ready"}>
        Отправить
      </Button>
    </form>
  );
};
