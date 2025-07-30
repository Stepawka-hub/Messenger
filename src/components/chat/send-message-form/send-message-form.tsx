import { FC } from "react";
import { useForm } from "react-hook-form";
import { useSubmitOnEnter } from "@hooks";
import {
  maxLengthValidation,
  requiredValidation,
} from "@utils/helpers/validate-helpers";
import { SendMessageFormProps, TSendMessageForm } from "./types";
import { SendIcon } from "@icons";
import { Button } from "@ui/button";
import { Textarea } from "@ui/form-elements";
import s from "./send-message-form.module.css";

export const SendMessageForm: FC<SendMessageFormProps> = ({
  disabled = false,
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
            ...maxLengthValidation(1024),
          })}
          onKeyDown={handleKeyDown}
        />
        <Button
          aria-label="Отправить"
          title="Отправить"
          className={s.submit}
          disabled={!isValid || disabled}
        >
          <SendIcon />
        </Button>
      </div>
    </form>
  );
};
