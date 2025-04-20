import { createSlice } from "@reduxjs/toolkit";
import type { userState } from "./type";

const initialState:userState = {
  userInfo: {
      avatar: "",
      enabled: false
  }
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      Object.assign(state.userInfo, action.payload)
    }
  } 
})

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;