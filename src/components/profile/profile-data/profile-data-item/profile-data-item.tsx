import { FC } from "react";
import s from "./profile-data-item.module.css";
import { ProfileDataItemProps } from "./type";

export const ProfileDataItem: FC<ProfileDataItemProps> = ({ value, label }) => (
  <article>
    <span className={s.label}>{`${label}: `}</span>
    <span className={s.text}>{value}</span>
  </article>
);
