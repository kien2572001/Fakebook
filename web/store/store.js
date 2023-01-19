import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { userSlice } from "./userSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      // Add your reducer here
        [userSlice.name]: userSlice.reducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
