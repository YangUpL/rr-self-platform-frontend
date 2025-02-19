import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/mianshiQuestion/QuestionView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import AddQuestionView from "@/views/ojQuestion/AddQuestionView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: () => import("@/layouts/UserLayout.vue"),
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: () => import("@/views/user/UserLoginView.vue"),
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: () => import("@/views/user/UserRegisterView.vue"),
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },

  {
    path: "/",
    name: "面试题",
    component: () => import("@/views/mianshiQuestion/QuestionCatagory.vue"),
  },

  {
    path: "/oj",
    name: "Oj题",
    component: import("@/views/ojQuestion/QuestionsView.vue"),
  },

  // /show/ojQuestion/answer
  // /show/show/ojQuestion/list/:id
  {
    path: "/show",
    name: "详情页",
    component: () => import("@/layouts/ShowLayout.vue"),
    children: [
      {
        path: "/show/Question/answer",
        name: "展示答案",
        component: () => import("@/views/mianshiQuestion/ShowAnswer.vue"),
        meta: {
          hideInMenu: true,
        },
      },
      {
        path: "/show/Question/list/:id",
        name: "QuestionList",
        component: () => import("@/views/mianshiQuestion/QuestionView.vue"),
        meta: {
          hideInMenu: true,
        },
      },
      {
        path: "/show/personCenter",
        name: "个人中心",
        component: () => import("@/views/user/UserPersonCenter.vue"),
        meta: {
          access: ACCESS_ENUM.USER,
          hideInMenu: true,
        },
      },
      {
        path: "/show/do/oj/:id",
        name: "doOj",
        component: import("@/views/ojQuestion/ViewQuestionView.vue"),
        meta: {
          access: ACCESS_ENUM.USER,
          hideInMenu: true,
        },
      },
      {
        path: "/show/do/oj/view",
        name: "OJ做题详情",
        component: import("@/views/ojQuestion/QuestionSubmitView.vue"),
        meta: {
          access: ACCESS_ENUM.USER,
        },
      },
      {
        path: "/show/error",
        name: "出错啦~",
        component: () => import("@/views/ErrorPage.vue"),
        meta: {
          hideInMenu: true,
        },
      },
    ],
  },
  // {
  //   path: "/hide",
  //   name: "隐藏页面",
  //   component: HomeView,
  //   meta: {
  //     hideInMenu: true,
  //   },
  // },
  {
    path: "/noAuth",
    name: "无权限",
    component: () => import("@/views/NoAuthView.vue"),
    meta: {
      hideInMenu: true,
    },
  },
  // {
  //   path: "/about",
  //   name: "关于",
  //   component: () => import("@/views/AboutView.vue"),
  //   meta: {
  //     hideInMenu: true,
  //   },
  // },
  {
    path: "/admin",
    name: "管理员可见",
    children: [
      {
        path: "/admin/add/ojquestion",
        name: "创建oj题目",
        component: () => import("@/views/ojQuestion/AddQuestionView.vue"),
        meta: {
          access: ACCESS_ENUM.ADMIN,
        },
      },
      {
        path: "/admin/manage/ojquestion",
        name: "管理oj题目",
        component: () => import("@/views/ojQuestion/ManageQuestionView.vue"),
        meta: {
          access: ACCESS_ENUM.ADMIN,
        },
      },
      {
        path: "/admin/update/ojquestion",
        name: "更新题目",
        component: import("@/views/ojQuestion/AddQuestionView.vue"),
        meta: {
          access: ACCESS_ENUM.ADMIN,
          hideInMenu: true,
        },
      },
      {
        path: "/admin/add/mainshiquestion",
        name: "创建面试题目",
        component: () => import("@/views/mianshiQuestion/AddQuestionView.vue"),
        meta: {
          access: ACCESS_ENUM.ADMIN,
        },
      },

      {
        path: "/admin/manage/mainshiquestion",
        name: "管理面试题目",
        component: () =>
          import("@/views/mianshiQuestion/ManageQuestionView.vue"),
        meta: {
          access: ACCESS_ENUM.ADMIN,
        },
      },
      {
        path: "/admin/update/mainshiquestion",
        name: "更新面试题目",
        component: () => import("@/views/mianshiQuestion/AddQuestionView.vue"),
        meta: {
          access: ACCESS_ENUM.ADMIN,
          hideInMenu: true,
        },
      },
      {
        path: "/admin/add/user",
        name: "创建用户",
        component: () => import("@/views/user/AddUserView.vue"),
        meta: {
          access: ACCESS_ENUM.ADMIN,
        },
      },

      {
        path: "/admin/manage/user",
        name: "管理用户",
        component: () => import("@/views/user/ManageUserView.vue"),
        meta: {
          access: ACCESS_ENUM.ADMIN,
        },
      },
      {
        path: "/admin/update/user",
        name: "更新用户",
        component: () => import("@/views/user/AddUserView.vue"),
        meta: {
          access: ACCESS_ENUM.ADMIN,
          hideInMenu: true,
        },
      },
    ],
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
];
