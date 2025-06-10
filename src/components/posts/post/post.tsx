import { FC } from "react";
import s from "./post.module.css";
import { PostProps } from "./type";

export const Post: FC<PostProps> = ({ avatar, message }) => (
  <article className={s.post}>
    <img className="avatar" src={avatar} alt="Avatar" />
    <span className={s.text}>{message}</span>
  </article>
);
