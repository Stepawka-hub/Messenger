import { FC } from "react";
import { ProfileContactsItemProps } from "./type";
import { isValidUrl } from "@utils/helpers";
import s from "./profile-contacts-item.module.css";

export const ProfileContactsItem: FC<ProfileContactsItemProps> = ({
  value,
  label,
}) => (
  <article className={s.item}>
    <span className={s.label}>{`${label}: `}</span>
    {isValidUrl(value) ? (
      <a className={s.link} href={value} target="_blank">
        {value}
      </a>
    ) : (
      <span>{value || "-"}</span>
    )}
  </article>
);
