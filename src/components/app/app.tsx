import { Suspense, lazy, memo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { FindFriends } from "@pages/find-friends";
import { Login } from "@pages/login";
import { Profile } from "@pages/profile";
const DialogsPage = lazy(() => import("@pages/dialog-page"));
const Settings = lazy(() => import("@pages/settings"));
const NotFound = lazy(() => import("@pages/not-found"));

import { ProtectedRoute } from "@components/protected-route";
import { getIsAuth } from "@slices/auth";
import { useSelector } from "@store";
import { Loader } from "@ui/loader";
import { CommonChatPage } from "@pages/common-chat-page";

export const App = memo(() => {
  const isAuth = useSelector(getIsAuth);
  const initialRedirect = isAuth ? "/profile" : "/login";

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigate to={initialRedirect} replace />} />
        <Route path="/profile/:userId?" element={<Profile />} />
        <Route
          path="/dialogs/:userId?"
          element={
            <ProtectedRoute>
              <DialogsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <CommonChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <FindFriends />
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
  );
});
