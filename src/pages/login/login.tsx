import { LoginForm } from "@components/login-form";
import { useTitle } from "@hooks/useTitle";
import { getCaptchaUrl } from "@slices/auth";
import { useDispatch, useSelector } from "@store";
import { getCaptchaAsync, loginUserAsync } from "@thunks/auth";
import { TLoginPayload } from "@utils/api/types";
import { FC, useEffect } from "react";
import s from "./login.module.css";

export const Login: FC = () => {
  const dispatch = useDispatch();
  const captchaUrl = useSelector(getCaptchaUrl);
  useTitle("Login");

  useEffect(() => {
    dispatch(getCaptchaAsync());
  }, []);

  const onSubmit = (formData: TLoginPayload) => {
    dispatch(loginUserAsync(formData));
  };

  return (
    <section className={s.page}>
      <LoginForm captchaUrl={captchaUrl} />
    </section>
  );
};
