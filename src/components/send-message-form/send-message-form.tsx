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
import { SendIcon } from "@icons";

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
    console.log("SUBMIT");
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
          placeholder="Send message..."
          {...register("message", {
            ...requiredValidation(),
            ...maxLengthValidation(1024),
          })}
          onKeyDown={handleKeyDown}
        />
        <Button className={s.submit} disabled={!isValid || disabled}>
          <SendIcon />
        </Button>
      </div>
    </form>
  );
};
