import request from "../../../api/index";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PageInfo } from "./type";
import type { ArticleState } from "./type";

const initData: ArticleState = {
  articleList: {
    code: 0,
    count: 0,
    data: [],
    errCode: 0,
    errMsg: "",
    message: "",
  },
};

export const getArticleList = createAsyncThunk(
  "article/getArticle",
  async (pageInfo: PageInfo, thnkApi) => {
    const res = await request.request<ArticleState["articleList"]>({
      url: "https://env-00jxtf859sgm.dev-hz.cloudbasefunction.cn/myarticle/getArticleList",
      method: "post",
      data: pageInfo,
    });
    thnkApi.dispatch(initArticleList({ articleList: res }));
  }
);

const articleSlice = createSlice({
  name: "article",
  initialState: initData,
  reducers: {
    initArticleList(state, action: PayloadAction<ArticleState>) {
      state.articleList = action.payload.articleList;
    },
  },
});

export const { initArticleList } = articleSlice.actions;
export default articleSlice.reducer;
