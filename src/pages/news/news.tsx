import { Loader } from "@ui/loader";
import { FC } from "react";
import s from "./news.module.css";
import { Helmet } from "@components/helmet";

const News: FC = () => {
  return (
    <>
      <Helmet
        title="Новости"
        description="Будьте в курсе последних событий и новостей. Узнавайте, что происходит в мире"
      />
      <section className={s.news}>
        <h2 className={s.title}>Здесь пока нет никаких новостей...</h2>
        <Loader />
      </section>
    </>
  );
};

export default News;
