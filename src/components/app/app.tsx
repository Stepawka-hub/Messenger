import { useEffect, Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.css";

import { useDispatch } from "@store";
import { initializeApp } from "@thunks/app";
import { getInitialized, getModal } from "@slices/app";

import { NotFound } from "@pages/not-found";
//import { Login, UsersContainer, ProfileContainer } from "@pages";

// import { Navbar } from "@components/navbar";
// import { Header } from "@/components/header";

import { Preloader } from "@components/preloader";
import { Loader } from "@components/common/loader";
import { ModalError } from "@components/common/modal-error";
import { Navbar } from "@components/navbar";
import clsx from "clsx";

// Lazy загрузка
// const Dialogs = lazy(() => import("@pages/dialogs"));
const News = lazy(() => import("@pages/news"));
const Music = lazy(() => import("@pages/music"));
const Settings = lazy(() => import("@pages/settings"));

export const App = () => {
  const dispatch = useDispatch();
  const initialized = useSelector(getInitialized);
  const modal = useSelector(getModal);

  // useEffect(() => {
  //   dispatch(initializeApp());
  // }, []);

  // if (!initialized) {
  //   return <Preloader />;
  // }

  return (
    <div className={clsx("app-wrapper", modal.isOpen && "locked")}>
      <ModalError {...modal} />
      {/* <Header /> */}
      <Navbar />
      <div className="app-wrapper-content">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/profile" />} />
            {/* <Route path="/profile/:userId?" element={<ProfileContainer />} />
            <Route path="/dialogs/*" element={<Dialogs />} /> */}
            <Route path="/news" element={<News />} />
            {/* <Route path="/users" element={<UsersContainer />} /> */}
            <Route path="/music" element={<Music />} />
            <Route path="/settings" element={<Settings />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};
