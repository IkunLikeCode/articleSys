export interface AdminItem{
  avatar:string,
  enabled:boolean,
  loginId:string,
  loginPwd:string,
  nickname:string,
  permission:number,
  _id:string,
}

export type AdminList = AdminItem[];