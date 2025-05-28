import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { commentState, deleteCommentType } from "./type";
import Request from "../../../api/index";

// 获取问答评论
export const getIsuueComment = createAsyncThunk(
  "comment/getIssueComment",
  async (
    info: {
      page: { current: number; pageSize: number };
      commentType: number;
    },
    { dispatch }
  ) => {
    const result = await Request.request<commentState["commentList"]>({
      url: `/api/comment/${info.commentType}`,
      method: "GET",
      params: {
        ...info.page,
      },
    });
    dispatch(initCommentList(result));
  }
);

// 删除评论
export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (id: string) => {
    const result = await Request.request<deleteCommentType>({
      url: `/api/comment/${id}`,
      method: "DELETE",
    });
    return result;
  }
);

const initialState: commentState = {
  commentList: {
    coed: 0,
    data: {
      count: 0,
      currentPage: 1,
      data: [],
      eachPage: 10,
      totalPage: 1,
    },
    msg: "",
  },
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    initCommentList(state, action: PayloadAction<commentState["commentList"]>) {
      state.commentList = action.payload;
    },
  },
});

// 导出action
export const { initCommentList } = commentSlice.actions;

// 导出reducer
export default commentSlice.reducer;
