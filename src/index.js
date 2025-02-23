import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import store from "./redux/reduxStore";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>

  // STRICT MODE
  // <React.StrictMode>
  //   <BrowserRouter basename={process.env.PUBLIC_URL}>
  //     <Provider store={store}>
  //       <App />
  //     </Provider>
  //   </BrowserRouter>
  // </React.StrictMode>

  // DEPLOY TO GITHUB PAGES
  // <HashRouter>
  //   <Provider store={store}>
  //     <App />
  //   </Provider>
  // </HashRouter>
);

reportWebVitals();
