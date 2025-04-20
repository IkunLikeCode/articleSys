import Reqeust from './index'

interface LoginData {
  loginId: string,
  loginPwd: string,
  captcha: string,
  remember: boolean,
}
interface AdminItem {
  avatar: string;
  enabled?: boolean;
  loginId: string;
  loginPwd: string;
  nickname: string;
  permission: number;
  _id?: string;
}
// 管理员登录
export function adminLogin<T>(loginInfo:LoginData) {
  return Reqeust.request<T>({
    url:'/api/admin/login',
    method: 'POST',
    data: loginInfo,
  })
}
// 获取管理员信息
export function getAdminInfo<T>(adminId:string) {
  return Reqeust.request<T>({
    url:`/api/admin/${adminId}`,
    method: 'GET',
  })
}
// 获取管理员列表
export function getAdminList<T>(page:{current:number,pageSize:number}) {
  return Reqeust.request<T>({
    url:'/api/admin',
    method:'GET',
    params:{...page}
  })
}
// 添加管理员
export function addAdmin<T>(adminInfo:AdminItem) {
  return Reqeust.request<T>({
    url:'/api/admin',
    method:'POST',
    data: adminInfo,
  })
}
// 删除管理员
export function deleteAdmin<T>(adminId:string) {
  return Reqeust.request<T>({
    url:`/api/admin/${adminId}`,
    method:'delete',
  })
}
// 修改管理员
export function updateAdmin<T>( adminId:string,adminInfo:Partial<AdminItem>) {
  return Reqeust.request<T>({
    url:`/api/admin/${adminId}`,
    method:'patch',
    data:adminInfo
  })
}