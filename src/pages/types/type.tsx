import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTypeList } from "../../store/module/type/typeStore";
import type { rootReducer } from "../../store/type";
import type { AppDispatch } from "../../store";
import { Button, Input, message, Modal, Popconfirm, Table } from "antd";
import { deleteType, addType } from "../../store/module/type/typeStore";
function Type() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { typeList } = useSelector((state: rootReducer) => state.type);
  const [typeName, setTypeName] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const confirmHandle = (id: string) => {
    dispatch(deleteType(id)).then(() => {
      message.success("删除成功");
    });
  };
  const columns = [
    {
      title: "类型名称",
      dataIndex: "typeName",
      key: "typeName",
      align: "center",
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (row: any) => {
        return (
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={() => {
              confirmHandle(row._id);
            }}
            okText="Yes"
            cancelText="No">
            <Button variant="link" color="red">
              删除
            </Button>
          </Popconfirm>
        );
      },
    },
  ];
  // 显示对话框
  const showModal = () => {
    setIsModalOpen(true);
  };
  // 取消对话框
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // 修改输入框
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypeName(e.target.value);
  };
  // 确定
  const onOkHandle = () => {
    if (!typeName) {
      message.error("类型名称不能为空");
      return;
    }
    dispatch(addType(typeName)).then(() => {
      message.success("添加成功");
      setIsModalOpen(false);
      setTypeName("");
      dispatch(getTypeList());
    });
  };
  useEffect(() => {
    if (!typeList.data.length) {
      dispatch(getTypeList());
    }
  }, []);
  return (
    <div>
      <Button
        onClick={showModal}
        type="primary"
        style={{
          marginBottom: "10px",
        }}>
        添加类型
      </Button>
      <Table
        rowKey={"_id"}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        columns={columns as any}
        dataSource={typeList.data}></Table>

      <Modal
        title="添加类型"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={() => onOkHandle()}
        okText="确定"
        cancelText="取消"
        onCancel={handleCancel}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}>
          <div
            style={{
              width: "100px",
              textAlign: "right",
            }}>
            类型名称：
          </div>
          <Input
            value={typeName}
            onChange={(e) => {
              changeHandler(e);
            }}></Input>
        </div>
      </Modal>
    </div>
  );
}
export default Type;
