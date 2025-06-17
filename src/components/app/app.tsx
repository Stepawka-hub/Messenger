import { useEffect, Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "@store";
import { initializeApp } from "@thunks/app";
import { getInitialized, getModal } from "@slices/app";

import { NotFound } from "@pages/not-found";
import { Profile } from "@pages/profile";
import { Login } from "@pages/login";
import { FindFriends } from "@pages/find-friends";
const Dialogs = lazy(() => import("@pages/dialogs"));
const News = lazy(() => import("@pages/news"));
const Music = lazy(() => import("@pages/music"));
const Settings = lazy(() => import("@pages/settings"));

import { Preloader } from "@ui/preloader";
import { Loader } from "@ui/loader";
import { ModalError } from "@components/modal";
import { Navbar } from "@components/navbar";
import { Header } from "@components/header";
import "./app.css";
import clsx from "clsx";
import { ProtectedRoute } from "@components/protected-route/protected-route";

export const App = () => {
  const dispatch = useDispatch();
  const initialized = useSelector(getInitialized);
  const modal = useSelector(getModal);

  useEffect(() => {
    dispatch(initializeApp());
  }, []);

  if (!initialized) {
    return <Preloader />;
  }

  return (
    <div className={clsx("app-wrapper", modal.isOpen && "locked")}>
      <ModalError {...modal} />
      <Header />
      <Navbar />
      <div className="app-wrapper-content">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/news" />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route
              path="/dialogs/*"
              element={
                <ProtectedRoute>
                  <Dialogs />
                </ProtectedRoute>
              }
            />
            <Route path="/news" element={<News />} />
            <Route path="/users" element={<FindFriends />} />
            <Route
              path="/music"
              element={
                <ProtectedRoute>
                  <Music />
                </ProtectedRoute>
              }
            />
            <Route path="/settings" element={<Settings />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute onlyUnAuth>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};
