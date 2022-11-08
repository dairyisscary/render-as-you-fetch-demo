import { useQuery } from "@tanstack/react-query";

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
        parallel.
      </p>
      <RepoTable repositories={data!.viewer.repositories.nodes!} />
    </>
  );
}
