import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "@/components/Layout";
import { MyProvider } from "@/context/transitroute-context";

export default function App({ Component, pageProps }) {
  return (
    <MyProvider>
      <Layout>
        <Component />
      </Layout>
    </MyProvider>
  );
}
