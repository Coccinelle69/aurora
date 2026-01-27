import { fetchWrapper } from "./fetch-wrapper";
import { cacheExchange, createClient, fetchExchange } from "urql";
import graphqlDataProvider, { createLiveProvider } from "@refinedev/graphql";
import { createClient as createWSClient } from "graphql-ws";

export const API_URL_BASE = "http://localhost:8080";
export const API_URL = `${API_URL_BASE}/graphql`;
export const WS_URL = "ws://localhost:8080/graphql";

export const client = createClient({
  url: API_URL,

  exchanges: [fetchExchange, cacheExchange],
  preferGetMethod: false,
  fetchOptions: () => ({
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  fetch: (input, options) =>
    fetchWrapper(input as string, options as RequestInit),
  requestPolicy: "network-only",
});

export const wsClient =
  typeof window !== undefined
    ? createWSClient({
        url: WS_URL,
      })
    : undefined;

export const dataProvider = graphqlDataProvider(client);
export const liveProvider = wsClient ? createLiveProvider(wsClient) : undefined;
