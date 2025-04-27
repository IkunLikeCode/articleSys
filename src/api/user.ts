/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "./index";
import type { postUserInfo } from "../pages/user/type";
// 获取用户列表
export function getUserList<T>(page: { current: number; pageSize: number }) {
  return request.request<T>({
    url: "/api/user",
    method: "get",
    params: {
      ...page,
    },
  });
}
// 删除用户
export function deleteUser<T>(id: string) {
  return request.request<T>({
    url: `/api/user/${id}`,
    method: "DELETE",
  });
}
// 更新用户信息
export function updateUser<T>(userId: string, userInfo: any) {
  return request.request<T>({
    url: `/api/user/${userId}`,
    method: "patch",
    data: userInfo,
  });
}
// 新增用户
export function addUser<T>(userInfo: postUserInfo) {
  userInfo.type = "background";
  return request.request<T>({
    url: `/api/user`,
    method: "post",
    data: userInfo,
  });
}
// 获取用户信息
export function getUserInfo<T>(userId: string) {
  return request.request<T>({
    url: `/api/user/${userId}`,
    method: "get",
  });
}
