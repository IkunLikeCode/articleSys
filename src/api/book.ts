import Request from "./index";
import type { IFormDataBook } from "../pages/book/type";
export function getBookList<T>(page: { current: number; pageSize: number }) {
  return Request.request<T>({
    url: "/api/book",
    method: "get",
    params: { ...page },
  });
}

// 删除
export function deleteBook<T>(id: string) {
  return Request.request<T>({
    url: `/api/book/${id}`,
    method: "delete",
  });
}
// 新增
export function addBook<T>(data: IFormDataBook) {
  return Request.request<T>({
    url: "/api/book",
    method: "post",
    data,
  });
}
// 修改
export function updateBook<T>(id: string, data: IFormDataBook) {
  return Request.request<T>({
    url: `/api/book/${id}`,
    method: "PATCH",
    data,
  });
}
// 获取详情
export function getBookById<T>(id: string) {
  return Request.request<T>({
    url: `/api/book/${id}`,
    method: "get",
  });
}
