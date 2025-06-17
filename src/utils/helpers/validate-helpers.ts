export const URL_REGEX = /^(ftp|http|https):\/\/[^ "]+$/;

export const isValidUrl = (value: string) => value && URL_REGEX.test(value);
