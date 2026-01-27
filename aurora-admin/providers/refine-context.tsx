"use client";

import { Refine } from "@refinedev/core";
import { dataProvider, liveProvider } from "./data";
import { authProvider } from "./auth";
import routerProvider from "@refinedev/nextjs-router";
import { resources } from "@/config/resources";

const RefineContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <Refine
      dataProvider={dataProvider}
      liveProvider={liveProvider}
      authProvider={authProvider}
      routerProvider={routerProvider}
      options={{
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
        liveMode: "auto",
      }}
      resources={resources}
    >
      {children}
    </Refine>
  );
};

export default RefineContext;
