import clsx from "clsx";
import s from "./skeleton-card.module.css";

export const SkeletonCard = () => (
  <article className={s.card}>
    <header className={s.header}>
      <div className={clsx(s.avatar, s.skeleton)}></div>
    </header>
    <div className={clsx(s.content, s.skeleton)}></div>
  </article>
);
