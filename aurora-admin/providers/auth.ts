/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { AuthProvider } from "@refinedev/core";
import { API_URL } from "./data";

export const authCredentials = {
  email: "michael.scott@dundermifflin.com",
  password: "demodemo",
};

const graphqlRequest = async (
  query: string,
  variables?: Record<string, any>,
) => {
  const response = await fetch(API_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Apollo-Require-Preflight": "true",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0]?.message || "GraphQL Error");
  }

  return result;
};

export const authProvider: AuthProvider = {
  login: async ({
    email,
    password,
    providerName,
  }: {
    email: string;
    password: string;
    providerName: string;
  }) => {
    if (providerName === "google") {
      window.location.href =
        "http://localhost:8080/oauth2/authorization/google";
    }
    try {
      console.log("🔵 LOGIN STARTED for:", email);

      const result = await graphqlRequest(
        `
          mutation Login($email: String!, $password: String!) {
            login(loginInput: { email: $email, password: $password }) {
              user {
                id
                name
              }
            }
          }
        `,
        { email, password },
      );

      console.log(result);

      if (result.data?.login?.user) {
        return {
          success: true,
          redirectTo: "/dashboard",
        };
      }
      return {
        success: false,
        error: { message: "Login failed", name: "Invalid" },
      };
    } catch (e) {
      const error = e as Error;
      return {
        success: false,
        error: {
          message: error.message || "Login failed",
          name: error.name || "Invalid email or password",
        },
      };
    }
  },

  logout: async () => {
    try {
      await fetch("http://localhost:8080/graphql/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.error("Logout error:", e);
    }
    return { success: true, redirectTo: "/login" };
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
      const result = await graphqlRequest(`query Me { me { email } }`);
      console.log("Check result:", result);
      if (result.data?.me) {
        return { authenticated: true };
      }
      return { authenticated: false, redirectTo: "/login" };
    } catch (error) {
      console.error("Check error:", error);
      return { authenticated: false, redirectTo: "/login" };
    }
  },

  getIdentity: async () => {
    try {
      const { data } = await graphqlRequest(`
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
      `);

      return data.me;
    } catch (error) {
      console.error("Get identity error:", error);
      return undefined;
    }
  },

  forgotPassword: async ({ email }: { email: string }) => {
    try {
      const result = await graphqlRequest(
        `
          mutation ForgotPassword($email: String!) {
            forgotPassword(email: $email) {
              success
              message
            }
          }
        `,
        { email },
      );
      if (result.data?.forgotPassword?.success) {
        return {
          success: true,
          redirectTo: "/login",
        };
      }
      return {
        success: false,
        error: {
          name: "ForgotPasswordError",
          message:
            result.data?.forgotPassword?.message ||
            "Failed to send reset email",
        },
      };
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        error: {
          name: "ForgotPasswordError",
          message: error?.message || "Something went wrong",
        },
      };
    }
  },

  updatePassword: async ({
    password,
    token,
  }: {
    password: string;
    token: string;
  }) => {
    try {
      const result = await graphqlRequest(
        `
          mutation UpdatePassword($token: String!, $newPassword: String!) {
            updatePassword(token: $token, newPassword: $newPassword)) {
              success
              message
            }
          }
        `,
        { token, newPassword: password },
      );
      if (result.data?.resetPassword?.success) {
        return {
          success: true,
          redirectTo: "/login",
        };
      }
      return {
        success: false,
        error: {
          name: "ResetPasswordError",
          message:
            result.data?.resetPassword?.message || "Failed to reset password",
        },
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error: {
          name: "ResetPasswordError",
          message: error || "Something went wrong",
        },
      };
    }
  },
};
