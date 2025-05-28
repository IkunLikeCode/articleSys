import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store";
import { getIssueList } from "../../store/module/issue/issue";
import { IPage, issueItem } from "../../store/module/issue/type";
import { issueState } from "../../store/module/issue/type";
import {
  Button,
  Col,
  message,
  Modal,
  Popconfirm,
  Row,
  Switch,
  Table,
  TableProps,
  Tag,
} from "antd";
import { rootReducer } from "../../store/type";
import { getTypeList } from "../../store/module/type/typeStore";
import { formatDate } from "../../util/fromatDate";
import { editIssue, deleteIssue } from "../../store/module/issue/issue";
import { UserItem } from "../user/type";
import { getUserInfo } from "../../api/user";
import type { ReqeustStateSolid } from "../../../types/commonType";
function Issue() {
  const dispathch = useDispatch<AppDispatch>();
  const { typeList } = useSelector((state: rootReducer) => state.type);
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 8,
  });
  // 表格列
  const columns: TableProps<
    issueState["issueList"]["data"]["data"][number]
  >["columns"] = [
    {
      title: "序号",
      key: "_id",
      align: "center",
      render: (_, _row, index) => {
        return index + 1;
      },
    },
    {
      title: "问答标题",
      dataIndex: "issueTitle",
      align: "center",
      key: "issueTitle",
    },
    {
      title: "浏览数",
      dataIndex: "scanNumber",
      align: "center",
      key: "scanNumber",
    },
    {
      title: "评论数",
      dataIndex: "commentNumber",
      align: "center",
      key: "commentNumber",
    },
    {
      title: "问答类型",
      dataIndex: "typeId",
      align: "center",
      key: "typeId",
      render: (text: string) => {
        return (
          <Tag color="magenta">
            {typeList.data.find((item) => {
              return item._id === text;
            })?.typeName || "暂无"}
          </Tag>
        );
      },
    },
    {
      title: "发布时间",
      dataIndex: "issueDate",
      align: "center",
      key: "issueDate",
      render: (text: string) => {
        return formatDate(Number(text));
      },
    },
    {
      title: "审核状态",
      dataIndex: "issueStatus",
      align: "center",
      key: "issueStatus",
      render: (text: boolean, row: issueItem) => {
        return (
          <Switch
            onChange={() => {
              swithchChangeStatus(row);
            }}
            checked={text}
            size="small"></Switch>
        );
      },
    },
    {
      title: "操作",
      align: "center",
      key: "action",
      render: (row: issueItem) => {
        return (
          <div>
            <Button
              type="link"
              onClick={() => {
                showIsuueDetail(row);
              }}>
              详情
            </Button>
            <Popconfirm
              title="确认删除吗"
              okText="确认"
              cancelText="取消"
              onConfirm={() => {
                deleteIssueAsync(row._id);
              }}>
              <Button color="danger" variant="link">
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  // 列表数据
  const [issueList, setIssueList] = useState<issueState["issueList"]["data"]>();
  // 获取列表
  async function getIssueListAsync(params: IPage) {
    const result = await dispathch(getIssueList({ page: params }));
    const newRes: issueState["issueList"] =
      result.payload as issueState["issueList"];
    setIssueList(newRes.data);
  }
  // 审核状态改变
  async function swithchChangeStatus(params: issueItem) {
    dispathch(
      editIssue({
        issue: {
          issueStatus: !params.issueStatus,
        },
        id: params._id,
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ).then((res: any) => {
      if (res.payload.code === 0) {
        getIssueListAsync(pageInfo);
        message.success("修改成功");
      }
    });
  }

  // 页码改变
  function changePageHandle(page: IPage) {
    setPageInfo({
      current: page.current,
      pageSize: page.pageSize,
    });
    getIssueListAsync(page);
  }
  // 删除
  async function deleteIssueAsync(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispathch(deleteIssue(id)).then((res: any) => {
      if (res.payload.code === 0) {
        message.success("删除成功");
        getIssueListAsync(pageInfo);
      }
    });
  }
  // 控制模态框
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<issueItem>({} as issueItem);
  const [currentUserInfo, setCurrentUserInfo] = useState<UserItem>(
    {} as UserItem
  );
  const onOk = () => {
    setIsModalOpen(false);
  };
  const onCancel = () => {
    setIsModalOpen(false);
  };
  const showIsuueDetail = async (row: issueItem) => {
    setCurrentItem(row);
    const result = await getUserInfo<ReqeustStateSolid<UserItem>>(row.userId);
    setCurrentUserInfo(result.data);
    setIsModalOpen(true);
  };

  // 初始化
  useEffect(() => {
    getIssueListAsync(pageInfo);
  }, []);
  useEffect(() => {
    if (!typeList.data.length) {
      dispathch(getTypeList());
    }
  }, []);
  return (
    <div>
      <Table
        rowKey={"_id"}
        columns={[...columns]}
        dataSource={issueList?.data}
        onChange={(page) => {
          changePageHandle(page as IPage);
        }}
        pagination={{
          current: pageInfo.current,
          pageSize: pageInfo.pageSize,
          total: issueList?.count,
        }}></Table>
      <Modal
        title="问答详情"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={onOk}
        cancelText="取消"
        okText="确认"
        onCancel={onCancel}>
        <Row
          style={{
            margin: "20px 0",
          }}>
          <Col span={3}>标题:</Col>
          <Col span={12}>{currentItem?.issueTitle}</Col>
        </Row>
        <Row
          style={{
            marginBottom: 20,
          }}>
          <Col span={3}>发布人:</Col>
          <Col span={12}>{currentUserInfo?.nickname}</Col>
        </Row>
        <Row
          style={{
            marginBottom: 20,
          }}>
          <Col span={4}>问答类型:</Col>
          <Col span={12}>
            <Tag color="magenta">
              {typeList.data.find((item) => {
                return item._id === currentItem?.typeId;
              })?.typeName || "暂无"}
            </Tag>
          </Col>
        </Row>
        <Row
          style={{
            marginBottom: 20,
          }}>
          <Col span={4}>发表时间:</Col>
          <Col span={12}>{formatDate(Number(currentItem.issueDate))}</Col>
        </Row>
        <Row
          style={{
            marginBottom: 20,
          }}>
          <Col span={4}>发表内容</Col>
          <Col span={12}>
            <div
              style={{
                width: "100%",
                overflow: "auto",
              }}
              dangerouslySetInnerHTML={{
                __html: currentItem.issueContent,
              }}></div>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}
export default Issue;
