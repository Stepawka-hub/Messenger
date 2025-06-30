import { Helmet } from "@components/helmet";
import { Button } from "@ui/button";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import s from "./not-found.module.css";

export const NotFound: FC = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/");

  return (
    <>
      <Helmet
        title="Страница не найдена"
        description="К сожалению, запрошенная страница не найдена. Вернитесь на главную страницу"
      />
      <section className={s.notFound}>
        <span className={s.text}>404 - Not Found</span>
        <Button
          children="<- Вернуться назад"
          className={s.btn}
          onClick={handleClick}
        />
      </section>
    </>
  );
};
