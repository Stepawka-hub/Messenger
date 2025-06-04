import { Button } from "@components/common/button";
import { FC } from "react";
import { SendMessageFormProps } from "./type";
import s from "./send-message-form.module.css";

// const Textarea = FormControl("textarea");
// const maxLength = maxLengthValidate(1024);

export const SendMessageForm: FC<SendMessageFormProps> = ({ handleSubmit }) => {
  return (
    <form className={s.form} onSubmit={handleSubmit}>
      {/* <Field
        id="new-message-text"
        name="new-message-text"
        component={Textarea}
        classElement={`textarea ${s.textarea}`}
        placeholder="Введите сообщение..."
        validate={[required, maxLength]}
      /> */}
      <Button children="Отправить" className={s.submit} />
    </form>
  );
};
