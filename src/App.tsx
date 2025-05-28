import { useEffect, useState } from "react";
import Theme from "./util/theme";
import RouterView from "./router";
import getRestoringState from "./api/restoringstate";
import type { ReqeustState } from "../types/commonType";
import { ConfigProvider, message } from "antd";
import { useNavigate, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { setAdminInfo } from "./store/module/admin/admin";
import { AppDispatch } from "./store";
import { getAdminInfo } from "./api/admin";
import { AdminPersonalInfo } from "./store/module/admin/type";
function App() {
  const [primary, setPrimary] = useState("#1677ff");
  const [IsinlineCollapsed, setIsinlineCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  // 监听路由变化 进行恢复登录状态
  async function restoringstate() {
    const token = localStorage.getItem("coderStationToken");
    // 如果token存在 需要判断token是否过期
    if (token) {
      const res = await getRestoringState<ReqeustState>();
      if (res.code !== 0) {
        localStorage.removeItem("coderStationToken");
        message.warning("登录状态已过期");
        navigate({
          pathname: "/login",
        });
        return;
      }
      const result = await getAdminInfo<AdminPersonalInfo>(res.data._id);
      dispatch(setAdminInfo(result));
      if (location.pathname === "/login") {
        navigate({
          pathname: "/home",
        });
        return;
      }
    } else {
      if (location.pathname !== "/login") {
        navigate({
          pathname: "/login",
        });
      }
    }
  }
  useEffect(() => {
    restoringstate();
  }, [location.pathname]);

  // 监听窗口的变化
  useEffect(() => {
    function handleResize() {
      if (document.body.clientWidth > 1200) {
        setIsinlineCollapsed(false);
      } else {
        setIsinlineCollapsed(true);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Theme.Provider
      value={{
        IsinlineCollapsed: IsinlineCollapsed,
        setIsinlineCollapsed,
        setPrimary,
        primary,
      }}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: primary,
          },
        }}>
        <RouterView></RouterView>
      </ConfigProvider>
    </Theme.Provider>
  );
}

export default App;
