/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { AuthProvider } from "@refinedev/core";

import { API_URL, dataProvider } from "./data";

export const authCredentials = {
  email: "mmskrbin@gmail.com",
  password: "demodemo",
};

export const authProvider: AuthProvider = {
  login: async ({ email }: { email: string }) => {
    try {
      const { data } = await dataProvider.custom({
        url: API_URL,
        method: "post",
        headers: {},
        meta: {
          variables: { email },
          rawQuery: `
            mutation Login($email: String!) {
              login(loginInput: { email: $email }) {
                success
              }
            }
          `,
        },
      });

      return {
        success: true,
        redirectTo: "/",
      };
    } catch (e) {
      const error = e as Error;

      return {
        success: false,
        error: {
          message: "message" in error ? error.message : "Login failed",
          name: "name" in error ? error.name : "Invalid email or password",
        },
      };
    }
  },

  logout: async () => {
    await dataProvider.custom({
      url: API_URL,
      method: "post",
      meta: { rawQuery: `mutation Logout { logout }` },
    });
    localStorage.removeItem("access_token");

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  onError: async (error) => {
    if (error.statusCode === "UNAUTHENTICATED") {
      return {
        logout: true,
        ...error,
      };
    }

    return { error };
  },

  check: async () => {
    try {
      await dataProvider.custom({
        url: API_URL,
        method: "post",
        headers: {},
        meta: {
          rawQuery: `
            query Me {
              me {
                name
              }
            }
          `,
        },
      });
      return {
        authenticated: true,
        redirectTo: "/login",
      };
    } catch (error) {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }
  },

  getIdentity: async () => {
    try {
      const { data } = await dataProvider.custom<{ me: any }>({
        url: API_URL,
        method: "post",
        headers: {},
        meta: {
          // get the user information such as name, email, etc.
          rawQuery: `
            query Me {
              me {
                id
                name
                email
                phone
                jobTitle
                timezone
                avatarUrl
              }
            }
          `,
        },
      });

      return data.me;
    } catch (error) {
      return undefined;
    }
  },
};
