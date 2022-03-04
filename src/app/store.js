import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userReducer from "../features/userSlice";
import videoReducer from "../features/videoSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    video: videoReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;
