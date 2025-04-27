import { useState } from "react";
import UserForm from "./components/userForm/userForm";
import type { postUserInfo } from "./type";
import { addUser } from "../../api/user";
import { useNavigate } from "react-router";
import { message } from "antd";
function AddUser() {
  const navigate = useNavigate();
  const [postUserInfo, setPostUserInfo] = useState<postUserInfo>({
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
      await addUser(postUserInfo);
      navigate("/user/userList");
      message.success("添加成功");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="addUser_container">
      <UserForm
        addOrEdit="add"
        finish={finish}
        setPostUserInfo={setPostUserInfo}
        postUserInfo={postUserInfo}></UserForm>
    </div>
  );
}

export default AddUser;
