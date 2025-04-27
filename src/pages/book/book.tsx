/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteBook, getBookList } from "../../api/book";
import { useEffect, useState } from "react";
import type { BookItem, bookListType, pageType } from "./type";
import {
  Table,
  TableProps,
  Tag,
  Image,
  Button,
  Popconfirm,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { getTypeList } from "../../store/module/type/typeStore";
import { rootReducer } from "../../store/type";
import { useNavigate } from "react-router";
function Bok() {
  const navigator = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { typeList } = useSelector((state: rootReducer) => state.type);
  const [total, setTotal] = useState<number>(0);
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [bookList, setBookList] = useState<bookListType["data"]["data"]>([]);

  // 获取书籍列表
  const getBookListApi = async (pageInfoType: pageType) => {
    const res = await getBookList<bookListType>(pageInfoType);
    setBookList(res.data.data);
    setTotal(res.data.count);
  };
  // 页码改变
  const changePage = (pageInfoType: pageType) => {
    setPageInfo({
      ...pageInfoType,
    });
    getBookListApi(pageInfoType);
  };
  // 删除书籍
  const deleteBookItem = async (row: BookItem) => {
    try {
      await deleteBook(row._id);
      getBookListApi(pageInfo);
      message.success("删除成功");
    } catch (error: any) {
      message.error(error);
    }
  };

  // 表格初始化
  const columns: TableProps<bookListType["data"]["data"][number]>["columns"] = [
    {
      title: "序号",
      key: "index",
      align: "center",
      render: (_, record, index) => {
        return index + 1;
      },
    },
    {
      title: "书名",
      dataIndex: "bookTitle",
      key: "bookTitle",
      align: "center",
    },
    {
      title: "书籍类型",
      dataIndex: "typeId",
      key: "typeId",
      align: "center",
      render: (typeId: string) => {
        return (
          <Tag color={"purple"}>
            {typeList.data.find((item) => item._id === typeId)?.typeName ||
              "暂无"}
          </Tag>
        );
      },
    },
    {
      title: "书籍封面",
      dataIndex: "bookPic",
      key: "bookPic",
      align: "center",
      render: (bookPic: string) => {
        return (
          <Image
            style={{
              width: "100px",
              height: "100px",
            }}
            src={"http://127.0.0.1:7001" + bookPic}></Image>
        );
      },
    },
    {
      title: "评论数",
      dataIndex: "commentNumber",
      key: "commentNumber",
      align: "center",
    },
    {
      title: "浏览数",
      dataIndex: "scanNumber",
      key: "scanNumber",
      align: "center",
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      render: (row: BookItem) => {
        return (
          <div>
            <Button
              type="link"
              color="primary"
              onClick={() => {
                navigator("/book/bookEdit", { state: { id: row._id } });
              }}>
              编辑
            </Button>
            <Popconfirm
              cancelText="取消"
              okText="确认"
              title="确定删除吗？"
              onConfirm={() => {
                deleteBookItem(row);
              }}>
              <Button variant="text" color="danger">
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getBookListApi(pageInfo);
    if (!typeList.data.length) {
      dispatch(getTypeList());
    }
  }, []);
  return (
    <div className="Book_container">
      <Table
        pagination={{
          current: pageInfo.current,
          pageSize: pageInfo.pageSize,
          total: total,
        }}
        onChange={(page) => {
          changePage(page as pageType);
        }}
        rowKey={"_id"}
        columns={columns}
        dataSource={bookList}
      />
    </div>
  );
}

export default Bok;
