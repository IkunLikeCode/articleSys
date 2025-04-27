import { adminState } from "./module/admin/type";
import { userState } from "./module/user/type";
import { PublicState } from "./module/public/type";
import { TypeStates } from "./module/type/type";
type adminReducer = { adminInfo: adminState };
type userReducer = { userInfo: userState };
type publicReducer = { publicInfo: PublicState };
type typeReducer = { typeInfo: TypeStates };
export type rootReducer = {
  admin: adminReducer["adminInfo"];
  user: userReducer["userInfo"];
  public: publicReducer["publicInfo"];
  type: typeReducer["typeInfo"];
};
