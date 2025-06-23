import { Input } from "@ui/form-elements";
import { URL_REGEX } from "@utils/helpers/validate-helpers";
import { FC, useMemo } from "react";
import { useForm } from "react-hook-form";
import s from "./profile-edit-form.module.css";
import { FieldConfig, ProfileEditFormProps, TProfileEditForm } from "./types";
import { Button } from "@ui/button";
import { Checkbox } from "@ui/form-elements/checkbox";

export const ProfileEditForm: FC<ProfileEditFormProps> = ({
  initialValue,
  error,
  onSubmit,
  onCancel,
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
        label: "Ищу работу",
        name: "lookingForAJob",
        type: "checkbox",
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
    <div className={s.container}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={s.fields}>
          {fields.map(({ label, name, type, validate }) => (
            <div className={s.fieldContainer} key={name}>
              {type === "checkbox" ? (
                <Checkbox
                  id={name}
                  label={label}
                  classes={{ label: s.label }}
                  error={errors[name]?.message}
                  {...register(name, validate)}
                />
              ) : (
                <Input
                  id={name}
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
              )}
            </div>
          ))}
        </fieldset>
        <div className={s.buttons}>
          <Button type="submit" className={s.saveBtn}>
            Сохранить
          </Button>
          <Button type="button" className={s.cancelBtn} onClick={onCancel}>
            Отменить
          </Button>
        </div>
      </form>
      {error && <span className={s.error}>{error}</span>}
    </div>
  );
};
