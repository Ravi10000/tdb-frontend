import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./global.scss";
import { BrowserRouter } from "react-router-dom";
import { BookNowProvider } from "./context/book-now.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BookNowProvider>
        <App />
      </BookNowProvider>
    </BrowserRouter>
  </React.StrictMode>
);
