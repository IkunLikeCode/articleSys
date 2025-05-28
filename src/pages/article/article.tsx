import ArticlerticleItem from "./components/articleItem";
import { useDispatch, useSelector } from "react-redux";
import { getArticleList } from "../../store/module/article/article";
import { useEffect } from "react";
import { AppDispatch } from "../../store";
import { rootReducer } from "../../store/type";
import { Pagination } from "antd";
function Article() {
  const { articleList } = useSelector((state: rootReducer) => state.article);
  const dispatch = useDispatch<AppDispatch>();
  const pageSzie = 5;
  // 分页
  const changePage = (pageData: number) => {
    const current = (pageData - 1) * pageSzie;
    dispatch(getArticleList({ current, size: pageSzie }));
  };
  useEffect(() => {
    dispatch(getArticleList({ current: 0, size: 5 }));
  }, []);

  return (
    <div className="chat">
      {/* 文章列表 */}
      {articleList.data.map((item) => {
        return (
          <ArticlerticleItem key={item._id} itemData={item}></ArticlerticleItem>
        );
      })}
      {/* 分页 */}
      {articleList.data.length ? (
        <Pagination
          defaultCurrent={1}
          pageSize={pageSzie}
          onChange={(page) => {
            changePage(page);
          }}
          total={articleList.count}
        />
      ) : null}
    </div>
  );
}

export default Article;
