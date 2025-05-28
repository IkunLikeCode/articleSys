import {
  Button,
  Card,
  message,
  Modal,
  Popconfirm,
  Radio,
  RadioChangeEvent,
  Table,
  TableProps,
  Tag,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsuueComment,
  deleteComment,
} from "../../store/module/comment/comment";
import { useEffect, useState } from "react";
import { formatDate } from "../../util/fromatDate";
import type { AppDispatch } from "../../store";
import type { rootReducer } from "../../store/type";
import type {
  commentItem,
  commentState,
  deleteCommentType,
} from "../../store/module/comment/type";
import { getTypeList } from "../../store/module/type/typeStore";
import { IPage } from "../../store/module/issue/type";
import { getUserInfo } from "../../api/user";
import type { UserItem } from "../user/type";
import type { ReqeustStateSolid } from "../../../types/commonType";
function Comment() {
  // 当前评论
  const [currentComment, setCurrentComment] = useState<commentItem>();
  //评论的用户信息
  const [userInfo, setUserInfo] = useState<UserItem>();
  // 模态框
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState({
    current: 1,
    pageSize: 5,
  });
  // 获取评论列表
  const { commentList } = useSelector((state: rootReducer) => state.comment);
  // 获取类型列表
  const { typeList } = useSelector((state: rootReducer) => state.type);
  // 当前评论类型
  const [currentCommentType, setCurrentCommentType] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  // 切换评论类型
  const changeRadio = (e: RadioChangeEvent) => {
    if (e.target.value === 1) {
      page.pageSize = 5;
    }
    setCurrentCommentType(e.target.value);
    dispatch(
      getIsuueComment({
        page,
        commentType: e.target.value,
      })
    );
  };
  // 切换页码
  const changeHandle = (page: IPage) => {
    setPage(page);
    dispatch(
      getIsuueComment({
        page,
        commentType: currentCommentType,
      })
    );
  };

  // 查看详情
  const showDetail = (item: commentItem) => {
    setIsModalOpen(true);
    setCurrentComment(item);
    getUserInfo<ReqeustStateSolid<UserItem>>(item.userId).then((res) => {
      setUserInfo(res.data);
    });
  };
  // 删除评论
  const confirmHandle = (commentId: string) => {
    dispatch(deleteComment(commentId)).then((res) => {
      const newRes: deleteCommentType = res.payload as deleteCommentType;
      if (newRes.data.acknowledged) {
        message.success("删除成功");
        dispatch(
          getIsuueComment({
            page,
            commentType: currentCommentType,
          })
        );
      }
    });
  };
  // 表格
  const columns: TableProps<
    commentState["commentList"]["data"]["data"][number]
  >["columns"] = [
    {
      title: "序号",
      key: "index",
      align: "center",
      render: (_text, _record, index) => {
        return index + 1;
      },
    },
    {
      title: "评论内容",
      dataIndex: "commentContent",
      key: "commentContent",
      align: "center",
      render: (text) => {
        return <div dangerouslySetInnerHTML={{ __html: text }}></div>;
      },
    },
    {
      title: "评论时间",
      dataIndex: "commentDate",
      key: "commentDate",
      align: "center",
      render: (text) => {
        return formatDate(Number(text));
      },
    },
    {
      title: "评论类型",
      dataIndex: "typeId",
      key: "typeId",
      align: "center",
      render: (text) => {
        return (
          <Tag color="red">
            {typeList.data.find((item) => {
              return item._id === text;
            })?.typeName
              ? typeList.data.find((item) => {
                  return item._id === text;
                })?.typeName
              : "无"}
          </Tag>
        );
      },
    },
    {
      title: "操作",
      key: "handle",
      align: "center",
      render: (_text, record) => {
        return (
          <div>
            <Button
              onClick={() => {
                showDetail(record);
              }}
              color="primary"
              variant="link">
              详情
            </Button>
            <Popconfirm
              title="你确定要删除此评论"
              onConfirm={() => {
                confirmHandle(record._id);
              }}
              okText="确定"
              cancelText="取消">
              <Button color="danger" variant="link">
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  // 取消对话框
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 第一次加载
  useEffect(() => {
    dispatch(
      getIsuueComment({
        page,
        commentType: currentCommentType,
      })
    );
    if (typeList.data.length === 0) {
      dispatch(getTypeList());
    }
  }, []);
  return (
    <div className="comment_container">
      <Card
        style={{
          marginBottom: 20,
        }}>
        <Radio.Group
          onChange={changeRadio}
          block
          options={[
            { label: "问答评论", value: 1 },
            { label: "书籍评论", value: 2 },
          ]}
          defaultValue={1}
          optionType="button"
          buttonStyle="solid"
        />
      </Card>
      <Table
        rowKey={"_id"}
        columns={columns}
        dataSource={commentList.data?.data}
        onChange={(page) => {
          changeHandle(page as IPage);
        }}
        pagination={{
          pageSize: page.pageSize,
          total: commentList.data?.count,
          current: page.current,
        }}></Table>
      <Modal
        title="评论详情"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        okText="确定"
        cancelText="取消"
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={handleCancel}>
        <div>
          <p>评论内容：{currentComment?.commentContent}</p>
          <p>评论时间：{formatDate(Number(currentComment?.commentDate))}</p>
          <p>
            评论类型：
            <Tag color="red">
              {typeList.data.find((item) => {
                return item._id === currentComment?.typeId;
              })?.typeName
                ? typeList.data.find((item) => {
                    return item._id === currentComment?.typeId;
                  })?.typeName
                : "无"}
            </Tag>
          </p>
          <p>评论用户：{userInfo?.nickname}</p>
        </div>
      </Modal>
    </div>
  );
}
export default Comment;
