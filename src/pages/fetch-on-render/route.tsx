import { Suspense } from "react";
import type { Route } from "@tanstack/react-location";

import { delayedLazy } from "~/async";
import LoadingIndicator from "~/layout/loading-indicator";

const FetchOnRender = delayedLazy(() => import("~/pages/fetch-on-render"));

const route: Route = {
  path: "fetch-on-render",
  element: (
    <Suspense fallback={<LoadingIndicator fromSuspense />}>
      <FetchOnRender />
    </Suspense>
  ),
  meta: { breadcrumb: "Fetch on Render" },
};

export default route;
