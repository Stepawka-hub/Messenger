import ProfileInfoItem from "../ProfileInfoItem/ProfileInfoItem";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import s from "./ProfileData.module.css";
import { getSafeValue } from "../../../../utils/helpers/valueHelpers";
import { FC } from "react";
import { ProfileDataProps } from "./type";

const getValue = getSafeValue("Нет");

export const ProfileData: FC<ProfileDataProps> = ({
  isOwner,
  profile,
  status,
  updateUserStatus,
}) => {
  const profileInfo = [
    {
      label: "Обо мне",
      value: getValue(profile.aboutMe),
    },
    {
      label: "Ищу работу",
      value: profile.lookingForAJob ? "Да" : "Нет",
    },
    {
      label: "Описание поиска работы",
      value: getValue(profile.lookingForAJobDescription),
    },
  ];

  return (
    <div className={s.profileData}>
      <h2 className={s.profileData__title}>
        {profile.fullName || "Имя пользователя"}
      </h2>

      <div className={s.profileData__description}>
        <ProfileStatus
          label="Статус: "
          isOwner={isOwner}
          status={status}
          updateUserStatus={updateUserStatus}
        />
        {profileInfo.map((item, index) => (
          <ProfileInfoItem label={item.label} value={item.value} key={index} />
        ))}
      </div>
    </div>
  );
};
