import { Suspense, lazy, memo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { FindFriends } from "@pages/find-friends";
import { Login } from "@pages/login";
import { NotFound } from "@pages/not-found";
import { Profile } from "@pages/profile";
const Chat = lazy(() => import("@pages/chat"));
const News = lazy(() => import("@pages/news"));
const Settings = lazy(() => import("@pages/settings"));

import { ProtectedRoute } from "@components/protected-route";
import { Loader } from "@ui/loader";
import { WebSocketProvider } from "@providers/websocket/websocket-provider";

export const App = memo(() => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path="/" element={<Navigate to="/news" />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route
        path="/chat/*"
        element={
          <ProtectedRoute>
            <WebSocketProvider>
              <Chat />
            </WebSocketProvider>
          </ProtectedRoute>
        }
      />
      <Route path="/news" element={<News />} />
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
));
