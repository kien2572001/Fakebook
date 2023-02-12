import App from "next/app";
import { useEffect, useState } from "react";
import "~/styles/SnakeGame.css";
import ky from "~/api/ky";

import AuthContext from "~/contexts/AuthContext";

import "antd/dist/antd.css";
import "~/styles/globals.css";
import { Provider } from "react-redux";
import { wrapper } from "~/store/store";
import { QueryClient, QueryClientProvider } from "react-query";

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

function NextApp({ Component, data, userData, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <AuthContext.Provider
        value={{
          user: userData,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </AuthContext.Provider>
    </Provider>
  );
}

export default NextApp;
