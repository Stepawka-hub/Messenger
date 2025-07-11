import { useDispatch } from "@store";
import { updateProfileStatusAsync } from "@thunks/profile";
import { Button } from "@ui/button";
import { Input } from "@ui/form-elements";
import { maxLengthValidation } from "@utils/helpers/validate-helpers";
import clsx from "clsx";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import s from "./profile-status-form.module.css";
import { ProfileStatusFormProps, TProfileStatusForm } from "./type";
import { CheckIcon, CrossIcon } from "@icons";

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
        <Button className={clsx(s.button, s.submit)} type="submit">
          <CheckIcon />
        </Button>
        <Button className={clsx(s.button, s.cancel)} onClick={callback}>
          <CrossIcon />
        </Button>
      </div>
    </form>
  );
};
