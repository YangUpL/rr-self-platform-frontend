<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { UserControllerService } from "../../generated";
import { Message } from "@arco-design/web-vue";

const router = useRouter();
const route = useRoute();
const store = useStore();

// eslint-disable-next-line @typescript-eslint/no-empty-function
const doLogout = async () => {
  const res = await UserControllerService.logout();
  if (res.code === 20000) {
    Message.success({
      id: "logoutSuccess",
      content: "退出登陆成功",
      duration: 2000,
    });
    store.dispatch("user/getLoginUser");
    router.push("/");
  } else {
    Message.error({
      id: "logoutError",
      content: res.description as string,
      duration: 2000,
    });
  }
};
const doGOPersonCenter = () => {
  router.push("/show/personCenter");
};

const goToLogin = () => {
  // 将当前页面的路径作为 query 参数传递到登录页面
  router.push({
    path: "/user/login",
    query: {
      redirect: route.fullPath,
    },
  });
};
const handleSelect = (v: any) => {
  console.log(v);
};
</script>

<template>
  <a-col flex="100px">
    <a-dropdown
      @select="handleSelect"
      :popup-max-height="false"
      trigger="hover"
      v-if="store.state.user?.loginUser?.username"
    >
      <a-button type="text" status="primary" style="height: auto">
        <template #icon>
          <a-avatar>
            <img alt="avatar" :src="store.state.user?.loginUser?.avatar" />
          </a-avatar>
        </template>
        {{ store.state.user?.loginUser?.username }}
        <icon-down
      /></a-button>
      <template #content>
        <a-doption @click="doGOPersonCenter()">个人中心</a-doption>
        <a-doption @click="doLogout()">退出登录</a-doption>
      </template>
    </a-dropdown>
    <a-button type="text" status="primary" v-else @click="goToLogin()">
      去登陆
    </a-button>
  </a-col>
</template>

<style scoped></style>
