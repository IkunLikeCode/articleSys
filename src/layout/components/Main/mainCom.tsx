import "./main.less";
import { Outlet } from "react-router-dom";
function MainCom() {
  return (
    <div className="main_container">
      <Outlet></Outlet>
    </div>
  );
}
export default MainCom;
