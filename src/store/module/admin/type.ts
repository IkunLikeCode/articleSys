import type {ReqeustStateSolid} from '../../../../types/commonType'
// 管理员个人信息
export type AdminPersonalInfo =ReqeustStateSolid<{
  avatar:string,
  enabled:boolean,
  loginId:string,
  loginPwd:string,
  nickname:string,
  permission:number,
  _id:string
}>

export interface adminState{
  adminInfo:AdminPersonalInfo
}