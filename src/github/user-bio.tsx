import { fetchGQL } from "~/graphql";
import { delay } from "~/async";

import GetUserBioQuery from "./get-user-bio.graphql?raw";
import type { GetUserBio } from "./__generated__/GetUserBio";

export function getUserBio() {
  return delay(fetchGQL<GetUserBio>(GetUserBioQuery), 2_000, "fetch GitHub user bio");
}
