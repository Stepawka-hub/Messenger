import { Helmet } from "@components/helmet";
import { BackButton } from "@ui/back-button";
import { FC } from "react";
import s from "./not-found.module.css";

const NotFound: FC = () => {
  return (
    <>
      <Helmet
        title="Страница не найдена"
        description="К сожалению, запрошенная страница не найдена. Вернитесь на главную страницу"
        noIndex
      />
      <section className={s.notFound}>
        <span className={s.text}>404 - Not Found</span>
        <BackButton />
      </section>
    </>
  );
};

export default NotFound;
