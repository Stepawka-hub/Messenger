import { FC } from "react";
import useTitle from "@hooks/useTitle";
import s from "./Music.module.css";
import { Loader } from "@components/common/loader";

const Music: FC = () => {
  useTitle("Music");

  return (
    <section className={s.music}>
      <h2 className={s.title}>Здесь пока нет никакой музыки...</h2>
      <Loader />
    </section>
  );
};

export default Music;
