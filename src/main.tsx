import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/resetCss.css";
import store from "./store/index.ts";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { HashRouter } from "react-router";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </StrictMode>
);
