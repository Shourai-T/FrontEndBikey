import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    
      <Provider store={store}>
        <App />
      </Provider>
  );
} else {
  console.error("Không tìm thấy phần tử #root trong DOM!");
}
