import { useNavigate } from "react-router-dom";
import Button from "../../components/common/button/button";
import s from "./not-found.module.css";
import useTitle from "@hooks/useTitle";
import { FC } from "react";

export const NotFound: FC = () => {
  const navigate = useNavigate();
  useTitle("Not Found");

  const handleClick = () => {
    navigate("/");
  };

  return (
    <section className={s.notFound}>
      <span className={s.notFound__text}>404 - Not Found</span>
      <Button
        text="<- Вернуться назад"
        className={s.notFound__btn}
        onClick={handleClick}
      />
    </section>
  );
};
