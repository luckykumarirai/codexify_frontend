import "../styles/globals.css";
import Layout from "../components/layout/layout";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import "../styles/tailwind.scss";
import Router from "next/router";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }) {
  const { redirect, ...props } = pageProps;

  if (redirect) {
    Router.push(redirect);
    return null;
  }
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </Provider>
  );
}
export default MyApp;
