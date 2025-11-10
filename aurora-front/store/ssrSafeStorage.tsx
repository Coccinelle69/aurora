"use client";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// Promise-based noop storage (works on server and when localStorage is blocked)
function createNoopStorage() {
  return {
    getItem(_key: string): Promise<string | null> {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string): Promise<void> {
      return Promise.resolve();
    },
    removeItem(_key: string): Promise<void> {
      return Promise.resolve();
    },
  };
}

// In the browser, use localStorage; on errors (or SSR) fall back to async noop
const ssrSafeStorage =
  typeof window === "undefined"
    ? createNoopStorage()
    : (() => {
        try {
          // createWebStorage returns a WebStorage-like object; we’ll wrap to ensure Promises.
          const web = createWebStorage("local");
          return {
            getItem(key: string): Promise<string | null> {
              try {
                return Promise.resolve(web.getItem(key));
              } catch {
                return Promise.resolve(null);
              }
            },
            setItem(key: string, value: string): Promise<void> {
              try {
                web.setItem(key, value);
              } catch {
                // ignore
              }
              return Promise.resolve();
            },
            removeItem(key: string): Promise<void> {
              try {
                web.removeItem(key);
              } catch {
                // ignore
              }
              return Promise.resolve();
            },
          };
        } catch (e) {
          if (process.env.NODE_ENV !== "production") {
            console.warn("[persist] localStorage blocked, using noop", e);
          }
          return createNoopStorage();
        }
      })();

export default ssrSafeStorage;
