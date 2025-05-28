import Request from "./index";

// 获取面试列表
export function getInterviewList<T>(
  page: { current: number; pageSize: number },
  val?: string
) {
  return Request.request<T>({
    url: "/api/interview",
    method: "get",
    params: { ...page, typeId: val },
  });
}

// 删除面试
export function deleteInterview<T>(id: string) {
  return Request.request<T>({
    url: `/api/interview/${id}`,
    method: "delete",
  });
}
