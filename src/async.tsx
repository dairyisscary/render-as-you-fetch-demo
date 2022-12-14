import {
  lazy,
  createElement,
  type ReactElement,
  type ComponentType,
  type ReactNode,
  type LazyExoticComponent,
} from "react";
import {
  QueryClient,
  QueryClientProvider as QueryClientProviderInner,
} from "@tanstack/react-query";

export const QUERY_CLIENT = new QueryClient();

export function QueryClientProvider(props: { children: ReactNode }) {
  return (
    <QueryClientProviderInner client={QUERY_CLIENT}>{props.children}</QueryClientProviderInner>
  );
}

export function waitFor(delayMs: number = 2_000): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, delayMs);
  });
}

export async function delay<T>(promise: Promise<T>, delayMs?: number, label?: string): Promise<T> {
  console.log(`Delaying ${label || "async"} operation...`);
  const value = await promise;
  await waitFor(delayMs);
  return value;
}

export function delayedLazy<T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>,
  delayMs?: number,
): LazyExoticComponent<T> {
  return lazy(() => delay(factory(), delayMs, "lazy component"));
}

export function delayedElement<T extends ComponentType<{}>>(
  factory: () => Promise<{ default: T }>,
  delayMs?: number,
): () => Promise<ReactElement<{}>> {
  let cache: ReactElement<{}> | undefined;
  return async () => {
    if (!cache) {
      const { default: Component } = await delay(factory(), delayMs, "async element");
      cache = createElement(Component);
    }
    return cache;
  };
}
