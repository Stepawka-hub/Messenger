import { LoginForm } from "@components/login-form";
import { TLoginForm } from "@components/login-form/types";
import { useTitle } from "@hooks/useTitle";
import { getCaptchaUrl, getIsLoggingIn, getLoginError } from "@slices/auth";
import { useDispatch, useSelector } from "@store";
import { loginUserAsync } from "@thunks/auth";
import { FC } from "react";
import { SubmitHandler } from "react-hook-form";
import s from "./login.module.css";

export const Login: FC = () => {
  const dispatch = useDispatch();
  const isLogginIn = useSelector(getIsLoggingIn);
  const error = useSelector(getLoginError);
  const captchaUrl = useSelector(getCaptchaUrl);
  useTitle("Login");

  const onSubmit: SubmitHandler<TLoginForm> = async (formData) => {
    await dispatch(loginUserAsync(formData)).unwrap();
    localStorage.setItem("login-email", formData.email);
  };

  return (
    <section className={s.page}>
      <LoginForm
        isLogginIn={isLogginIn}
        error={error}
        captchaUrl={captchaUrl}
        onSubmit={onSubmit}
      />
    </section>
  );
};
