export interface IPage {
  current: number;
  pageSize: number;
}

export interface issueListType<T> {
  code: number;
  data: {
    count: number;
    currentPage: number;
    data: T[];
    eachPage: number;
    totalPage: number;
  };
  msg: string;
}

export interface issueItem {
  commentNumber: number;
  issueContent: string;
  issueDate: string;
  issueStatus: boolean;
  issueTitle: string;
  scanNumber: number;
  typeId: string;
  userId: string;
  _id: string;
}

export interface issueState {
  issueList: issueListType<issueItem>;
}
