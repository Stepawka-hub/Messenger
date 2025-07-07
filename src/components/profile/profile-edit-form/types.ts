import { RegisterOptions, SubmitHandler } from "react-hook-form";

export type ProfileEditFormProps = {
  initialValue: TProfileEditForm;
  error: string | null;
  onSubmit: SubmitHandler<TProfileEditForm>;
  onCancel: () => void;
};

export type TProfileEditForm = {
  fullName: string;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  vk: string;
  facebook: string;
  twitter: string;
  instagram: string;
  github: string;
  website: string;
  youtube: string;
  mainLink: string;
};

export type FieldConfig = {
  label: string;
  name: keyof TProfileEditForm;
  type?: "input" | "checkbox";
  validation?: RegisterOptions<TProfileEditForm>;
};
