import { TErrorMessage } from '@types';
import { SubmitHandler } from 'react-hook-form';

export type LoginFormProps = {
  isLogginIn: boolean;
  error: TErrorMessage;
  captchaUrl: string | null;
  onSubmit: SubmitHandler<TLoginForm>;
};

export type TLoginForm = {
  email: string;
  password: string;
  captcha: string;
};
