import { Input } from "@ui/form-elements";
import { URL_REGEX } from "@utils/helpers/validate-helpers";
import { FC, useMemo } from "react";
import { useForm } from "react-hook-form";
import s from "./profile-edit-form.module.css";
import { FieldConfig, ProfileEditFormProps, TProfileEditForm } from "./types";

export const ProfileEditForm: FC<ProfileEditFormProps> = ({
  initialValue,
  error,
  onSubmit,
}) => {
  const { register, handleSubmit, formState } = useForm<TProfileEditForm>({
    mode: "onChange",
    defaultValues: initialValue,
  });
  const { errors } = formState;

  const fields: FieldConfig[] = useMemo(
    () => [
      {
        label: "Полное имя",
        name: "fullName",
        validate: {
          required: "This field is required!",
        },
      },
      {
        label: "Обо мне",
        name: "aboutMe",
        validate: {
          required: "This field is required!",
        },
      },
      {
        label: "Ищу работу (Да/Нет)",
        name: "lookingForAJob",
        validate: {
          required: "This field is required!",
        },
      },
      {
        label: "Описание поиска работы",
        name: "lookingForAJobDescription",
        validate: {
          required: "This field is required!",
        },
      },
      {
        label: "VK",
        name: "vk",
        validate: {
          required: "This field is required!",
          pattern: {
            value: URL_REGEX,
            message: "Invalid link",
          },
        },
      },
      {
        label: "Facebook",
        name: "facebook",
        validate: {
          required: "This field is required!",
          pattern: {
            value: URL_REGEX,
            message: "Invalid link",
          },
        },
      },
      {
        label: "Twitter",
        name: "twitter",
        validate: {
          required: "This field is required!",
          pattern: {
            value: URL_REGEX,
            message: "Invalid link",
          },
        },
      },
      {
        label: "Instagram",
        name: "instagram",
        validate: {
          required: "This field is required!",
          pattern: {
            value: URL_REGEX,
            message: "Invalid link",
          },
        },
      },
      {
        label: "GitHub",
        name: "github",
        validate: {
          required: "This field is required!",
          pattern: {
            value: URL_REGEX,
            message: "Invalid link",
          },
        },
      },
    ],
    []
  );

  return (
    <form className={s.profileData} onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={s.formFields}>
        {fields.map(({ label, name, validate }) => (
          <div className={s.fieldContainer} key={name}>
            <Input
              id={name}
              type="text"
              label={label}
              classes={{
                wrapper: s.field,
                input: s.input,
                label: s.label,
              }}
              error={errors[name]?.message}
              placeholder={label}
              {...register(name, validate)}
            />
          </div>
        ))}
      </fieldset>
      {error && <span className={s.error}>{error}</span>}
    </form>
  );
};
