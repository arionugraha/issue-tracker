"use client";

import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";

const QueryClientProvider = ({ children }: PropsWithChildren) => {
   const client = new QueryClient();
   return <ReactQueryClientProvider client={client}>{children}</ReactQueryClientProvider>;
};

export default QueryClientProvider;
