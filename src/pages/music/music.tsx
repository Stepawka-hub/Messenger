import { FC } from "react";
import { Loader } from "@ui/loader";
import { useTitle } from "@hooks/useTitle";
import s from "./music.module.css";

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
