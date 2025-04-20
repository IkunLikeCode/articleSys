import { Button, Checkbox, Form, Input, message } from "antd";
import "./login.less";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getCaptcha } from "../../api/captcha";
import { adminLogin, getAdminInfo } from "../../api/admin";
import type { ReqeustState } from "../../../types/commonType";
import type { AdminPersonalInfo } from "../../store/module/admin/type";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { setAdminInfo } from "../../store/module/admin/admin";
import { useNavigate } from "react-router";
function Login() {
  // 路由
  const navigate = useNavigate();
  // 派发
  const dispatch = useDispatch<AppDispatch>();
  // 验证码
  const [captcha, setCaptcha] = useState("");
  // 获取验证码
  const getCaptchaApi = async () => {
    const res = await getCaptcha<string>();
    setCaptcha(res);
  };
  // 提交表单
  async function subMitForm(value: {
    loginId: string;
    loginPwd: string;
    captcha: string;
    remember: boolean;
  }) {
    const result = await adminLogin<ReqeustState>(value);
    if (result.code === 0) {
      if (!result.data.data) {
        message.warning("用户名或密码错误");
        getCaptchaApi();
        return;
      }
      if (!result.data.data.enabled) {
        message.warning("该用户已被禁用");
        getCaptchaApi();
        return;
      } else {
        message.success("登录成功");
        localStorage.setItem("coderStationToken", result.data.token);
        const adminInfo = await getAdminInfo<AdminPersonalInfo>(
          result.data.data._id
        );
        dispatch(setAdminInfo(adminInfo));
        navigate({
          pathname: "/home",
        });
      }
    }
    if (result.code === 406) {
      message.warning("验证码错误");
      getCaptchaApi();
      return;
    }
  }
  useEffect(() => {
    getCaptchaApi();
  }, []);
  return (
    <div className="login-container">
      <Form
        name="normal_login"
        className="login-form"
        onFinish={subMitForm}
        initialValues={{ remember: true }}>
        <Form.Item
          name="loginId"
          rules={[{ required: true, message: "请输入用户名!" }]}>
          <Input
            className="login-input"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="用户名"
          />
        </Form.Item>
        <Form.Item
          name="loginPwd"
          rules={[{ required: true, message: "请输入密码!" }]}>
          <Input.Password
            autoComplete={"off"}
            className="login-input"
            placeholder="密码"
            prefix={
              <LockOutlined className="site-form-item-icon" />
            }></Input.Password>
        </Form.Item>
        <Form.Item>
          <Form.Item
            name="captcha"
            noStyle
            rules={[{ required: true, message: "请输入验证码!" }]}>
            <div className="captcha">
              <Input className="login-input" placeholder="输入验证码" />
              <div className="captchaBox">
                <div dangerouslySetInnerHTML={{ __html: captcha }}></div>
              </div>
            </div>
          </Form.Item>
          <span className="captcha-display"></span>
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <div className="remember">
            <Checkbox>记住我</Checkbox>
          </div>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default Login;
