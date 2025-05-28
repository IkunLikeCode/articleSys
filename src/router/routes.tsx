import type { IRouterItem } from "./type";
import { lazy } from "react";
import {
  CommentOutlined,
  ContainerOutlined,
  CopyOutlined,
  DesktopOutlined,
  DiffOutlined,
  FileAddOutlined,
  FileTextOutlined,
  HomeOutlined,
  HourglassOutlined,
  MessageOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import Layout from "../layout";
import NotFound from "../pages/notFound/notFound";
import { Navigate } from "react-router";
import Login from "../pages/login/login";
const routes: IRouterItem[] = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        component: () => <Navigate to="/home" />,
        meta: { title: "首页", isShow: false },
      },
      {
        path: "/home",
        name: "home",
        component: lazy(() => import("../pages/home/home")),
        meta: { title: "首页", isShow: true },
        icon: <HomeOutlined />,
      },
      {
        path: "/admin",
        meta: { title: "管理员", isShow: true, isSuperAdmin: 1 },
        name: "admin",
        icon: <DesktopOutlined />,
        component: lazy(() => import("../pages/admin/index")),
        children: [
          {
            path: "/admin/adminList",
            component: lazy(() => import("../pages/admin/adimn")),
            meta: { title: "管理员列表", isShow: true },
            name: "adminList",
            icon: <TeamOutlined />,
          },
          {
            path: "/admin/adminAdd",
            component: lazy(() => import("../pages/admin/addAdmin")),
            meta: { title: "添加管理员", isShow: true },
            name: "adminAdd",
            icon: <UsergroupAddOutlined />,
          },
          {
            path: "/admin",
            component: () => <Navigate to="/admin/adminList" />,
          },
        ],
      },
      {
        path: "/user",
        component: lazy(() => import("../pages/user/index")),
        meta: { title: "用户", isShow: true },
        name: "user",
        icon: <UserOutlined />,
        children: [
          {
            path: "/user/userList",
            component: lazy(() => import("../pages/user/user")),
            meta: { title: "用户列表", isShow: true },
            name: "userList",
            icon: <TeamOutlined />,
          },
          {
            path: "/user/userAdd",
            component: lazy(() => import("../pages/user/addUser")),
            meta: { title: "添加用户", isShow: true },
            name: "userAdd",
            icon: <UserAddOutlined />,
          },
          {
            path: "/user/editUser",
            component: lazy(() => import("../pages/user/editUser")),
            meta: { title: "编辑用户", isShow: false },
            name: "editUser",
          },
          {
            path: "/user",
            component: () => <Navigate to="/user/userList" />,
          },
        ],
      },
      {
        path: "/book",
        component: lazy(() => import("../pages/book/index")),
        meta: { title: "书籍", isShow: true },
        name: "book",
        icon: <WalletOutlined />,
        children: [
          {
            path: "/book/bookList",
            component: lazy(() => import("../pages/book/book")),
            meta: { title: "书籍列表", isShow: true },
            name: "bookList",
            icon: <CopyOutlined />,
          },
          {
            path: "/book/bookAdd",
            component: lazy(() => import("../pages/book/addBook")),
            meta: { title: "添加书籍", isShow: true },
            name: "bookAdd",
            icon: <DiffOutlined />,
          },
          {
            path: "/book/bookEdit",
            component: lazy(() => import("../pages/book/editBook")),
            meta: { title: "编辑书籍", isShow: false },
            name: "bookEdit",
          },
          {
            path: "/book",
            component: () => <Navigate to="/book/bookList" />,
          },
        ],
      },
      {
        path: "/interview",
        component: lazy(() => import("../pages/interview/index")),
        meta: { title: "面试", isShow: true },
        name: "interview",
        icon: <SolutionOutlined />,
        children: [
          {
            path: "/interview/interviewList",
            component: lazy(() => import("../pages/interview/interview")),
            meta: { title: "面试列表", isShow: true },
            name: "interviewList",
            icon: <FileTextOutlined />,
          },
          {
            path: "/interview/interviewAdd",
            component: lazy(() => import("../pages/interview/addInterview")),
            meta: { title: "添加面试", isShow: true },
            name: "interviewAdd",
            icon: <FileAddOutlined />,
          },
          {
            path: "/interview/interviewEdit",
            component: lazy(() => import("../pages/interview/editInterview")),
            meta: { title: "编辑面试", isShow: false },
            name: "interviewEdit",
          },
          {
            path: "/interview/interviewDetail/:interviewId",
            component: lazy(() => import("../pages/interview/interviewDetail")),
            meta: { title: "面试详情", isShow: false },
            name: "interviewDetail",
          },
          {
            path: "/interview",
            component: () => <Navigate to="/interview/interviewList" />,
          },
        ],
      },
      {
        path: "/issue",
        component: lazy(() => import("../pages/issue/issue")),
        meta: { title: "问答", isShow: true },
        name: "issue",
        icon: <ContainerOutlined />,
      },
      {
        path: "/comment",
        component: lazy(() => import("../pages/comment/comment")),
        meta: { title: "评论", isShow: true },
        name: "comment",
        icon: <CommentOutlined />,
      },
      {
        path: "/types",
        component: lazy(() => import("../pages/types/type")),
        meta: { title: "分类", isShow: true },
        name: "types",
        icon: <HourglassOutlined />,
      },
      {
        path: "/chat",
        component: lazy(() => import("../pages/article/article")),
        meta: { title: "文章", isShow: true },
        name: "chat",
        icon: <MessageOutlined />,
      },
      {
        path: "/articleDetail/:articleId",
        component: lazy(() => import("../pages/article/articleDetail")),
        meta: {
          title: "文章详情",
          isShow: false,
        },
        name: "articleDetail",
      },
      {
        path: "*",
        component: NotFound,
        meta: { title: "404", isShow: false },
      },
    ],
  },
  {
    path: "/login",
    component: Login,
    meta: { title: "登录", isShow: false },
  },
];
export default routes;
