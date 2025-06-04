export const required = (value: unknown) =>
  value ? undefined : "Field is required";

export const maxLengthValidate = (maxLength: number) => (value: string) =>
  value?.length <= maxLength ? undefined : `Max length is ${maxLength} symbols`;

export const minLengthValidate = (minLength: number) => (value: string) =>
  value?.length >= minLength ? undefined : `Min length is ${minLength} symbols`;

export const isValidUrl = (url: string) => {
  const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return regex.test(url) ? undefined : "Укажите ссылку!";
};

export const isValueValidate =
  (words: string | string[]) => (value: string) => {
    const lowerText = value.toLowerCase();
    const array = Array.isArray(words) ? words : [words];

    const result = array.some((v) => lowerText === v.toLowerCase());

    return result ? undefined : `Укажите: ${array.join("/")}`;
  };
