import type { ComponentProps } from "react";
import { Link } from "@tanstack/react-location";
import { BeakerIcon, HomeIcon, SignalSlashIcon, SignalIcon } from "@heroicons/react/24/solid";

import Styles from "./sidebar.module.css";

function NavLink(props: Omit<ComponentProps<typeof Link>, "className" | "getActiveProps">) {
  return (
    <Link
      {...props}
      className="relative flex items-center space-x-3 rounded-l-full py-5 px-4 transition-colors hover:bg-darkmode-700 focus:bg-darkmode-700"
      getActiveProps={() => ({ className: Styles.active })}
    />
  );
}

export default function Sidebar() {
  return (
    <nav aria-label="Main" className="w-64">
      <Link
        to="/"
        className="mb-5 mr-10 flex items-center space-x-3 border-b border-white/10 py-5 px-4 text-lg text-white"
      >
        <BeakerIcon className="h-6 w-6" />
        <span>
          <abbr title="Render as you fetch">RAYF</abbr> Demo
        </span>
      </Link>
      <NavLink>
        <HomeIcon className="h-6 w-6" />
        <span>Home</span>
      </NavLink>
      <NavLink to="/fetch-on-render">
        <SignalSlashIcon className="h-6 w-6" />
        <span>Fetch on render</span>
      </NavLink>
      <NavLink to="/render-as-you-fetch">
        <SignalIcon className="h-6 w-6" />
        <span>Render as you fetch</span>
      </NavLink>
    </nav>
  );
}
