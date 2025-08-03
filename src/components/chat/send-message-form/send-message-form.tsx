import { FC } from "react";
import { useForm } from "react-hook-form";
import { useSubmitOnEnter } from "@hooks";
import {
  maxLengthValidation,
  requiredValidation,
} from "@utils/helpers";
import { SendMessageFormProps, TSendMessageForm } from "./types";
import { SendIcon } from "@icons";
import { Textarea } from "@ui/form-elements";
import { IconButton } from "@ui/icon-button";
import s from "./send-message-form.module.css";

export const SendMessageForm: FC<SendMessageFormProps> = ({
  disabled = false,
  maxLength = 128,
  onSubmit,
}) => {
  const { register, handleSubmit, formState, reset } =
    useForm<TSendMessageForm>({
      mode: "onChange",
    });
  const { isValid } = formState;

  const handleSubmitForm = handleSubmit((formData) => {
    onSubmit(formData);
    reset();
  });

  const { handleKeyDown } = useSubmitOnEnter({
    onSubmit: handleSubmitForm,
  });

  return (
    <form className={s.form} onSubmit={handleSubmitForm}>
      <div className={s.textareaContainer}>
        <Textarea
          id="new-message"
          placeholder="Сообщение..."
          {...register("message", {
            ...requiredValidation(),
            ...maxLengthValidation(maxLength),
          })}
          onKeyDown={handleKeyDown}
        />
        <IconButton
          aria-label="Отправить"
          title="Отправить"
          extraClass={s.submit}
          disabled={!isValid || disabled}
        >
          <SendIcon />
        </IconButton>
      </div>
    </form>
  );
};
