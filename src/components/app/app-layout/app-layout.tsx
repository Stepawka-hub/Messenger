import { FC, memo, PropsWithChildren, useState } from "react";
import { BurgerMenu } from "@ui/burger-menu";
import { Header } from "@components/header";
import { AuthDetails } from "@components/auth-details";
import { Sidebar } from "@components/sidebar";
import s from "./app-layout.module.css";

export const AppLayout: FC<PropsWithChildren> = memo(({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prevState) => !prevState);
  const handleSidebarClose = () => setIsSidebarOpen(false);

  return (
    <div className={s.wrapper}>
      <Header
        leftPart={
          <BurgerMenu isActive={isSidebarOpen} setIsActive={toggleSidebar} />
        }
        rightPart={<AuthDetails />}
      />
      <main className={s.main}>
        <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
        <div className={s.content}>{children}</div>
      </main>
    </div>
  );
});
