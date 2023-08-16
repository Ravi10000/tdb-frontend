import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./global.scss";
import { BrowserRouter } from "react-router-dom";
import { BookNowProvider } from "./context/book-now.context.jsx";
import { Provider } from "react-redux";
import store from "#redux/store.js";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <BookNowProvider>
            <App />
          </BookNowProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  // </React.StrictMode>
);
