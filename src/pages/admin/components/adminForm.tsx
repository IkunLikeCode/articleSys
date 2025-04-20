/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Button,
  Form,
  FormInstance,
  Input,
  Radio,
  RadioChangeEvent,
  Upload,
} from "antd";
import React, { useEffect, useRef, useState, useImperativeHandle } from "react";
interface AdminItem {
  avatar: string;
  enabled?: boolean;
  loginId: string;
  loginPwd: string;
  nickname: string;
  permission: number;
  _id?: string;
}

const AdminForm = React.forwardRef(
  (
    props: {
      adminInfo: AdminItem;
      setAdminInfo: React.Dispatch<React.SetStateAction<AdminItem>>;
      addOrEdit: "add" | "edit";
      finish: () => void;
    },
    ref
  ) => {
    // 表单ref
    const formRef = useRef<FormInstance>(null);
    useImperativeHandle(ref, () => {
      return {
        formRef,
      };
    });
    {
      // 图片地址
      const [imageUrl, setImageUrl] = useState<string>("");
      // 单选框
      const [value, setValue] = useState(2);
      // 单选框改变事件
      const onChange = (e: RadioChangeEvent) => {
        props.setAdminInfo({ ...props.adminInfo, permission: e.target.value });
        setValue(e.target.value);
      };

      // 上传图片按钮
      const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
          <div style={{ marginTop: 8, fontSize: 40 }}>+</div>
        </button>
      );
      // 上传图片
      const uploadChange = ({ file }: { file: any }) => {
        if (props.addOrEdit === "add") {
          if (file.status === "done") {
            props.setAdminInfo({
              ...props.adminInfo,
              avatar: file.response.data,
            });
            setImageUrl("http://127.0.0.1:7001" + file.response.data);
          }
          return;
        }
        if (props.addOrEdit === "edit") {
          if (file.status === "done") {
            setImageUrl("http://127.0.0.1:7001" + file.response.data);
            props.setAdminInfo({
              ...props.adminInfo,
              avatar: file.response.data,
            });
          }
        }
      };

      useEffect(() => {
        if (props.addOrEdit === "edit") {
          formRef.current?.setFieldsValue(props.adminInfo);
        }
      });
      return (
        <div className="">
          <Form
            ref={formRef}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            style={{ maxWidth: 600 }}
            onFinish={() => {
              props.finish();
            }}
            initialValues={props.adminInfo}
            autoComplete="off">
            <Form.Item
              label="登录账号"
              name="loginId"
              rules={[
                { required: true, message: "登录账号不能为空" },
                { min: 2, message: "登录账号不能小于2位" },
                { max: 10, message: "登录账号不能大于10位" },
              ]}>
              <Input
                disabled={props.addOrEdit === "edit"}
                onChange={(e) =>
                  props.setAdminInfo({
                    ...props.adminInfo,
                    loginId: e.target.value,
                  })
                }
                placeholder="登录账号不能为空"
                type="text"
              />
            </Form.Item>
            <Form.Item name="loginPwd" label="登录密码">
              <Input
                disabled={props.addOrEdit === "edit"}
                onChange={(e) =>
                  props.setAdminInfo({
                    ...props.adminInfo,
                    loginPwd: e.target.value,
                  })
                }
                placeholder="默认密码为123456"
                type="text"
              />
            </Form.Item>
            <Form.Item name="nickname" label="昵称">
              <Input
                onChange={(e) =>
                  props.setAdminInfo({
                    ...props.adminInfo,
                    nickname: e.target.value,
                  })
                }
                placeholder="请输入昵称"
                type="text"
              />
            </Form.Item>
            <Form.Item name="permission" label="权限">
              <Radio.Group
                onChange={onChange}
                value={value}
                options={[
                  {
                    value: 1,
                    label: "超级管理员",
                  },
                  {
                    value: 2,
                    label: "普通管理员",
                  },
                ]}
              />
            </Form.Item>

            {props.addOrEdit === "edit" ? (
              <Form.Item name="avatar" label="头像">
                <Avatar src={imageUrl || props.adminInfo.avatar} alt="头像" />
              </Form.Item>
            ) : null}

            <Form.Item label="头像">
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/api/upload"
                onChange={uploadChange}
                maxCount={1}>
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
              <Button type="primary" htmlType="submit">
                {props.addOrEdit === "add" ? "提交" : "编辑"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
    }
  }
);

export default AdminForm;
