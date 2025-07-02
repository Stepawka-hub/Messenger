import { Loader } from "@ui/loader";
import { PageWrapper } from "@ui/page-wrapper";
import { FC } from "react";
import s from "./settings.module.css";

const Settings: FC = () => {
  return (
    <PageWrapper pageTitle="Настройки" title="Настройки">
      <section className={s.settings}>
        <h2 className={s.title}>Здесь пока нет никаких настроек...</h2>
        <Loader />
      </section>
    </PageWrapper>
  );
};

export default Settings;
