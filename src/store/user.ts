// initial state
import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated";
import { reactive, ref } from "vue";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      username: "",
      role: ACCESS_ENUM.NOT_LOGIN,
      avatar:
        "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp",
      id: 0,
      email: "",
      description: "暂无个人简介",
      githubUrl: "",
      gender: -1,
    },
  }),
  actions: {
    async getLoginUser({ commit, state }, payload) {
      console.log("getLoginUser");
      // 从远程请求获取登录信息
      const res = await UserControllerService.getCurrentUser();
      if (res.code === 20000) {
        //更新本地
        commit("updateUser", {
          username: res.data?.username,
          role: res.data?.role,
          avatar: res.data?.avatar,
          id: res.data?.id,
          email: res.data?.email,
          description: res.data?.description,
          githubUrl: res.data?.githubUrl,
          gender: res.data?.gender,
        });
      } else {
        commit("updateUser", {
          username: "",
          role: ACCESS_ENUM.NOT_LOGIN,
          avatar:
            "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp",
          id: 0,
          email: "",
          description: "暂无个人简介",
          githubUrl: "",
          gender: -1,
        });
      }
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser.username = payload.username;
      state.loginUser.role = payload.role;
      state.loginUser.avatar = payload.avatar;
      state.loginUser.id = payload.id;
      state.loginUser.email = payload.email;
      state.loginUser.description = payload.description;
      state.loginUser.githubUrl = payload.githubUrl;
      state.loginUser.gender = payload.gender;
    },
  },
} as StoreOptions<any>;
