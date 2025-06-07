import { useNavigate } from "react-router-dom";
import s from "./not-found.module.css";
import { useTitle } from "@hooks/useTitle";
import { FC } from "react";
import { Button } from "@components/common/button";

export const NotFound: FC = () => {
  const navigate = useNavigate();
  useTitle("Not Found");

  const handleClick = () => {
    navigate("/");
  };

  return (
    <section className={s.notFound}>
      <span className={s.text}>404 - Not Found</span>
      <Button
        children="<- Вернуться назад"
        className={s.btn}
        onClick={handleClick}
      />
    </section>
  );
};
