import "./header.less";
import { Avatar, ColorPicker, Dropdown, MenuProps } from "antd";
import Theme from "../../../util/theme";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { rootReducer } from "../../../store/type";
import {
  CloseCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router";
interface menuItem {
  pathName: string;
  pathTitle: string;
}
function HeaderCom() {
  const navigator = useNavigate();
  const location = useLocation();
  // 获取仓库
  const {
    adminInfo: { data },
  } = useSelector((state: rootReducer) => state.admin);
  const { IsinlineCollapsed, setIsinlineCollapsed, setPrimary, primary } =
    useContext(Theme);

  // 菜单
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div onClick={outLogin}>退出登录</div>,
    },
  ];
  // 头部菜单
  let pathArr = JSON.parse(sessionStorage.getItem("pathArr") || "[]");
  // 退出登录
  function outLogin() {
    localStorage.removeItem("coderStationToken");
    localStorage.removeItem("pathArr");
    window.location.reload();
  }
  // 切换菜单
  function changeHandler() {
    setIsinlineCollapsed(!IsinlineCollapsed);
  }

  // 去掉pathArr中重复的项
  function removeDuplicates(arr: menuItem[] = pathArr) {
    return arr.filter((item: menuItem, index: number) => {
      const firstIndex = arr.findIndex(
        (i: menuItem) => i.pathName === item.pathName
      );
      return firstIndex === index;
    });
  }

  // 头部菜单点击
  function headItemClick(pathName: string) {
    if (location.pathname === pathName) {
      return;
    }
    navigator(pathName);
  }
  // 关闭头部菜单
  function closePathTitle(index: number) {
    const newPathArr = pathArr.filter((i: number) => {
      return i !== index;
    });
    sessionStorage.setItem(
      "pathArr",
      JSON.stringify(removeDuplicates(newPathArr))
    );
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    pathArr = JSON.parse(sessionStorage.getItem("pathArr") || "[]");
  }, [pathArr.length]);
  return (
    <div className="header_container">
      <div className="left">
        <div className="icon" onClick={changeHandler}>
          {IsinlineCollapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </div>
        <div className="header">
          {removeDuplicates().map(
            (item: { pathName: string; pathTitle: string }, index: number) => {
              return (
                <div
                  key={index}
                  className={`header_item ${
                    location.pathname === item.pathName ? "active" : ""
                  }`}
                  onClick={() => headItemClick(item.pathName)}>
                  <div style={{ display: "flex", alignContent: "center" }}>
                    <div className="text">{item.pathTitle}</div>
                    <div
                      style={{ marginLeft: 10 }}
                      onClick={() => {
                        closePathTitle(index);
                      }}>
                      <CloseCircleOutlined />
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
      <div className="avatar">
        <ColorPicker
          value={primary}
          onChange={(color) => {
            setPrimary(color.toHexString());
          }}
          style={{
            marginRight: 20,
          }}></ColorPicker>
        <Dropdown menu={{ items }} placement="bottom">
          <Avatar src={data.avatar}></Avatar>
        </Dropdown>
      </div>
    </div>
  );
}
export default HeaderCom;
