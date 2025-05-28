export interface PageInfo {
  current: number;
  size: number;
}

export interface ArticleItem {
  article_status: number;
  avatar: string;
  category_id: { _id: string; classname: string }[];
  content: string;
  is_sticky: boolean;
  like_count: number;
  pubulishStatus: boolean;
  title: string;
  user_id: { _id: string; nickname: string }[];
  view_count: number;
  _id: string;
}

export interface ArticleState {
  articleList: {
    code: number;
    count: number;
    data: ArticleItem[];
    errCode: number;
    errMsg: string;
    message: string;
  };
}
