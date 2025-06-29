import { Header } from "@components/header";
import { Sidebar } from "@components/sidebar";
import { getInitialized } from "@slices/app";
import { useDispatch, useSelector } from "@store";
import { initializeApp } from "@thunks/app";
import { Preloader } from "@ui/preloader";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import s from "./app.module.css";
import { BurgerMenu } from "@ui/burger-menu";
import { AuthDetails } from "@components/auth-details";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const initialized = useSelector(getInitialized);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  if (!initialized) {
    return <Preloader />;
  }

  const toggleSidebar = () => setIsSidebarOpen((prevState) => !prevState);

  return (
    <div className={s.wrapper}>
      <Header
        leftPart={
          <BurgerMenu isActive={isSidebarOpen} setIsActive={toggleSidebar} />
        }
        rightPart={<AuthDetails />}
      />
      <main className={s.main}>
        <Sidebar isOpen={isSidebarOpen} />
        <div className={s.content}>{children}</div>
      </main>
    </div>
  );
};
