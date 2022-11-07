import { useQuery } from "@tanstack/react-query";

import { H1 } from "~/layout/header";
import LoadingIndicator from "~/layout/loading-indicator";
import { RepoTable, getRepos } from "~/github/repos";

export default function FetchOnRender() {
  const { data, isLoading } = useQuery({ queryKey: ["getonrender"], queryFn: getRepos });
  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <>
      <H1>Fetch on Render</H1>
      <p>This page is an async page with data loading and code splitting.</p>
      <RepoTable repositories={data!.viewer.repositories.nodes!} />
    </>
  );
}
