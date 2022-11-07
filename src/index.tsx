import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router, Outlet, ReactLocation } from "@tanstack/react-location";

import Sidebar from "~/layout/sidebar";
import { QueryClientProvider } from "~/async";
import BreadCrumb from "~/layout/breadcrumb";
import Main from "~/layout/main";
import Home from "~/pages/home";
import FourOhFour from "~/pages/404";
import FetchOnRenderRoute from "~/pages/fetch-on-render/route";

import "./index.css";

const router = (
  <Router
    location={new ReactLocation()}
    defaultPendingMs={1_000}
    defaultPendingMinMs={450}
    routes={[
      { path: "/", element: <Home />, meta: { breadcrumb: "Home" } },
      FetchOnRenderRoute,
      { path: "*", element: <FourOhFour />, meta: { breadcrumb: "Not Found" } },
    ]}
  >
    <Sidebar />
    <Main>
      <BreadCrumb />
      <Outlet />
    </Main>
  </Router>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider>{router}</QueryClientProvider>
  </StrictMode>,
);
