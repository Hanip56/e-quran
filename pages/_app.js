import Layout from "../components/Layout/Layout";
import { ContextProvider } from "../contexts/ContextProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}

export default MyApp;
