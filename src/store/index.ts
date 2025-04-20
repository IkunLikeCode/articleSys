import {configureStore} from '@reduxjs/toolkit'
import adminReducer from './module/admin/admin'
import type { rootReducer } from './type'
import userReducer from './module/user/user'
import publicReducer from './module/public/public'
const store = configureStore<rootReducer>({
    reducer: {
       admin: adminReducer,
       user: userReducer,
       public: publicReducer
    }
})
export type AppDispatch=typeof store.dispatch
export default store