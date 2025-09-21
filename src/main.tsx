// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import ArticlePage from "./pages/ArticlePage";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/articles/:slug", element: <ArticlePage /> },  // full article route
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
