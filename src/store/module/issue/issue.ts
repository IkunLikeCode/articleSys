import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Request from "../../../api/index";
import type { IPage, issueState } from "./type";
// 获取issue列表
export const getIssueList = createAsyncThunk(
  "issue/getIssueList",
  async (info: { page: IPage; typeId?: string }) => {
    const res = await Request.request<issueState["issueList"]>({
      url: "/api/issue",
      method: "get",
      params: { ...info.page, typeId: info.typeId },
    });
    return res;
  }
);

// 更改issue状态
export const editIssue = createAsyncThunk(
  "issue/editIssue",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (info: {
    issue: {
      issueStatus: boolean;
    };
    id: string;
  }) => {
    return await Request.request({
      url: `/api/issue/${info.id}`,
      method: "patch",
      data: info.issue,
    });
  }
);

// 删除issue
export const deleteIssue = createAsyncThunk(
  "issue/deleteIssue",
  async (id: string) => {
    return await Request.request({
      url: `/api/issue/${id}`,
      method: "DELETE",
    });
  }
);

const initialState: issueState = {
  issueList: {
    code: 0,
    data: {
      count: 0,
      currentPage: 0,
      data: [],
      eachPage: 0,
      totalPage: 0,
    },
    msg: "",
  },
};

const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {
    initIsuueList(state, actions: PayloadAction<issueState["issueList"]>) {
      state.issueList = actions.payload;
    },
  },
});

// 暴露action
export const { initIsuueList } = issueSlice.actions;

// 暴露reducer
export default issueSlice.reducer;
