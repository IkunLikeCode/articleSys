import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./module/admin/admin";
import type { rootReducer } from "./type";
import userReducer from "./module/user/user";
import publicReducer from "./module/public/public";
import typeReducer from "./module/type/typeStore";
const store = configureStore<rootReducer>({
  reducer: {
    admin: adminReducer,
    user: userReducer,
    public: publicReducer,
    type: typeReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export default store;
