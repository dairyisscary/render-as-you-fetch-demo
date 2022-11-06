import type { ComponentProps } from "react";

export function H1(props: ComponentProps<"h1">) {
  return <h1 {...props} className="my-5 text-xl font-medium" />;
}
