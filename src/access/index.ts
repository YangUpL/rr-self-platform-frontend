import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
import { isLoading } from "@/plugins/loading";
import { Message } from "@arco-design/web-vue";

// 定义一个标志位，用于判断是否是错误重定向
let isErrorRedirect = false;

router.beforeEach(async (to, from, next) => {
  // 如果是错误重定向，直接放行
  if (isErrorRedirect) {
    isErrorRedirect = false;
    next();
    return;
  }

  isLoading.value = true;
  try {
    let loginUser = store.state.user.loginUser;
    console.log(loginUser);
    // 如果之前没登陆过，自动登录
    if (!loginUser || loginUser.role === ACCESS_ENUM.NOT_LOGIN) {
      // 加 await 是为了等用户登录成功之后，再执行后续的代码
      await store.dispatch("user/getLoginUser");
      loginUser = store.state.user.loginUser;
    }

    const needAccess = (to.meta?.access as number) ?? ACCESS_ENUM.NOT_LOGIN;
    console.log(needAccess);
    // 要跳转的页面必须要登陆
    if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
      // 如果没登陆，跳转到登录页面
      if (!loginUser || loginUser.role === ACCESS_ENUM.NOT_LOGIN) {
        Message.error({
          id: "PleaseLogin",
          content: "请先登录",
          duration: 2000,
        });
        next(`/user/login?redirect=${to.fullPath}`);
        return;
      }
      // 如果已经登陆了，但是权限不足，那么跳转到无权限页面
      if (!checkAccess(loginUser, needAccess)) {
        Message.error({
          id: "authError",
          content: "无权限",
          duration: 2000,
        });
        next("/noAuth");
        return;
      }
    }
    next();
  } catch (error) {
    isLoading.value = false;
    Message.error({
      id: "requestError",
      content: "请求出错，请稍后重试",
      duration: 2000,
    });
    // 设置标志位为 true，表示是错误重定向
    isErrorRedirect = true;
    // 重定向到本地的错误页面，这里假设本地错误页面路由为 /error-page
    next("/show/error");
  }
});
