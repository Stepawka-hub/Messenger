import { FC } from "react";
import { Loader } from "@ui/loader";
import s from "./settings.module.css";
import { Helmet } from "@components/helmet";

const Settings: FC = () => {
  return (
    <>
      <Helmet title="Настройки" />
      <section className={s.settings}>
        <h2 className={s.title}>Здесь пока нет никаких настроек...</h2>
        <Loader />
      </section>
    </>
  );
};

export default Settings;
