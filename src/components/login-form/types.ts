import { SubmitHandler } from 'react-hook-form';

export type LoginFormProps = {
  isLogginIn: boolean;
  error: string | null;
  captchaUrl: string | null;
  onSubmit: SubmitHandler<TLoginForm>;
};

export type TLoginForm = {
  email: string;
  password: string;
  captcha: string;
};
