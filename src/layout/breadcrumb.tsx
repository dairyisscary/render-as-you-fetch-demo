import { Link, useMatches } from "@tanstack/react-location";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

const ICON = <ChevronRightIcon className="h-3 w-3 text-slate-400" />;

export default function BreadCrumb() {
  const realMatches = useMatches().filter((match) => match.route?.meta?.breadcrumb);
  const lastIndex = realMatches.length - 1;
  return (
    <nav aria-label="Breadcrumb" className="mb-5 border-b border-white/10 py-5 text-sm">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/">Demo</Link>
        </li>
        {realMatches.map(({ pathname, route }, index) => {
          const isLast = index === lastIndex;
          const content = route!.meta!.breadcrumb as string;
          return (
            <li
              key={pathname}
              className="flex items-center space-x-2"
              aria-current={isLast ? "page" : undefined}
            >
              {ICON}
              {isLast ? (
                <span className="text-slate-400">{content}</span>
              ) : (
                <Link to={pathname}>{content}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
