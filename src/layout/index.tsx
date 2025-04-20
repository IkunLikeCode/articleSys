import HeaderCom from "./components/Header/headerCom";
import MainCom from "./components/Main/mainCom";
import MenuCom from "./components/Menu/menuCom";
import "./index.less";
function Layout() {
  return (
    <div className="layout_container">
      <MenuCom></MenuCom>
      <div className="left_container">
        <div className="nav">
          <HeaderCom></HeaderCom>
        </div>
        <div className="main">
          <MainCom></MainCom>
        </div>
      </div>
    </div>
  );
}
export default Layout;
