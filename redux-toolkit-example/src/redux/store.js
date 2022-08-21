import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./actions/counter";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  }
});
