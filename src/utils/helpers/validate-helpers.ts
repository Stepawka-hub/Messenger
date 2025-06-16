export const isValidUrl = (value: string) =>
  value && /^(ftp|http|https):\/\/[^ "]+$/.test(value);
