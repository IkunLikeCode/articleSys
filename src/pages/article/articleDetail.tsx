import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getArticleDetail } from "../../api/article";
import "./articleDetail.css";
import { ArticleState } from "../../store/module/article/type";
function ArticleDetail() {
  const [articleDetail, setArticleDetail] = useState<
    ArticleState["articleList"]
  >({
    code: 0,
    count: 0,
    data: [],
    errCode: 0,
    errMsg: "",
    message: "",
  });
  const { articleId } = useParams();
  const getArtilcleDetailAsync = async (id: string) => {
    const res = await getArticleDetail<ArticleState["articleList"]>(id);
    if (res.errCode === 0) {
      setArticleDetail(res);
    }
  };
  useEffect(() => {
    if (articleId) {
      getArtilcleDetailAsync(articleId);
    }
  }, [articleId]);
  return (
    <div className="articleDetail">
      <div className="bgBox">
        <img className="bg" src={articleDetail?.data[0]?.avatar}></img>
        <div className="mask"></div>
        <div className="title">{articleDetail?.data[0]?.title}</div>
      </div>
      <div className="content">
        <div
          dangerouslySetInnerHTML={{
            __html: articleDetail?.data[0]?.content,
          }}
          className="inner"></div>
      </div>
    </div>
  );
}
export default ArticleDetail;
