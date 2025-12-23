"use client";

import { useEffect, useState } from "react";

interface jsonBodyProps {
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  email?: string | null;
  message?: string | null;
  language?: string | null;
}

interface UseResponseOptions {
  method?: "GET" | "POST";
  url: string;
  body?: jsonBodyProps | null;
  trigger: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useResponse = <T = any,>({
  method = "GET",
  url,
  body = null,
  trigger,
}: UseResponseOptions) => {
  const [done, setDone] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!trigger) return;

    const run = async () => {
      try {
        setDone(false);

        const options: RequestInit = {
          method,
          headers: { "Content-Type": "application/json" },
        };

        if (method === "POST" && body) {
          options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        let json;

        try {
          json = await response.json();
        } catch (e) {
          setError("INVALID RESPONSE");
        }

        setData(json);
        console.log(json);

        if (!response.ok) {
          setSuccess(false);
          if (
            json?.errors?.email ||
            // json?.errors?.message ||
            json?.errors?.firstname ||
            json?.errors?.lastname
          ) {
            setError("BLANK");
          }
          return;
        }
        setSuccess(response.ok && json.success);
      } catch (e) {
        setSuccess(false);
        setError("NETWORK_ERROR");
      } finally {
        setDone(true);
      }
    };

    run();
  }, [trigger]);

  return { done, success, data, errorMessage: error };
};

export default useResponse;
