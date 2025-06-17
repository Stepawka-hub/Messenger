import { useSubmitOnEnter } from "@hooks/useSubmitOnEnter";
import { Button } from "@ui/button";
import { Textarea } from "@ui/form-elements";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import s from "./add-post-form.module.css";
import { AddPostFormProps, TAddPostForm } from "./types";

export const AddPostForm: FC<AddPostFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, reset, formState } = useForm<TAddPostForm>({
    mode: "onChange",
  });
  const error = formState.errors.postText?.message;

  const handleFormSubmit: SubmitHandler<TAddPostForm> = (formData) => {
    reset();
    onSubmit(formData);
  };

  const { handleKeyDown } = useSubmitOnEnter({
    onSubmit: () => handleSubmit(handleFormSubmit)(),
  });

  return (
    <form
      className={s.form}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Textarea
        id="post-text"
        classes={{ textarea: s.textarea }}
        placeholder="Что у вас нового?"
        error={error}
        {...register("postText", {
          required: "This field is required!",
          maxLength: {
            value: 255,
            message: "Maximum number of characters exceeded",
          },
        })}
        onKeyDown={handleKeyDown}
      />

      <Button className={s.submit}>Отправить</Button>
    </form>
  );
};
