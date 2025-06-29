import { Header } from "@components/header";
import { Sidebar } from "@components/navbar";
import { getInitialized } from "@slices/app";
import { useDispatch, useSelector } from "@store";
import { initializeApp } from "@thunks/app";
import { Preloader } from "@ui/preloader";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import s from "./app.module.css";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const initialized = useSelector(getInitialized);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(initializeApp());
  }, []);

  if (!initialized) {
    return <Preloader />;
  }

  const toggleSidebar = () => setIsSidebarOpen((prevState) => !prevState);

  return (
    <div className={s.wrapper}>
      <Header />
      <main className={s.main}>
        <div className={s.sidebar}>
          <Sidebar />
        </div>
        <div className={s.content}>{children}</div>
      </main>
    </div>
  );
};
