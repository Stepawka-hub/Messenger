import { Helmet } from "@components/helmet";
import { LoginForm } from "@components/login-form";
import { TLoginForm } from "@components/login-form/types";
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

  const onSubmit: SubmitHandler<TLoginForm> = async (formData) => {
    await dispatch(loginUserAsync(formData)).unwrap();
    localStorage.setItem("login-email", formData.email);
  };

  return (
    <>
      <Helmet
        title="Вход"
        description="Войдите, чтобы общаться с друзьями, делиться новостями и оставаться на связи с важными для вас людьми"
      />
      <section className={s.page}>
        <LoginForm
          isLogginIn={isLogginIn}
          error={error}
          captchaUrl={captchaUrl}
          onSubmit={onSubmit}
        />
      </section>
    </>
  );
};
