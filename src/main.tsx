import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import { ErrorBoundary } from "./components/error-boundary/ErrorBoundary";
import { ServiceProviders } from "./context/ServiceProviders";
import { SettingsContextProvider } from "./context/SettingsContext";
import { StorageContextProvider } from "./context/StorageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 3 } },
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <StorageContextProvider>
          <SettingsContextProvider>
            <ServiceProviders>
              <App />
            </ServiceProviders>
          </SettingsContextProvider>
        </StorageContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
