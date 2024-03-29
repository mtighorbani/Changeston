"use client";

import { ModalContextProvider } from "@/context/ModalContext";
import { TokenContextProvider } from "@/context/TokenContext";
import { UserContextProvider } from "@/context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";

// Create a client
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ModalContextProvider>
      <TokenContextProvider>
        <UserContextProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <QueryClientProvider client={queryClient}>
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </ThemeProvider>
        </UserContextProvider>
      </TokenContextProvider>
    </ModalContextProvider>
  );
}
