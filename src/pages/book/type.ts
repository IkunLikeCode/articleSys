import type {
  ReqeustStateSolidArray,
  ReqeustStateSolid,
} from "../../../types/commonType";

export interface BookItem {
  bookIntor: string;
  bookPic: string;
  bookTitle: string;
  commentNumber: number;
  downloadLink: string;
  onShelfDate: string;
  requirePoints: number;
  scanNumber: number;
  typeId: string;
  _id: string;
}
export interface pageType {
  current: number;
  pageSize: number;
  total: number;
}

export type bookListType = ReqeustStateSolid<ReqeustStateSolidArray<BookItem>>;

export interface IFormDataBook {
  bookIntro: string;
  bookPic: string;
  bookTitle: string;
  downloadLink: string;
  requirePoints: number;
  typeId: string;
}
