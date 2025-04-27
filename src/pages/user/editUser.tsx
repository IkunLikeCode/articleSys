import { useLocation } from "react-router";
import UserForm from "./components/userForm/userForm";
import { useEffect, useState } from "react";
import { getUserInfo, updateUser } from "../../api/user";
import type { postUserInfo } from "./type";
import type { ReqeustStateSolid } from "../../../types/commonType";
import { useNavigate } from "react-router";
import { message } from "antd";

function EditUser() {
  const navigate = useNavigate();
  const {
    state: { id },
  } = useLocation();
  const [postUserInfo, setPostUserInfo] = useState({
    avatar: "",
    intro: "",
    loginId: "",
    loginPwd: "",
    mail: "",
    nickname: "",
    qq: "",
    type: "",
    wechat: "",
  });
  // 表单提交事件
  const finish = async () => {
    try {
      await updateUser(id, postUserInfo);
      navigate("/user/userList");
      message.success("修改成功");
      // 清空表单数据
      setPostUserInfo({
        avatar: "",
        intro: "",
        loginId: "",
        loginPwd: "",
        mail: "",
        nickname: "",
        qq: "",
        type: "",
        wechat: "",
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserInfo<ReqeustStateSolid<postUserInfo>>(id).then((res) => {
      setPostUserInfo(res.data);
    });
  }, []);
  return (
    <div className="editUser">
      <UserForm
        addOrEdit="edit"
        postUserInfo={postUserInfo}
        setPostUserInfo={setPostUserInfo}
        finish={finish}></UserForm>
    </div>
  );
}

export default EditUser;
