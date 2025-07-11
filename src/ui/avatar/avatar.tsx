import { FC } from "react";
import { AvatarProps } from "./type";
import defaultAvatar from "@images/defaultAvatar.png";
import s from "./avatar.module.css";
import clsx from "clsx";

export const Avatar: FC<AvatarProps> = ({
  image,
  size = "medium",
  ...props
}) => {
  return (
    <div className={clsx(s.avatarWrapper, s[size])} {...props}>
      <img className={s.avatar} src={image || defaultAvatar} alt="Avatar" />
    </div>
  );
};
