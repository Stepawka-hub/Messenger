import { FC } from "react";
import { ProfileDataProps } from "./type";
import { getSafeValue } from "@utils/helpers/values-helpers";
import { ProfileStatus } from "../profile-status";
import { ProfileInfoItem } from "../profile-info-item";
import s from "./profile-data.module.css";

const getValue = getSafeValue("Нет");

export const ProfileData: FC<ProfileDataProps> = ({
  isOwner,
  profile,
  status,
  updateUserStatus,
}) => {
  const { fullName, aboutMe, lookingForAJob, lookingForAJobDescription } =
    profile;
    
  const profileInfo = [
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
  ];

  return (
    <div>
      <h2 className={s.title}>{fullName || "Имя пользователя"}</h2>
      <div>
        <ProfileStatus
          label="Статус: "
          isOwner={isOwner}
          status={status}
          updateUserStatus={updateUserStatus}
        />
        {profileInfo.map((item, index) => (
          <ProfileInfoItem key={index} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
};
