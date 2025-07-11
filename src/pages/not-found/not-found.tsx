import { BackButton } from "@ui/back-button";
import { PageWrapper } from "@ui/page-wrapper";
import { FC } from "react";
import s from "./not-found.module.css";

const NotFound: FC = () => {
  return (
    <PageWrapper
      title="Страница не найдена"
      description="К сожалению, запрошенная страница не найдена. Вернитесь на главную страницу"
      noIndex
    >
      <section className={s.notFound}>
        <span className={s.text}>404 - Not Found</span>
        <BackButton />
      </section>
    </PageWrapper>
  );
};

export default NotFound;
