import { Button } from "@ui/button";
import { Input } from "@ui/form-elements";
import { Checkbox } from "@ui/form-elements/checkbox";
import {
  maxLengthValidation,
  requiredValidation,
  urlValidation,
} from "@utils/helpers/validate-helpers";
import { FC, useMemo } from "react";
import { useForm } from "react-hook-form";
import s from "./profile-edit-form.module.css";
import { FieldConfig, ProfileEditFormProps, TProfileEditForm } from "./types";

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
        validation: {
          ...requiredValidation(),
          ...maxLengthValidation(64),
        },
      },
      {
        label: "Обо мне",
        name: "aboutMe",
        validation: {
          ...requiredValidation(),
          ...maxLengthValidation(128),
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
        validation: {
          ...requiredValidation(),
          ...maxLengthValidation(64),
        },
      },
      {
        label: "VK",
        name: "vk",
        validation: {
          ...requiredValidation(),
          ...urlValidation(),
          ...maxLengthValidation(128),
        },
      },
      {
        label: "Facebook",
        name: "facebook",
        validation: {
          ...requiredValidation(),
          ...urlValidation(),
          ...maxLengthValidation(128),
        },
      },
      {
        label: "Twitter",
        name: "twitter",
        validation: {
          ...requiredValidation(),
          ...urlValidation(),
          ...maxLengthValidation(128),
        },
      },
      {
        label: "Instagram",
        name: "instagram",
        validation: {
          ...requiredValidation(),
          ...urlValidation(),
          ...maxLengthValidation(128),
        },
      },
      {
        label: "GitHub",
        name: "github",
        validation: {
          ...requiredValidation(),
          ...urlValidation(),
          ...maxLengthValidation(128),
        },
      },
    ],
    []
  );

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={s.fields}>
          {fields.map(({ label, name, type, validation }) => (
            <div className={s.fieldContainer} key={name}>
              {type === "checkbox" ? (
                <Checkbox
                  id={name}
                  label={label}
                  classes={{ label: s.label }}
                  error={errors[name]?.message}
                  {...register(name, validation)}
                />
              ) : (
                <Input
                  id={name}
                  label={label}
                  placeholder={label}
                  classes={{
                    wrapper: s.field,
                    input: s.input,
                    label: s.label,
                  }}
                  error={errors[name]?.message}
                  {...register(name, validation)}
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
