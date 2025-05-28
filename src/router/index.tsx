import routes from "./routes";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import type { IRouterItem } from "./type";
import { useEffect } from "react";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
const MyShowRouter = (props: { route: IRouterItem }) => {
  useEffect(() => {
    nProgress.start();
    setTimeout(() => {
      nProgress.done();
    }, 0);
  }, [props.route.path]);
  const Component = props.route.component;
  return <Component />;
};

function Router(routers: IRouterItem[]) {
  return routers.map((item: IRouterItem) => {
    return (
      <Route
        key={item.path}
        path={item.path}
        element={<MyShowRouter route={item}></MyShowRouter>}>
        {item.children ? Router(item.children) : null}
      </Route>
    );
  });
}

function RouterView() {
  return (
    <Suspense fallback={<div></div>}>
      <Routes>{Router(routes)}</Routes>
    </Suspense>
  );
}
export default RouterView;
