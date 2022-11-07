type BaseObject = Record<string, unknown>;

export async function fetchGQL<Result extends BaseObject, Vars extends BaseObject = BaseObject>(
  query: string,
  variables?: Vars,
) {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
    headers: {
      Accept: "application/json",
      Authorization: `bearer ${import.meta.env.VITE_GITHUB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Bad response");
  }
  const { data } = await response.json();
  return data as Result;
}
