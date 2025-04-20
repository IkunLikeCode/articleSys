import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {adminState,AdminPersonalInfo } from "./type";
const initialState:adminState = {
  adminInfo:{
    code: 0,
    msg: "",
    data: {
      avatar: "",
      enabled: false,
      loginId: "",
      loginPwd: "",
      nickname: "",
      permission: 0,
      _id: ""
    }
  }
}
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminInfo(state, action:PayloadAction<AdminPersonalInfo>) {
     action.payload.data.avatar="http://127.0.0.1:7001"+action.payload.data.avatar;
      Object.assign(state.adminInfo, action.payload)
    },
    setAdminAvatar(state, action:PayloadAction<string>) {
      state.adminInfo.data.avatar="http://127.0.0.1:7001"+action.payload;
    }
  }
})


export const { setAdminInfo ,setAdminAvatar } = adminSlice.actions;

export default adminSlice.reducer;