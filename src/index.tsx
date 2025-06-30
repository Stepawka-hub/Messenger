import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppLayout, App } from "@components/app";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { store } from "@store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppLayout>
          <App />
        </AppLayout>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
