export const required = (value) => (value ? undefined : "Field is required");

export const maxLength = (maxLength) => (value) =>
  value?.length <= maxLength ? undefined : `Max length is ${maxLength} symbols`;

export const minLength = (minLength) => (value) =>
  value?.length >= minLength ? undefined : `Min length is ${minLength} symbols`;
