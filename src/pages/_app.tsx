import Head from "next/head";
import React, { useEffect } from "react";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import "@assets/style/common.scss";

type Props = {
  Component: NextPage;
  pageProps: any;
};

const MyApp: React.FC<Props> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Cryto App</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <html lang="en" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;
