import { Suspense, lazy, memo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { FindFriends } from "@pages/find-friends";
import { Login } from "@pages/login";
import { NotFound } from "@pages/not-found";
import { Profile } from "@pages/profile";
const Dialogs = lazy(() => import("@pages/dialogs"));
const News = lazy(() => import("@pages/news"));
const Music = lazy(() => import("@pages/music"));
const Settings = lazy(() => import("@pages/settings"));

import { ProtectedRoute } from "@components/protected-route";
import { Loader } from "@ui/loader";
import s from "./app.module.css";

export const App = memo(() => (
  <div className={s.content}>
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
));
