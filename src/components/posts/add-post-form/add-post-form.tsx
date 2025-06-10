import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddPostFormProps, TAddPostForm } from "./types";
import s from "./add-post-form.module.css";
import { Button } from "@ui/button";
import { Input } from "@ui/form-elements";

export const AddPostForm: FC<AddPostFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, reset, formState } = useForm<TAddPostForm>({
    mode: "onChange",
  });
  const error = formState.errors.postText?.message;

  const handleFormSubmit: SubmitHandler<TAddPostForm> = (formData) => {
    reset();
    onSubmit(formData);
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <Input
        id="post-text"
        type="text"
        classes={{ input: s.input }}
        placeholder="Что у вас нового?"
        error={error}
        {...register("postText", {
          required: "This field is required!",
          maxLength: {
            value: 255,
            message: "Maximum number of characters exceeded",
          },
        })}
      />

      <Button className={s.submit}>Отправить</Button>
    </form>
  );
};
