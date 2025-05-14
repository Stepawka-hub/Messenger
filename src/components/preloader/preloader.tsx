import { FC } from "react";
import { Loader } from "@components/common/loader";
import s from "./preloader.module.css";

export const Preloader: FC = () => {
  return (
    <div className={s.preloader}>
      <h2 className={s.title}>Загружаем приложение...</h2>
      <Loader />
    </div>
  );
};
