import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Request from "../../../api/index";
import type { IForm, IntervewState } from "./type";

// 定义异步操作
export const fetchAddInterview = createAsyncThunk(
  "interview/fetchAddInterview",
  async (info: IForm) => {
    const res = await Request.request({
      url: "/api/interview",
      method: "post",
      data: info,
    });
    return res;
  }
);

export const fetchGetInterviewById = createAsyncThunk(
  "interview/fetchGetInterviewById",
  async (id: string) => {
    const res = await Request.request({
      url: `/api/interview/${id}`,
      method: "get",
    });
    return res;
  }
);

// 编辑
export const fetchEditInterview = createAsyncThunk(
  "interview/fetchEditInterview",
  async (props: { info: IForm; id: string }) => {
    const res = await Request.request({
      url: `/api/interview/${props.id}`,
      method: "PATCH",
      data: props.info,
    });
    return res;
  }
);

// 根据typeid获取面试题
export const fetchGetInterviewByType = createAsyncThunk(
  "interview/fetchGetInterviewByType",
  async (typeId: string) => {
    const res = await Request.request({
      url: "/api/interview",
      method: "get",
      params: { typeId: typeId },
    });
    return res;
  }
);

// 初始化数据
const initialState: IntervewState = {};

// 创建slice
const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {},
});

// 导出reducer
export default interviewSlice.reducer;

// 导出action
// export const {} = interviewSlice.actions;
