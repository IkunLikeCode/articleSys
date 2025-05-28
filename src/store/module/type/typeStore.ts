import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Request from "../../../api/index";
import type { TypeStates } from "./type";

export const getTypeList = createAsyncThunk(
  "getTypeList",
  async (_state, thunkApi) => {
    try {
      const res = await Request.request<TypeStates["typeList"]>({
        url: "/api/type",
        method: "get",
      });
      thunkApi.dispatch(setTypeStore(res));
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteType = createAsyncThunk("deleteType", async (id: string) => {
  const res = await Request.request({
    url: `/api/type/${id}`,
    method: "delete",
  });
  return res;
});

export const addType = createAsyncThunk("addType", async (type: string) => {
  const res = await Request.request({
    url: "/api/type",
    method: "post",
    data: {
      typeName: type,
    },
  });
  return res;
});

const initialState: TypeStates = {
  typeList: {
    code: 0,
    data: [],
    msg: "",
  },
};

const typeStore = createSlice({
  name: "typeStore",
  initialState,
  reducers: {
    setTypeStore(state, action: PayloadAction<TypeStates["typeList"]>) {
      state.typeList = action.payload;
    },
  },
});

export const { setTypeStore } = typeStore.actions;

export default typeStore.reducer;
