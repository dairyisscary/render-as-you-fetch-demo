import type { ReactNode } from "react";

export const MAIN_ID = "main-content";

export default function Main(props: { children: ReactNode }) {
  return (
    <main id={MAIN_ID} className="flex-1 rounded-3xl bg-darkmode-700 px-5 pb-3">
      {props.children}
    </main>
  );
}
