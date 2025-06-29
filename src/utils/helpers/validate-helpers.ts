export const URL_REGEX = /^(ftp|http|https):\/\/[^ "]+$/;
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const isValidUrl = (value: string) => value && URL_REGEX.test(value);

export const minLengthValidation = (minLength: number, message?: string) => ({
  minLength: {
    value: minLength,
    message: message || `The minimum length of this field is ${minLength}`,
  },
});

export const maxLengthValidation = (maxLength: number, message?: string) => ({
  maxLength: {
    value: maxLength,
    message: message || `The maximum length of this field is ${maxLength}`,
  },
});

export const requiredValidation = (
  message: string = "This field is required!"
) => ({
  required: message,
});

export const urlValidation = (message: string = "Invalid link") => ({
  pattern: {
    value: URL_REGEX,
    message,
  },
});

export const emailValidation = (message: string = "Invalid email address") => ({
  pattern: {
    value: EMAIL_REGEX,
    message,
  },
});
