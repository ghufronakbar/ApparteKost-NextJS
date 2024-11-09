import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "@/components/ui/provider";
import { Theme } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider themes={["light"]}>
      <Theme appearance="light">
        <Component {...pageProps} />;
        <Toaster />
      </Theme>
    </Provider>
  );
}
