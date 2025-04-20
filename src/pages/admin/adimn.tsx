/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAdminList, deleteAdmin, updateAdmin } from "../../api/admin";
import { useEffect, useRef, useState } from "react";
import type { ReqeustStateSolid } from "../../../types/commonType";
import type { AdminItem, AdminList } from "./type";
import {
  Avatar,
  Button,
  message,
  Modal,
  Popconfirm,
  Switch,
  Table,
  TableProps,
  Tag,
} from "antd";
import addHttp from "../../util/addHttp";
import { useSelector, useDispatch } from "react-redux";
import { rootReducer } from "../../store/type";
import { LockOutlined } from "@ant-design/icons";
import AdminForm from "./components/adminForm";
import { AppDispatch } from "../../store";
import { setAdminAvatar } from "../../store/module/admin/admin";
interface AdminItemEdit {
  avatar: string;
  enabled?: boolean;
  loginId: string;
  loginPwd: string;
  nickname: string;
  permission: number;
  _id?: string;
}
function Admin() {
  const dispatch = useDispatch<AppDispatch>();
  // 表单实例
  const formRef = useRef<any>(null);
  // 对话框显示与隐藏
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 编辑的管理员信息
  const [adminInfoEdit, setAdminInfoEdit] = useState<AdminItemEdit>({
    avatar: "",
    loginId: "",
    loginPwd: "",
    nickname: "",
    permission: 2,
    enabled: false as boolean,
    _id: "",
  });
  // 获取管理员信息
  const { adminInfo } = useSelector((state: rootReducer) => state.admin);
  // 删除管理员
  const deleteAdminAsync = async (id: string) => {
    try {
      const res = await deleteAdmin<
        ReqeustStateSolid<{ acknowledged: boolean; deletedCount: number }>
      >(id);
      if (res.data.acknowledged) {
        message.success("删除成功");
        await getAdminListAsync(pageInfo);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 获取管理员列表数据
  async function getAdminListAsync(params: typeof pageInfo) {
    try {
      const res = await getAdminList<ReqeustStateSolid<AdminList>>(params);
      const newData: AdminList = addHttp(res.data, "avatar");
      setAdminList(newData);
    } catch (err) {
      console.log(err);
    }
  }

  // 切换状态
  const switchChangeHandle = async (enabled: boolean, _id: AdminItem) => {
    const newEnabled = !enabled;
    await updateAdmin<ReqeustStateSolid<AdminItem>>(_id._id, {
      enabled: newEnabled,
    });
    await getAdminListAsync(pageInfo);
    if (newEnabled) {
      message.success("启用");
    } else {
      message.warning("禁用");
    }
  };
  // 提交表单
  const finish = async () => {
    try {
      await updateAdmin(adminInfoEdit._id!, adminInfoEdit);
      await getAdminListAsync(pageInfo);
      message.success("修改成功");
      setIsModalOpen(false);
      if (adminInfoEdit._id === adminInfo.data._id) {
        dispatch(setAdminAvatar(adminInfoEdit.avatar));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const editHandle = (item: AdminItem) => {
    setIsModalOpen(true);
    setAdminInfoEdit(item);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    if (formRef.current) {
      formRef.current.formRef.current.resetFields();
    }
  };

  //  分页信息
  const [pageInfo] = useState({ current: 1, pageSize: 5 }),
    // 管理员列表数据
    [adminList, setAdminList] = useState<AdminItem[]>([]);

  // 表格列配置
  const columns: TableProps<AdminItem>["columns"] = [
    {
      title: "登录账号",
      dataIndex: "loginId",
      key: "loginId",
      align: "center",
    },
    {
      title: "用户名",
      dataIndex: "nickname",
      key: "nickname",
      align: "center",
    },
    {
      title: "头像",
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      render: (avatar) => <Avatar src={avatar} alt="头像" />,
    },
    {
      title: "角色",
      dataIndex: "permission",
      key: "permission",
      align: "center",
      render(permission) {
        return permission === 1 ? (
          <Tag color="#f50">超级管理员</Tag>
        ) : (
          <Tag color="#2db7f5">普通管理员</Tag>
        );
      },
    },
    {
      title: "是否启用",
      dataIndex: "enabled",
      key: "enabled",
      align: "center",
      render(enabled, _id) {
        return _id._id === adminInfo.data._id ? (
          <LockOutlined
            style={{
              color: "#1677ff",
              fontSize: 20,
            }}
          />
        ) : (
          <Switch
            onChange={() => switchChangeHandle(enabled, _id)}
            size="small"
            checked={enabled}></Switch>
        );
      },
    },
    {
      title: "状态",
      dataIndex: "enabled",
      key: "enabled",
      align: "center",
      render(enabled) {
        return enabled ? (
          <Tag color="#52c41a">正常</Tag>
        ) : (
          <Tag color="#faad14">禁用</Tag>
        );
      },
    },
    {
      title: "操作",
      key: "action",
      dataIndex: "_id",
      align: "center",
      render: (_id, row) => {
        return (
          <>
            <Button
              onClick={() => editHandle(row)}
              color="primary"
              variant="link">
              编辑
            </Button>
            <Popconfirm
              title="确定要删除吗？"
              onConfirm={() => {
                deleteAdminAsync(_id);
              }}
              cancelText="取消"
              okText="确定">
              <Button color="red" variant="link">
                删除
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getAdminListAsync(pageInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="admin_container">
      <Table
        rowKey={(item) => item._id}
        columns={columns}
        dataSource={adminList}
        pagination={{
          pageSize: 8,
          total: adminList.length,
        }}
      />
      <Modal
        title="管理员信息"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}>
        <AdminForm
          ref={formRef}
          adminInfo={adminInfoEdit}
          setAdminInfo={setAdminInfoEdit}
          addOrEdit="edit"
          finish={finish}></AdminForm>
      </Modal>
    </div>
  );
}

export default Admin;
