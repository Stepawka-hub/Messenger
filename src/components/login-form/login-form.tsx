import { Button } from "@components/common/button";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormProps, TLoginForm } from "./types";
import s from "./login-form.module.css";
import { Input } from "@components/form-elements";

export const LoginForm: FC<LoginFormProps> = ({ captchaUrl }) => {
  const { register, handleSubmit, formState } = useForm<TLoginForm>({
    mode: "onChange",
  });
  const { email, password } = formState.errors;
  const emailError = email?.message;
  const passwordError = password?.message;

  const onSubmit: SubmitHandler<TLoginForm> = (data) => {
    console.log(data);
  };

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
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
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

      {/* {error && <FormError error={error} />} */}

      <Button className={s.submit}>Login</Button>
    </form>
  );
};
