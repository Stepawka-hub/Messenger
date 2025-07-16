import { App, AppLayout } from "@components/app";
import { store } from "@store";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <Provider store={store}>
        <AppLayout>
          <App />
        </AppLayout>
      </Provider>
    </BrowserRouter>
);
