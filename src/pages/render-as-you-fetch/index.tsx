import { useQuery } from "@tanstack/react-query";
import { Outlet, Link } from "@tanstack/react-location";

import { H1 } from "~/layout/header";
import { RepoTable } from "~/github/repos";

import { QUERY_OPTS } from "./route";

export default function RenderAsYouFetch() {
  const { data } = useQuery(QUERY_OPTS);
  return (
    <>
      <H1>Render as you Fetch</H1>
      <p>
        This page is an async page with data loading and code splitting, but does it all in
        parallel. And you can even have{" "}
        <Link to="with-sidebar" className="underline">
          parallel sub-routes
        </Link>
        .
      </p>
      <div className="flex items-start space-x-4">
        <RepoTable repositories={data!.viewer.repositories.nodes!} />
        <Outlet />
      </div>
    </>
  );
}
