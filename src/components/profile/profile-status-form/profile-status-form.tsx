import { CheckIcon, CrossIcon } from "@icons";
import { useDispatch } from "@store";
import { updateProfileStatusAsync } from "@thunks/profile";
import { Input } from "@ui/form-elements";
import { IconButton } from "@ui/icon-button";
import { maxLengthValidation } from "@utils/helpers/validate-helpers";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import s from "./profile-status-form.module.css";
import { ProfileStatusFormProps, TProfileStatusForm } from "./type";
import clsx from "clsx";

export const ProfileStatusForm: FC<ProfileStatusFormProps> = ({
  initialValue,
  callback,
}) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm<TProfileStatusForm>({
    mode: "onChange",
    defaultValues: {
      status: initialValue,
    },
  });
  const statusError = formState.errors.status?.message;

  const onSubmit: SubmitHandler<TProfileStatusForm> = ({ status }) => {
    dispatch(updateProfileStatusAsync(status));
    callback();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        classes={{
          wrapper: s.inputWrapper,
        }}
        className={s.input}
        error={statusError}
        {...register("status", { ...maxLengthValidation(300) })}
      />
      <div className={s.buttons}>
        <IconButton extraClass={clsx(s.button, s.submit)} type="submit">
          <CheckIcon />
        </IconButton>
        <IconButton extraClass={clsx(s.button, s.cancel)} onClick={callback}>
          <CrossIcon />
        </IconButton>
      </div>
    </form>
  );
};
