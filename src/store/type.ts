import { adminState } from "./module/admin/type";
import { userState } from "./module/user/type";
import { PublicState } from "./module/public/type";
type adminReducer={adminInfo:adminState}
type userReducer={userInfo:userState}
type publicReducer={publicInfo:PublicState}
export type rootReducer={
  admin:adminReducer['adminInfo']
  user:userReducer['userInfo']
  public:publicReducer['publicInfo']
}