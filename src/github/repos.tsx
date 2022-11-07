import { Link } from "@tanstack/react-location";
import {
  ArrowTopRightOnSquareIcon,
  ArrowsUpDownIcon,
  ArchiveBoxIcon,
  CheckBadgeIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

import { fetchGQL } from "~/graphql";
import { delay } from "~/async";

import {
  RepositoryOrderField,
  LanguageOrderField,
  OrderDirection,
} from "~/__generated__/globalTypes";

import GetReposQuery from "./get-repos.graphql?raw";
import type {
  GetRepos,
  GetReposVariables,
  GetRepos_viewer_repositories_nodes as Repository,
} from "./__generated__/GetRepos";

const BASE_CELL_CLASSNAMES = "px-4";
const BASE_TD_CLASSNAMES = `bg-darkmode-600 py-3 ${BASE_CELL_CLASSNAMES}`;

export function getRepos() {
  return delay(
    fetchGQL<GetRepos, GetReposVariables>(GetReposQuery, {
      orderReposBy: { field: RepositoryOrderField.NAME, direction: OrderDirection.ASC },
      orderLanguagesBy: { field: LanguageOrderField.SIZE, direction: OrderDirection.ASC },
    }),
    2_000,
    "fetch GitHub repos",
  );
}

export function RepoTable({ repositories }: { repositories: (Repository | null)[] }) {
  return (
    <table className="mt-5 table w-full border-separate border-spacing-y-3">
      <thead>
        <tr className="text-left uppercase">
          <th className={BASE_CELL_CLASSNAMES}>Name</th>
          <th className={BASE_CELL_CLASSNAMES}>Slug</th>
          <th className={`${BASE_CELL_CLASSNAMES} text-center`}>Language</th>
          <th className={`${BASE_CELL_CLASSNAMES} text-center`}>Status</th>
          <th className={`${BASE_CELL_CLASSNAMES} text-center`}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {repositories.map((node) => {
          if (!node) {
            return null;
          }
          const primaryLanguage = node.languages?.nodes?.[0];
          return (
            <tr key={node.databaseId}>
              <td className={`${BASE_TD_CLASSNAMES} rounded-l-md`}>
                <Link className="font-medium text-slate-200" to={node.name}>
                  {node.name}
                </Link>
                <div className="mt-0.5 text-sm text-slate-400">
                  {node.description || <em>No description</em>}
                </div>
              </td>
              <td className={BASE_TD_CLASSNAMES}>
                <a
                  href={node.url}
                  className="inline-flex items-center space-x-1 text-slate-400"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  <span>{node.url.replace(/^https:\/\/github\.com/, "")}</span>
                </a>
              </td>
              <td className={BASE_TD_CLASSNAMES}>
                {primaryLanguage ? (
                  <div className="flex items-center justify-center space-x-2">
                    <span
                      className="block h-3 w-3 rounded-sm"
                      style={{ backgroundColor: primaryLanguage.color || undefined }}
                      aria-hidden="true"
                    />
                    <span>{primaryLanguage.name}</span>
                  </div>
                ) : (
                  <em>Unknown</em>
                )}
              </td>
              <td className={BASE_TD_CLASSNAMES}>
                {node.isArchived ? (
                  <span className="flex items-center justify-center text-amber-700">
                    <ArchiveBoxIcon className="mr-1 h-4 w-4" />
                    Archived
                  </span>
                ) : (
                  <span className="flex items-center justify-center text-lime-700">
                    <CheckBadgeIcon className="mr-1 h-4 w-4" />
                    Active
                  </span>
                )}
              </td>
              <td
                className={`${BASE_TD_CLASSNAMES} relative rounded-r-md before:absolute before:left-0 before:top-3 before:bottom-3 before:block before:w-px before:bg-darkmode-400 before:content-['']`}
              >
                <span className="flex items-center justify-center space-x-4">
                  <button type="button" className="flex items-center space-x-1">
                    <ArrowsUpDownIcon className="h-4 w-4" />
                    <span>Fork</span>
                  </button>
                  <button type="button" className="flex items-center space-x-1 text-rose-700">
                    <TrashIcon className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
