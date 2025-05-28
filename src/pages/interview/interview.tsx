import { getInterviewList, deleteInterview } from "../../api/interview";
import { useEffect, useState } from "react";
import { interviewList } from "./type";
import {
  Button,
  Card,
  message,
  Popconfirm,
  Select,
  Table,
  TableProps,
  Tag,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { rootReducer } from "../../store/type";
import { AppDispatch } from "../../store";
import { getTypeList } from "../../store/module/type/typeStore";
import { formatDate } from "../../util/fromatDate";
import { BookItem } from "../book/type";
import { useNavigate } from "react-router";
import type { pageInfo } from "./type";
import { fetchGetInterviewByType } from "../../store/module/interview/interview";
function Interview() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { typeList } = useSelector((state: rootReducer) => state.type);
  const [selectValue, setSelectValue] = useState("");
  const [interviewListData, setInterviewList] = useState<interviewList>({
    code: 0,
    msg: "",
    data: {
      count: 0,
      data: [],
      currentPage: 0,
      eachPage: 0,
      totalPage: 0,
    },
  });
  const [page, setPage] = useState({
    current: 1,
    pageSize: 8,
  });
  // 获取面试列表
  const getInterview = async (pageType: pageInfo) => {
    const res = await getInterviewList<interviewList>(pageType);
    setInterviewList(res);
  };
  // 表格列
  const columns: TableProps<interviewList["data"]["data"][number]>["columns"] =
    [
      {
        title: "序号",
        align: "center",
        key: "index",
        render: (_text, _record, index) => {
          return <div>{index + 1}</div>;
        },
      },
      {
        title: "题目标题",
        align: "center",
        dataIndex: "interviewTitle",
        key: "interviewTitle",
      },
      {
        title: "题目类型",
        align: "center",
        dataIndex: "typeId",
        key: "typeId",
        render: (text) => {
          const type = typeList.data.find((item) => item._id === text);
          return <Tag color="red">{type?.typeName}</Tag>;
        },
      },
      {
        title: "发布时间",
        align: "center",
        dataIndex: "onShelfDate",
        key: "onShelfDate",
        render: (text) => {
          return <div>{formatDate(Number(text))}</div>;
        },
      },
      {
        title: "操作",
        align: "center",
        key: "operation",
        render: (row: BookItem) => {
          return (
            <div>
              <Button
                color="primary"
                variant="text"
                onClick={() => {
                  navigate("/interview/interviewEdit", {
                    state: {
                      interviewId: row._id,
                    },
                  });
                }}>
                编辑
              </Button>
              <Button
                color="orange"
                variant="text"
                onClick={() => {
                  navigate("/interview/interviewDetail/" + row._id);
                }}>
                详情
              </Button>
              <Popconfirm
                title="确定删除吗？"
                onConfirm={() => deleteInterviewItem(row._id)}
                okText="确认"
                cancelText="取消">
                <Button color="red" variant="text">
                  删除
                </Button>
              </Popconfirm>
            </div>
          );
        },
      },
    ];

  // 分页
  const changePage = (page: pageInfo) => {
    setPage({
      current: page.current,
      pageSize: page.pageSize,
    });
    getInterview(page);
  };
  // 删除面试
  const deleteInterviewItem = async (id: string) => {
    try {
      await deleteInterview(id);
      getInterview(page);
      message.success("删除成功");
    } catch (error: unknown) {
      message.error(error as string);
    }
  };
  // 改变题目类型
  const changeHandle = (value: string) => {
    setSelectValue(value);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(fetchGetInterviewByType(value)).then((res: any) => {
      if (res.payload.code == 0) {
        setInterviewList(res.payload);
        setPage({
          current: 1,
          pageSize: 1000,
        });
      }
    });
  };
  // 重置面试列表
  const resetInterviewList = () => {
    setPage({
      current: 1,
      pageSize: 8,
    });
    getInterview(page);
    setSelectValue("");
  };

  // 组件第一次渲染时获取面试列表
  useEffect(() => {
    getInterview(page);
    if (typeList.data.length === 0) {
      dispatch(getTypeList());
    }
  }, [dispatch, typeList.data.length]);
  return (
    <div className="interview_container">
      <Card hoverable>
        <Select
          style={{ width: 400 }}
          value={selectValue}
          options={typeList.data.map((item) => {
            return {
              label: item.typeName,
              value: item._id,
            };
          })}
          onChange={changeHandle}></Select>
        <Button
          style={{
            marginLeft: "10px",
          }}
          onClick={resetInterviewList}
          type="primary">
          重置
        </Button>
      </Card>
      <Table
        style={{
          marginTop: "20px",
        }}
        rowKey={"_id"}
        columns={columns}
        dataSource={interviewListData.data.data}
        onChange={(page) => changePage(page as pageInfo)}
        pagination={{
          pageSize: page.pageSize,
          current: page.current,
          total: interviewListData.data.count,
        }}
      />
    </div>
  );
}
export default Interview;
