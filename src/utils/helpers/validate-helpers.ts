export const URL_REGEX = /^(ftp|http|https):\/\/[^ "]+$/;
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const isValidUrl = (value: string) => value && URL_REGEX.test(value);
