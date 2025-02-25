export const required = (value) => (value ? undefined : "Field is required");

export const maxLengthValidate = (maxLength) => (value) =>
  value?.length <= maxLength ? undefined : `Max length is ${maxLength} symbols`;

export const minLengthValidate = (minLength) => (value) =>
  value?.length >= minLength ? undefined : `Min length is ${minLength} symbols`;

export const isValidUrl = (url) => {
  const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return regex.test(url) ? undefined : "Укажите ссылку!";
}

export const isValueValidate = (words) => (value) => {
  const lowerText = value.toLowerCase();
  const array = Array.isArray(words) ? words : [words];

  const result = array.some(v => lowerText === v.toLowerCase());

  return result ? undefined : `Укажите: ${array.join('/')}`;
}