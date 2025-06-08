import { FC } from "react";
import { ProfileInfoItemProps } from "./type";
import s from "./profile-info-item.module.css";
import clsx from "clsx";

export const ProfileInfoItem: FC<ProfileInfoItemProps> = ({
  value,
  label,
  isContact,
}) => (
  <article className={clsx(s.item, { [s.contact]: isContact })}>
    <span className={s.label}>{`${label}: `}</span>
    <span>{value}</span>
  </article>
);
