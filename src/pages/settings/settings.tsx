import { ThemeSwitcher } from "@components/theme-switcher";
import { PageWrapper } from "@ui/page-wrapper";
import { FC } from "react";

const Settings: FC = () => {
  return (
    <PageWrapper pageTitle="Настройки" title="Настройки">
      <ThemeSwitcher />
    </PageWrapper>
  );
};

export default Settings;
