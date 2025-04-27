/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ReqeustState {
  code: number;
  msg: string;
  data: any;
}

export interface ReqeustStateSolid<T> {
  code: number;
  msg: string;
  data: T;
}

export interface ReqeustStateSolidArray<T> {
  count: number;
  data: T[];
  currentPage: number;
  eachPage: number;
  totalPage: number;
}
