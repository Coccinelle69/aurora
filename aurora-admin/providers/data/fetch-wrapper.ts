import type { GraphQLFormattedError } from "graphql";
type Error = {
  message: string;
  statusCode: string;
};
const customFetch = async (input: RequestInfo | URL, options: RequestInit) => {
  const url =
    typeof input === "string"
      ? input
      : input instanceof URL
      ? input.toString()
      : input.url;

  return await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
      "Apollo-Require-Preflight": "true",
    },
  });
};

const getGraphQLErrors = (
  body: Record<"errors", GraphQLFormattedError[] | undefined>
): Error | null => {
  if (!body) {
    return {
      message: "Unknown error",
      statusCode: "INTERNAL_SERVER_ERROR",
    };
  }

  if ("errors" in body) {
    const errors = body?.errors;
    const messages = errors?.map((error) => error?.message)?.join("");
    const code = errors?.[0]?.extensions?.code;
    return {
      message: messages || JSON.stringify(errors),
      statusCode: String(code || 500),
    };
  }

  return null;
};

export const fetchWrapper = async (url: string, options: RequestInit) => {
  const response = await customFetch(url, options);

  const responseClone = response.clone();
  const body = await responseClone.json();

  const error = getGraphQLErrors(body);

  if (error) {
    throw error;
  }

  return response;
};
