import type { Route } from "@tanstack/react-location";

import { delayedElement, QUERY_CLIENT } from "~/async";
import { getUserBio } from "~/github/user-bio";

export const QUERY_OPTS = {
  queryKey: ["renderasfetch", "sidebar"],
  queryFn: getUserBio,
  refetchOnMount: false,
};

const route: Route = {
  path: "with-sidebar",
  element: delayedElement(() => import("~/pages/render-as-you-fetch/sidebar")),
  loader: () => {
    return QUERY_CLIENT.getQueryData(QUERY_OPTS.queryKey) ?? QUERY_CLIENT.fetchQuery(QUERY_OPTS);
  },
  meta: { breadcrumb: "With User Sidebar" },
};

export default route;
