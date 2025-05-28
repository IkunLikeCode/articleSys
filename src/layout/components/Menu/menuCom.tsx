/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, MenuProps } from "antd";
import "./menu.less";
import { useContext, useEffect } from "react";
import Theme from "../../../util/theme";
import routes from "../../../router/routes";
import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router";

function MenuCom() {
  // const dispatch = useDispatch<AppDispatch>();
  // 获取当前路由
  const location = useLocation();
  // 获取路由
  const navigate = useNavigate();
  const { IsinlineCollapsed } = useContext(Theme);
  type MenuItem = Required<MenuProps>["items"][number] & {
    children?: MenuItem[];
  };
  const onClickHandle: MenuProps["onClick"] = (e) => {
    // 获取当前点击的菜单项的key和label
    if (e.key) {
      navigate(e.key);
    }
  };

  // 生成菜单列表，过滤掉isShow为false的菜单项
  // 使用useMemo来缓存计算结果，避免不必要的重新计算
  const menulist = useMemo(() => {
    const menuList: MenuItem[] = [];
    routes[0].children!.map((item) => {
      if (item.meta?.isShow) {
        const menuItem: MenuItem = {
          key: item.path,
          label: item.meta.title,
          icon: item.icon,
        };
        if (item.children && item.children.length > 0) {
          menuItem.children = item.children
            .filter((child) => child.meta?.isShow)
            .map((child) => ({
              key: child.path,
              label: child.meta?.title,
              icon: child.icon,
            }));
        }
        menuList.push(menuItem);
      }
    });
    return menuList;
  }, []);

  // 监听路由变化，更新选中的菜单项
  useEffect(() => {}, [location.pathname]);

  return (
    <div className={` menu_container ${IsinlineCollapsed ? "collapsed" : ""}`}>
      <Menu
        forceSubMenuRender
        inlineCollapsed={IsinlineCollapsed}
        onClick={(e) => {
          onClickHandle(e);
        }}
        mode="inline"
        items={menulist}
        defaultOpenKeys={[/^\/[^/]+/.exec(location.pathname)?.[0] || ""]}
        defaultSelectedKeys={[location.pathname]}
        selectedKeys={[location.pathname]}
      />
    </div>
  );
}
export default MenuCom;
