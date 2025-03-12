import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import store from "@/stores/index";

const ReactQueryProvider = dynamic(
  () => import("@/components/QueryClientProvider"),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ReactQueryProvider>
        <Component {...pageProps} />
      </ReactQueryProvider>
    </Provider>
  );
}
