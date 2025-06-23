import { Button } from "@ui/button";
import { Input } from "@ui/form-elements";
import { FC } from "react";
import { useForm } from "react-hook-form";
import s from "./login-form.module.css";
import { LoginFormProps, TLoginForm } from "./types";
import { EMAIL_REGEX } from "@utils/helpers/validate-helpers";

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
      <h2 className={s.title}>Login</h2>

      <fieldset className={s.fieldset}>
        <Input
          id="email"
          type="text"
          label="Email"
          placeholder="Enter email..."
          autoComplete="email"
          error={emailError}
          {...register("email", {
            required: "This field is required!",
            pattern: {
              value: EMAIL_REGEX,
              message: "Invalid email address",
            },
          })}
        />

        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="Enter password..."
          autoComplete="current-password"
          error={passwordError}
          {...register("password", {
            required: "This field is required!",
            minLength: {
              value: 5,
              message: "The minimum length of this field is 5",
            },
          })}
        />

        {captchaUrl && (
          <div className={s.captchaContainer}>
            <Input
              id="captcha"
              label="Captcha"
              type="text"
              placeholder="Enter captcha..."
              {...register("captcha")}
            />
            <img className={s.captcha} src={captchaUrl} alt="Captcha" />
          </div>
        )}
      </fieldset>

      {error && <span className={s.formError}>{error}</span>}

      <Button className={s.submit} disabled={isLogginIn}>
        {isLogginIn ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};
