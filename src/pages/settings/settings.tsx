import useTitle from "@hooks/useTitle";
import s from "./settings.module.css";

import { Loader } from "@components/common/loader";
import { FC } from "react";

const Settings: FC = () => {
  useTitle("Settings");

  return (
    <section className={s.settings}>
      <h2 className={s.title}>Здесь пока нет никаких настроек...</h2>
      <Loader />
    </section>
  );
};

export default Settings;
