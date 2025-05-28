import {
  ReqeustStateSolid,
  ReqeustStateSolidArray,
} from "../../../types/commonType";

export interface interviewItem {
  interviewContent: string;
  interviewTitle: string;
  onShelfDate: string;
  typeId: string;
  _id: string;
}

export type interviewList = ReqeustStateSolid<
  ReqeustStateSolidArray<interviewItem[]>
>;

export interface pageInfo {
  pageSize: number;
  current: number;
  total?: number;
}
