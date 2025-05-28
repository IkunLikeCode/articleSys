import { useEffect, useState } from "react";
import { getUserList, deleteUser, updateUser } from "../../api/user";
import { userListType, UserItem, userInfo } from "./type";
import {
  Avatar,
  Button,
  Card,
  Input,
  message,
  Modal,
  Popconfirm,
  Switch,
  Table,
} from "antd";
import type { TableProps } from "antd";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { rootReducer } from "../../store/type";
interface pageInfoType {
  current: number;
  pageSize: number;
  loginId?: string;
  nickname?: string;
}

// 获取用户列表
async function getUserListAsync(props: {
  current: number;
  pageSize: number;
  loginId?: string;
  nickname?: string;
}) {
  try {
    const result = await getUserList<userListType>(props);
    if (result.code === 0) {
      return Promise.resolve(result as userListType);
    }
  } catch (error) {
    console.log(error);
  }
}

// 搜索组件
function SearchUser(props: {
  pageInfo: pageInfoType;
  setUserList: React.Dispatch<React.SetStateAction<userListType>>;
}) {
  const { pageInfo, setUserList } = props;
  const [loginId, setLoginId] = useState("");
  const [nickname, setNickname] = useState("");
  // 点击搜索按钮
  function onSearch(key: string) {
    if (key === "loginId") {
      getUserListAsync({ ...pageInfo, loginId }).then((res) => {
        setUserList(res!);
      });
      setLoginId("");
      return;
    }
    if (key === "nickname") {
      getUserListAsync({ ...pageInfo, nickname }).then((res) => {
        setUserList(res!);
      });
      setNickname("");
      return;
    }
  }
  return (
    <Card hoverable style={{ width: 400, margin: "5px 0" }}>
      <Input.Search
        placeholder="请输入登录账号"
        onSearch={() => onSearch("loginId")}
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)}
        style={{ width: 300 }}
      />
      <Input.Search
        placeholder="请输入昵称"
        value={nickname}
        onSearch={() => onSearch("nickname")}
        onChange={(e) => setNickname(e.target.value)}
        style={{ width: 300, margin: "10px 0" }}
      />
      <Button
        type="primary"
        onClick={() => {
          getUserListAsync({ ...pageInfo }).then((res) => {
            setUserList(res!);
          });
        }}>
        重置
      </Button>
    </Card>
  );
}
function User() {
  const navigate = useNavigate();
  const userInfoStr: { key: string; label: string }[] = [
    { key: "avatar", label: "头像" },
    { key: "enabled", label: "是否启用" },
    { key: "intro", label: "简介" },
    { key: "lastLoginDate", label: "最后登录时间" },
    { key: "loginId", label: "登录账号" },
    { key: "loginPwd", label: "登录密码" },
    { key: "mail", label: "邮箱" },
    { key: "nickname", label: "昵称" },
    { key: "points", label: "积分" },
    { key: "qq", label: "QQ" },
    { key: "registerDate", label: "注册时间" },
    { key: "wechat", label: "微信" },
    { key: "_id", label: "ID" },
    { key: "type", label: "类型" },
  ];
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 6,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 获取当前管理员信息
  const { adminInfo } = useSelector((state: rootReducer) => state.admin);
  // 当前用户信息
  const [currentUser] = useState<userInfo>({
    avatar: "",
    enabled: false,
    intro: "",
    lastLoginDate: "",
    loginId: "",
    loginPwd: "",
    mail: "",
    nickname: "",
    poinits: 0,
    qq: "",
    registerDate: "",
    wechat: "",
    _id: "",
    type: "",
  });
  // 用户列表
  const [userList, setUserList] = useState<userListType>({
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

  // 删除用户
  async function deleteUserItem(item: UserItem) {
    try {
      await deleteUser(item._id);
      getUserListAsync(pageInfo).then((res) => setUserList(res!));
      message.success("删除成功");
    } catch (error) {
      console.log(error);
    }
  }
  // 编辑
  function editUser(row: UserItem) {
    navigate(
      {
        pathname: "/user/editUser",
      },
      {
        state: {
          id: row._id,
        },
      }
    );
  }
  // 分页
  function changePage(pageInfoProps: pageInfoType) {
    setPageInfo({
      current: pageInfoProps.current || 1,
      pageSize: pageInfoProps.pageSize || 8,
    });
  }
  // 修改用户状态
  async function changeUserEnabled(item: UserItem) {
    try {
      await updateUser(item._id, { enabled: !item.enabled });
      getUserListAsync(pageInfo).then((res) => setUserList(res!));
      if (item.enabled) {
        message.warning("用户已禁用");
      } else {
        message.success("用户已启用");
      }
    } catch (error) {
      console.log(error);
    }
  }
  // 关闭弹窗
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // 详情
  const detail = (item: UserItem) => {
    Object.assign(currentUser, item);
    setIsModalOpen(true);
  };
  // 表格配置
  const columns: TableProps<userListType["data"]["data"][number]>["columns"] = [
    {
      title: "序号",
      key: "_id",
      align: "center",
      render: (_, _record, index) => {
        return index + 1;
      },
    },
    {
      title: "登录账号",
      dataIndex: "loginId",
      key: "loginId",
      align: "center",
    },
    {
      title: "登录密码",
      dataIndex: "loginPwd",
      key: "loginPwd",
      align: "center",
    },
    {
      title: "昵称",
      dataIndex: "nickname",
      key: "nickname",
      align: "center",
    },
    {
      title: "头像",
      key: "avatar",
      align: "center",
      render: (row) => {
        return <Avatar src={"http://127.0.0.1:7001" + row.avatar}></Avatar>;
      },
    },
    {
      title: "状态",
      key: "enabled",
      align: "center",
      render: (row: UserItem) => {
        return (
          <Switch
            onChange={() => changeUserEnabled(row)}
            checked={row.enabled}
            size="small"></Switch>
        );
      },
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      render: (row: UserItem) => {
        return (
          <>
            <Button color="gold" variant="link" onClick={() => detail(row)}>
              详情
            </Button>
            <Button type="link" onClick={() => editUser(row)}>
              编辑
            </Button>
            {adminInfo.data.permission === 1 ? (
              <Popconfirm
                title="你确定要删除吗?"
                cancelText="取消"
                okText="确定"
                onConfirm={() => deleteUserItem(row)}>
                <Button color="red" variant="link">
                  删除
                </Button>
              </Popconfirm>
            ) : null}
          </>
        );
      },
    },
  ];
  useEffect(() => {
    getUserListAsync(pageInfo).then((res) => {
      setUserList(res!);
    });
  }, [pageInfo]);
  return (
    <div className="user_container">
      <SearchUser setUserList={setUserList} pageInfo={pageInfo}></SearchUser>
      <Table
        rowKey="_id"
        dataSource={
          userList.data.data as userListType["data"]["data"][number][]
        }
        pagination={{
          current: pageInfo.current,
          pageSize: pageInfo.pageSize,
          total: userList.data.count,
        }}
        onChange={(pageInfoProps) => changePage(pageInfoProps as pageInfoType)}
        columns={columns}
      />
      <Modal
        title="用户信息"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}>
        <div className="user_info">
          {Object.keys(currentUser).map((item: string) => {
            return (
              <div key={item} style={{ margin: 10 }}>
                {userInfoStr.find((info) => info.key === item)?.label || item}:
                {item === "avatar" ? (
                  <Avatar
                    src={
                      "http://127.0.0.1:7001" + currentUser["avatar"]
                    }></Avatar>
                ) : (
                  currentUser[item as keyof userInfo]
                )}
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}
export default User;
