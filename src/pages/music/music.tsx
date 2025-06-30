import { Helmet } from "@components/helmet";
import { Loader } from "@ui/loader";
import { FC } from "react";
import s from "./music.module.css";

const Music: FC = () => {
  return (
    <>
      <Helmet
        title="Музыка"
        description="Откройте для себя мир музыки, создавайте плейлисты и делитесь любимыми треками"
      />
      <section className={s.music}>
        <h2 className={s.title}>Здесь пока нет никакой музыки...</h2>
        <Loader />
      </section>
    </>
  );
};

export default Music;
