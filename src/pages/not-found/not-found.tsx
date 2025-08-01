import { BackButton } from "@ui/back-button";
import { PageWrapper } from "@ui/page-wrapper";
import { NoDataFound } from "@ui/no-data-found";
import { FC } from "react";
import s from "./not-found.module.css";

const NotFound: FC = () => {
  return (
    <PageWrapper
      title="Страница не найдена"
      description="К сожалению, запрошенная страница не найдена. Вернитесь на главную страницу"
      className={s.notFound}
      noIndex
    >
      <NoDataFound label="404 - Not Found" classes={{ label: s.label }}>
        <BackButton />
      </NoDataFound>
    </PageWrapper>
  );
};

export default NotFound;
