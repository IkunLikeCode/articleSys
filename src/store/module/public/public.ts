import { createSlice } from "@reduxjs/toolkit";
import type {PublicState} from './type'
const initialState:PublicState = { 
  pathArr: JSON.parse(sessionStorage.getItem("pathArr") || "[]") || [],
  pathList:[]
 };

const publicSlice = createSlice({
  name: "public",
  initialState,
  reducers: {
    setPathArr: (state, action) => {
     const result= state.pathArr.filter((item: menuItem, index: number) => {
        const firstIndex = state.pathArr.findIndex(
          (i: menuItem) => i.pathName === item.pathName
        );
        return firstIndex === index;
      });
   
      
    },
  },
});

export const { setPathArr } = publicSlice.actions;

export default publicSlice.reducer;