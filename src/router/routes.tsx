import type { IRouterItem } from "./type";
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
  SolutionOutlined,
  TeamOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import Layout from "../layout";
import Home from "../pages/home/home";
import Admin from "../pages/admin/adimn";
import NotFound from "../pages/notFound/notFound";
import User from "../pages/user/user";
import Interview from "../pages/interview/interview";
import Issue from "../pages/issue/issue";
import Types from "../pages/types/type";
import Book from "../pages/book/book";
import Comment from "../pages/comment/comment";
import { Navigate } from "react-router";
import AdminAdd from "../pages/admin/addAdmin";
import AdminOutlet from "../pages/admin";
import UserOut from "../pages/user";
import BookOut from "../pages/book";
import InterviewOut from "../pages/interview";
import AddInterview from "../pages/interview/addInterview";
import AddUser from "../pages/user/addUser";
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
        component: Home,
        meta: { title: "首页", isShow: true },
        icon: <HomeOutlined />,
      },
      {
        path: "/admin",
        meta: { title: "管理员", isShow: true },
        name: "admin",
        icon: <DesktopOutlined />,
        component: AdminOutlet,
        children: [
          {
            path: "/admin/adminList",
            component: Admin,
            meta: { title: "管理员列表", isShow: true },
            name: "adminList",
            icon: <TeamOutlined />,
          },
          {
            path: "/admin/adminAdd",
            component: AdminAdd,
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
        component: UserOut,
        meta: { title: "用户", isShow: true },
        name: "user",
        icon: <UserOutlined />,
        children: [
          {
            path: "/user/userList",
            component: User,
            meta: { title: "用户列表", isShow: true },
            name: "userList",
            icon: <TeamOutlined />,
          },
          {
            path: "/user/userAdd",
            component: AddUser,
            meta: { title: "添加用户", isShow: true },
            name: "userAdd",
            icon: <UserAddOutlined />,
          },
          {
            path: "/user",
            component: () => <Navigate to="/user/userList" />,
          },
        ],
      },
      {
        path: "/book",
        component: BookOut,
        meta: { title: "书籍", isShow: true },
        name: "book",
        icon: <WalletOutlined />,
        children: [
          {
            path: "/book/bookList",
            component: Book,
            meta: { title: "书籍列表", isShow: true },
            name: "bookList",
            icon: <CopyOutlined />,
          },
          {
            path: "/book/bookAdd",
            component: Book,
            meta: { title: "添加书籍", isShow: true },
            name: "bookAdd",
            icon: <DiffOutlined />,
          },
          {
            path: "/book",
            component: () => <Navigate to="/book/bookList" />,
          },
        ],
      },
      {
        path: "/interview",
        component: InterviewOut,
        meta: { title: "面试", isShow: true },
        name: "interview",
        icon: <SolutionOutlined />,
        children: [
          {
            path: "/interview/interviewList",
            component: Interview,
            meta: { title: "面试列表", isShow: true },
            name: "interviewList",
            icon: <FileTextOutlined />,
          },
          {
            path: "/interview/interviewAdd",
            component: AddInterview,
            meta: { title: "添加面试", isShow: true },
            name: "interviewAdd",
            icon: <FileAddOutlined />,
          },
          {
            path: "/interview",
            component: () => <Navigate to="/interview/interviewList" />,
          },
        ],
      },
      {
        path: "/issue",
        component: Issue,
        meta: { title: "问答", isShow: true },
        name: "issue",
        icon: <ContainerOutlined />,
      },
      {
        path: "/comment",
        component: Comment,
        meta: { title: "评论", isShow: true },
        name: "comment",
        icon: <CommentOutlined />,
      },
      {
        path: "/types",
        component: Types,
        meta: { title: "分类", isShow: true },
        name: "types",
        icon: <HourglassOutlined />,
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
