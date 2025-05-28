import Request from "./index";
export function setViewCount(id: string) {
  return Request.request({
    url: "https://env-00jxtf859sgm.dev-hz.cloudbasefunction.cn/myarticle/viewArticle",
    method: "POST",
    data: {
      articleId: id,
    },
  });
}

export function getArticleDetail<T>(id: string) {
  return Request.request<T>({
    url: "https://env-00jxtf859sgm.dev-hz.cloudbasefunction.cn/myarticle/getArticleDetail",
    method: "POST",
    data: {
      articleId: id,
    },
  });
}
