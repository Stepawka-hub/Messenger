import { AuthDetails } from "@components/auth-details";
import { Header } from "@components/header";
import { Sidebar } from "@components/sidebar";
import { ModalProvider } from "@providers/modal/modal-provider";
import { getInitialized } from "@slices/app";
import { useDispatch, useSelector } from "@store";
import { initializeApp } from "@thunks/app";
import { BurgerMenu } from "@ui/burger-menu";
import { Preloader } from "@ui/preloader";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { ToastContainer } from "@components/toast-container";
import { ThemeProvider } from "@providers/theme/theme-provider";
import { BackgroundDataSync } from "@components/background-data-sync";
import s from "./app.module.css";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const initialized = useSelector(getInitialized);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  const toggleSidebar = () => setIsSidebarOpen((prevState) => !prevState);
  const handleSidebarClose = () => setIsSidebarOpen(false);

  return (
    <ThemeProvider>
      <ModalProvider>
        {!initialized ? (
          <Preloader />
        ) : (
          <div className={s.wrapper}>
            <Header
              leftPart={
                <BurgerMenu
                  isActive={isSidebarOpen}
                  setIsActive={toggleSidebar}
                />
              }
              rightPart={<AuthDetails />}
            />
            <main className={s.main}>
              <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
              <div className={s.content}>{children}</div>
            </main>
          </div>
        )}
        <BackgroundDataSync />
        <ToastContainer />
      </ModalProvider>
    </ThemeProvider>
  );
};
