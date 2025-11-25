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
  trigger: boolean; // manual trigger
}

const useResponse = ({
  method = "GET",
  url,
  body = null,
  trigger,
}: UseResponseOptions) => {
  const [done, setDone] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [data, setData] = useState<unknown>(null);
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
          setSuccess(false);
          setError("INVALID_JSON");
          return;
        }

        setData(json);
        console.log(json);

        setSuccess(response.ok && json.success);
      } catch (e) {
        setSuccess(false);
        setError("NETWORK_ERROR");
      } finally {
        setDone(true); // <-- ALWAYS RUNS NOW
      }
    };

    run();
  }, [trigger]);

  return { done, success, data, errorMessage: error };
};

export default useResponse;
