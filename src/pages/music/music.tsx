import { FC } from "react";
import { Loader } from "@components/common/loader";
import useTitle from "@hooks/useTitle";
import s from "./music.module.css";

const Music: FC = () => {
  useTitle("Music");

  return (
    <section className={s.music}>
      <h2 className={s.title}>Здесь пока нет никакой музыки...</h2>
      <div className={s.loader}>
        <Loader />
      </div>
    </section>
  );
};

export default Music;
