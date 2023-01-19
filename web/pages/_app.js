import App from "next/app";
import { useState } from "react";

import ky from "~/api/ky";

import AuthContext from "~/contexts/AuthContext";

import "antd/dist/antd.css";
import "~/styles/globals.css";
NextApp.getInitialProps = async (ctx) => {
  // Is SSR
  if (ctx?.ctx?.req) {
    // const response = await ky.get(`api/web-init`);
    // console.log("response", response.data);
    const { data } = { data: null };
    const appData = App.getInitialProps(ctx);
    // get cookie in ssr
    const userData = ctx?.ctx?.req?.cookies?.user;
    return {
      ...appData,
      data,
      userData,
    };
  }

  return {};
};


function NextApp({ Component, pageProps, data, userData }) {
  return (
    <AuthContext.Provider
      value={{
        user: userData,
      }}
    >
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default NextApp;
