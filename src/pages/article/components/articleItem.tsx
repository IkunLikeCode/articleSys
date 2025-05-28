import { Card } from "antd";
import { ArticleItem } from "../../../store/module/article/type";
import "./articleItem.less";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { setViewCount } from "../../../api/article";
interface articleItemState {
  itemData: ArticleItem;
}
function ArticlerticleItem(props: articleItemState) {
  const { itemData } = props;
  const navigate = useNavigate();
  const toArticleDetail = (id: string) => {
    navigate(`/articleDetail/${id}`);
    setViewCount(id);
  };
  return (
    <Card hoverable style={{ margin: "30px 0" }}>
      <div className="item" onClick={() => toArticleDetail(itemData._id)}>
        <div className="title">
          <div className="sticky">{itemData.is_sticky ? "【置顶】" : ""}</div>
          <div className="text">{itemData.title}</div>
        </div>
        <div className="author">
          <div className="authorContainer">
            发布者:<span>{itemData.user_id[0].nickname}</span>
          </div>
          <div className="likeAndView">
            <div className="view">
              <EyeOutlined />
              <span style={{ marginLeft: 5 }}>{itemData.view_count}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ArticlerticleItem;
