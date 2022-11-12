import { useQuery } from "@tanstack/react-query";
import { LinkIcon } from "@heroicons/react/24/solid";

import { QUERY_OPTS } from "./route";

export default function Sidebar() {
  const { data } = useQuery(QUERY_OPTS);
  const { viewer } = data!;
  return (
    <aside className="mt-5 w-1/3 space-y-4 rounded-md bg-darkmode-600 py-4 px-5">
      <div className="flex items-center space-x-4">
        <img
          className="h-20 w-20 rounded-full"
          src={viewer.avatarUrl}
          alt={`${viewer.name}'s avatar picture`}
        />
        <div>
          <a
            className="mb-1 text-lg font-semibold"
            href={viewer.url}
            target="_blank"
            rel="noreferrer noopener"
          >
            {viewer.login}
          </a>
          <div className="mt-1 text-sm text-slate-400">{viewer.name}</div>
          <div className="text-sm text-slate-400">{viewer.location}</div>
        </div>
      </div>
      <p>{viewer.bio}</p>
      <ul className="text-sm text-slate-400">
        <li className="flex items-center space-x-2">
          <LinkIcon className="h-3 w-3" />
          <a href={viewer.websiteUrl} target="_blank" rel="noreferrer noopener">
            {viewer.websiteUrl}
          </a>
        </li>
      </ul>
    </aside>
  );
}
