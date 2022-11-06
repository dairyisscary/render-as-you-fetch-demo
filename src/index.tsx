import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Router, Outlet, ReactLocation } from "@tanstack/react-location";

import Sidebar from "~/layout/sidebar";
import BreadCrumb from "~/layout/breadcrumb";
import LoadingIndicator from "~/layout/loading-indicator";
import Main from "~/layout/main";
import Home from "~/pages/home";
import FourOhFour from "~/pages/404";

import "./index.css";

const router = (
  <Router
    location={new ReactLocation()}
    routes={[
      { path: "/", element: <Home />, meta: { breadcrumb: "Home" } },
      { path: "*", element: <FourOhFour />, meta: { breadcrumb: "Not Found" } },
    ]}
  >
    <Sidebar />
    <Main>
      <BreadCrumb />
      <Suspense fallback={<LoadingIndicator />}>
        <Outlet />
      </Suspense>
    </Main>
  </Router>
);

createRoot(document.getElementById("root")!).render(<StrictMode>{router}</StrictMode>);
