import { useState } from "react";
import AdminForm from "./components/adminForm";
import { addAdmin } from "../../api/admin";
import { useNavigate } from "react-router";
import { ReqeustStateSolid } from "../../../types/commonType";
import { message } from "antd";
interface AdminItem {
  avatar: string;
  enabled?: boolean;
  loginId: string;
  loginPwd: string;
  nickname: string;
  permission: number;
  _id?: string;
}
function AddAdmin() {
  const navigate = useNavigate();
  const [adminInfo, setAdminInfo] = useState<AdminItem>({
    avatar: "",
    loginId: "",
    loginPwd: "",
    nickname: "",
    permission: 2,
  });
  async function finish() {
    try {
      const result = await addAdmin<ReqeustStateSolid<Required<AdminItem>>>(
        adminInfo
      );
      if (result.code !== 0) {
        throw new Error(result.msg);
      }
      navigate("/admin/adminList");
      message.success("添加成功");
    } catch (err) {
      message.error("登录账号重复");
      console.log(err);
    }
  }
  return (
    <div className="addAdmin">
      <AdminForm
        adminInfo={adminInfo}
        setAdminInfo={setAdminInfo}
        finish={finish}
        addOrEdit="add"></AdminForm>
    </div>
  );
}
export default AddAdmin;
