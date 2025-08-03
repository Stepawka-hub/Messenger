import { FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@ui/button";
import { Input } from "@ui/form-elements";
import {
  emailValidation,
  requiredValidation,
} from "@utils/helpers";
import { LoginFormProps, TLoginForm } from "./types";
import s from "./login-form.module.css";

export const LoginForm: FC<LoginFormProps> = ({
  isLogginIn,
  error,
  captchaUrl,
  onSubmit,
}) => {
  const { register, handleSubmit, formState } = useForm<TLoginForm>({
    mode: "onChange",
    defaultValues: {
      email: localStorage.getItem("login-email") || "",
    },
  });
  const { email, password } = formState.errors;
  const emailError = email?.message;
  const passwordError = password?.message;

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={s.title}>Вход</h2>

      <fieldset className={s.fieldset}>
        <Input
          id="email"
          type="text"
          label="Почта"
          placeholder="Почта..."
          autoComplete="email"
          error={emailError}
          {...register("email", {
            ...requiredValidation(),
            ...emailValidation(),
          })}
        />

        <Input
          id="password"
          type="password"
          label="Пароль"
          placeholder="Пароль..."
          autoComplete="current-password"
          error={passwordError}
          {...register("password", {
            ...requiredValidation(),
          })}
        />

        {captchaUrl && (
          <div className={s.captchaContainer}>
            <Input
              id="captcha"
              label="Captcha"
              type="text"
              placeholder="Код..."
              {...register("captcha")}
            />
            <img className={s.captcha} src={captchaUrl} alt="Captcha" />
          </div>
        )}
      </fieldset>

      {error && <span className={s.formError}>{error}</span>}

      <Button className={s.submit} disabled={isLogginIn}>
        {isLogginIn ? "Выполняется вход..." : "Войти"}
      </Button>
    </form>
  );
};
