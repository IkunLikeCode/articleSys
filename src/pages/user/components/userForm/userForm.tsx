/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Input, Upload } from "antd";
import React, { useEffect, useRef, useState } from "react";
import type { postUserInfo } from "../../type";

interface UserFormProps {
  postUserInfo: postUserInfo;
  setPostUserInfo: React.Dispatch<React.SetStateAction<postUserInfo>>;
  finish: () => void;
  addOrEdit: "add" | "edit";
}

function UserForm(props: UserFormProps) {
  const { postUserInfo, setPostUserInfo, finish, addOrEdit } = props;
  const formRef = useRef<FormInstance>(null);
  const [imageUrl, setImageUrl] = useState<string>();
  // 上传图片
  const changeHandle = (info: any) => {
    if (info.file.status === "done") {
      setImageUrl("http://127.0.0.1:7001" + info.file.response.data);
      setPostUserInfo({ ...postUserInfo, avatar: info.file.response.data });
    }
  };
  // 上传按钮
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}></div>
    </button>
  );
  useEffect(() => {
    if (formRef.current && addOrEdit === "edit") {
      formRef.current.setFieldsValue(postUserInfo);
      setImageUrl("http://127.0.0.1:7001" + postUserInfo.avatar);
    }
  }, [addOrEdit, postUserInfo]);
  return (
    <div className="userForm_container">
      <Form
        ref={formRef}
        style={{ maxWidth: 600 }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={finish}>
        <Form.Item
          label="登录账号"
          name="loginId"
          rules={[{ message: "登录账号不能为空", required: true }]}>
          <Input
            disabled={addOrEdit === "edit"}
            value={postUserInfo.loginId}
            onChange={(e) =>
              setPostUserInfo({
                ...postUserInfo,
                loginId: e.target.value,
              })
            }
            placeholder="登录账号"
          />
        </Form.Item>
        <Form.Item name="loginPwd" label="登录密码">
          <Input.Password
            value={postUserInfo.loginPwd}
            onChange={(e) => {
              setPostUserInfo({
                ...postUserInfo,
                loginPwd: e.target.value,
              });
            }}
            placeholder="默认密码为123456"
          />
        </Form.Item>
        <Form.Item name="nickname" label="用户昵称">
          <Input
            value={postUserInfo.nickname}
            onChange={(e) => {
              setPostUserInfo({
                ...postUserInfo,
                nickname: e.target.value,
              });
            }}
            placeholder="请输入昵称"
          />
        </Form.Item>
        <Form.Item label="用户头像">
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={changeHandle}
            action="/api/upload">
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item name="mail" label="邮箱">
          <Input
            value={postUserInfo.mail}
            onChange={(e) => {
              setPostUserInfo({
                ...postUserInfo,
                mail: e.target.value,
              });
            }}
            placeholder="请输入用户邮箱"
          />
        </Form.Item>
        <Form.Item name="qq" label="QQ">
          <Input
            value={postUserInfo.qq}
            onChange={(e) => {
              setPostUserInfo({
                ...postUserInfo,
                qq: e.target.value,
              });
            }}
            placeholder="请输入QQ"
          />
        </Form.Item>
        <Form.Item name="wechat" label="微信">
          <Input
            value={postUserInfo.wechat}
            onChange={(e) => {
              setPostUserInfo({
                ...postUserInfo,
                wechat: e.target.value,
              });
            }}
            placeholder="请输入微信"
          />
        </Form.Item>
        <Form.Item name="intro" label="简介">
          <Input.TextArea
            value={postUserInfo.intro}
            onChange={(e) => {
              setPostUserInfo({
                ...postUserInfo,
                intro: e.target.value,
              });
            }}
            placeholder="请输入简介"
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default UserForm;
