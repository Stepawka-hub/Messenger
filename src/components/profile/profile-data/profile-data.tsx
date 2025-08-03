import { FC, useMemo } from "react";
import { ProfileDataProps } from "./type";
import { getSafeValue } from "@utils/helpers";
import { ProfileStatus } from "@components/profile";
import { ProfileDataItem } from "./profile-data-item";
import s from "./profile-data.module.css";

const getValue = getSafeValue("Нет");

export const ProfileData: FC<ProfileDataProps> = ({ isOwner, profile }) => {
  const { fullName, aboutMe, lookingForAJob, lookingForAJobDescription } =
    profile;

  const profileInfo = useMemo(
    () => [
      {
        label: "Обо мне",
        value: getValue(aboutMe),
      },
      {
        label: "Ищу работу",
        value: lookingForAJob ? "Да" : "Нет",
      },
      {
        label: "Описание поиска работы",
        value: getValue(lookingForAJobDescription),
      },
    ],
    [aboutMe, lookingForAJob, lookingForAJobDescription]
  );

  return (
    <div className={s.container}>
      <h3 className={s.username}>{fullName}</h3>
      <section className={s.data}>
        <ProfileStatus isOwner={isOwner} />
        {profileInfo.map((item, index) => (
          <ProfileDataItem key={index} label={item.label} value={item.value} />
        ))}
      </section>
    </div>
  );
};
