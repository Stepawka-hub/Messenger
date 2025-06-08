import { useTitle } from "@hooks/useTitle";
import { Loader } from "@components/common/loader";
import { FC } from "react";
import s from "./news.module.css";

const News: FC = () => {
  useTitle("News");

  return (
    <section className={s.news}>
      <h2 className={s.title}>Здесь пока нет никаких новостей...</h2>
      <Loader />
    </section>
  );
};

export default News;
