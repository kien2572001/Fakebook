import App from "next/app";
import { useState } from "react";
import ky from "~/api/ky";

import AuthContext from "~/contexts/AuthContext";
import "antd/dist/antd.css";
import "~/styles/globals.css";

NextApp.getInitialProps = async (ctx) => {
  // Is SSR
  if (ctx?.ctx?.req) {
    const response = await ky.get(`api/web-init`);
    const { data } = await response.json();
    const appData = App.getInitialProps(ctx);

    return {
      ...appData,
      data,
    };
  }

  return {};
};

function NextApp({ Component, pageProps, data }) {
  const [authUser] = useState(data);

  return (
    <AuthContext.Provider value={authUser}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default NextApp;
