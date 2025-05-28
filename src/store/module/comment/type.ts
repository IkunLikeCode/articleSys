export interface commentItem {
  bookId: null;
  commentContent: string;
  commentDate: string;
  commentType: number;
  issueId: string;
  typeId: string;
  userId: string;
  _id: string;
}
export interface commentState {
  commentList: {
    coed: number;
    data: {
      count: number;
      currentPage: number;
      data: commentItem[];
      eachPage: number;
      totalPage: number;
    };
    msg: "";
  };
}

export interface deleteCommentType {
  code: number;
  data: {
    acknowledged: boolean;
    deletedCount: number;
  };
  msg: "";
}
