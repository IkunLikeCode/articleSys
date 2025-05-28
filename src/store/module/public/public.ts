import { createSlice } from "@reduxjs/toolkit";
import type { PublicState } from "./type";
const initialState: PublicState = {
  pathArr: JSON.parse(sessionStorage.getItem("pathArr") || "[]") || [],
  pathList: [],
};

const publicSlice = createSlice({
  name: "public",
  initialState,
  reducers: {},
});

export default publicSlice.reducer;
