export const URL_REGEX = /^(ftp|http|https):\/\/[^ "]+$/;
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const isValidUrl = (value: string) => value && URL_REGEX.test(value);

export const minLengthValidation = (minLength: number, message?: string) => ({
  minLength: {
    value: minLength,
    message: message || `Минимальная длина поля: ${minLength}`,
  },
});

export const maxLengthValidation = (maxLength: number, message?: string) => ({
  maxLength: {
    value: maxLength,
    message: message || `Максимальная длина поля: ${maxLength}`,
  },
});

export const requiredValidation = (
  message: string = "Обязательное поле"
) => ({
  required: message,
});

export const urlValidation = (message: string = "Некорректная ссылка") => ({
  pattern: {
    value: URL_REGEX,
    message,
  },
});

export const emailValidation = (message: string = "Некорректный адрес почты") => ({
  pattern: {
    value: EMAIL_REGEX,
    message,
  },
});
