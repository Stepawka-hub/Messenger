import { ThemeSwitcher } from "@components/theme-switcher";
import { PageWrapper } from "@ui/page-wrapper";
import { FC } from "react";
import s from './settings.module.css';

const Settings: FC = () => {
  return (
    <PageWrapper pageTitle="Настройки" title="Настройки">
      <div className={s.settingsItem}>
        <h3 className={s.title}>Тема приложения:</h3>
        <ThemeSwitcher />
      </div>
    </PageWrapper>
  );
};

export default Settings;
