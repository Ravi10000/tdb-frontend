import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import user from "./user/user.reducer";
import flash from "./flash/flash.reducer";

export default configureStore({
  reducer: { user, flash },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
