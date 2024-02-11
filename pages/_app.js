import { Provider } from "@/config/Provider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider>
        <Component {...pageProps} />;
      </Provider>
    </>
  )
}
