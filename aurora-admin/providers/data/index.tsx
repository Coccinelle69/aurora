import { fetchWrapper } from "./fetch-wrapper";
import { createClient, fetchExchange } from "urql";
import graphqlDataProvider, { createLiveProvider } from "@refinedev/graphql";
import { createClient as createWSClient } from "graphql-ws";

export const API_URL_BASE = "https://api.crm.refine.dev";
export const API_URL = `${API_URL_BASE}/graphql`;
export const WS_URL = "wss://api.crm.refine.dev/graphql";

export const client = createClient({
  url: API_URL,
  exchanges: [fetchExchange],
  fetchOptions: {
    credentials: "include",
  },
  fetch: (input, options) =>
    fetchWrapper(input as string, options as RequestInit),
});

export const wsClient =
  typeof window !== undefined
    ? createWSClient({
        url: WS_URL,
      })
    : undefined;

export const dataProvider = graphqlDataProvider(client);
export const liveProvider = wsClient ? createLiveProvider(wsClient) : undefined;
