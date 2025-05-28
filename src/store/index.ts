import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./module/admin/admin";
import type { rootReducer } from "./type";
import userReducer from "./module/user/user";
import publicReducer from "./module/public/public";
import typeReducer from "./module/type/typeStore";
import interviewReducer from "./module/interview/interview";
import issueReduer from "./module/issue/issue";
import commentReducer from "./module/comment/comment";
import articleReducer from "./module/article/article";
const store = configureStore<rootReducer>({
  reducer: {
    admin: adminReducer,
    user: userReducer,
    public: publicReducer,
    type: typeReducer,
    interview: interviewReducer,
    issue: issueReduer,
    comment: commentReducer,
    article: articleReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export default store;
