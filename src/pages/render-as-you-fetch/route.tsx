import type { Route } from "@tanstack/react-location";

import { delayedElement, QUERY_CLIENT } from "~/async";
import LoadingIndicator from "~/layout/loading-indicator";
import { getRepos } from "~/github/repos";

import SidebarRoute from "./sidebar/route";

export const QUERY_OPTS = { queryKey: ["renderasfetch"], queryFn: getRepos, refetchOnMount: false };

const route: Route = {
  path: "render-as-you-fetch",
  element: delayedElement(() => import("~/pages/render-as-you-fetch")),
  pendingElement: <LoadingIndicator />,
  loader: () => {
    return QUERY_CLIENT.getQueryData(QUERY_OPTS.queryKey) ?? QUERY_CLIENT.fetchQuery(QUERY_OPTS);
  },
  meta: { breadcrumb: "Render as you Fetch" },
  children: [SidebarRoute],
};

export default route;
