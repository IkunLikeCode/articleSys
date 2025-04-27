import { ReqeustStateSolidArray } from "../../../types/commonType";
export interface UserItem {
  avatar: string;
  enabled: boolean;
  intro: string;
  lastLoginDate: string;
  loginId: string;
  loginPwd: string;
  mail: string;
  nickname: string;
  points: number;
  qq: string;
  registerDate: string;
  wechat: string;
  _id: string;
}

export interface userListType {
  code: number;
  msg: string;
  data: ReqeustStateSolidArray<UserItem[]>;
}

export interface userInfo {
  avatar: string;
  enabled: boolean;
  intro: string;
  lastLoginDate: string;
  loginId: string;
  loginPwd: string;
  mail: string;
  nickname: string;
  poinits: number;
  qq: string;
  registerDate: string;
  wechat: string;
  _id: string;
  type?: string;
}

export interface postUserInfo {
  avatar: string;
  intro: string;
  loginId: string;
  loginPwd: string;
  mail: string;
  nickname: string;
  qq: string;
  type: string;
  wechat: string;
}
