import s from "./skeleton-card.module.css";

export const SkeletonCard = () => (
  <article className={s.card}>
    <header className={s.header}>
      <div className={s.avatar}></div>
    </header>
    <div className={s.content}></div>
  </article>
);
