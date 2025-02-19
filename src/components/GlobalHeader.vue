<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <!-- 新增 logo-container 包裹 logo -->
            <div class="logo-container">
              <img class="logo" src="../assets/logo.png" />
            </div>
            <div class="title">RR 面试</div>
          </div>
        </a-menu-item>
        <!-- 遍历路由，区分有子菜单和无子菜单的情况 -->
        <template v-for="item in visibleRoutes" :key="item.path">
          <a-sub-menu
            v-if="item.children && item.children.length > 0"
            :key="item.path"
            :title="item.name"
          >
            <template #title>
              {{ item.name }}
            </template>
            <template v-for="child in item.children" :key="child.path">
              <a-menu-item @click="doMenuClick(child.path)">
                {{ child.name }}
              </a-menu-item>
            </template>
          </a-sub-menu>
          <a-menu-item v-else :key="item.path" @click="doMenuClick(item.path)">
            {{ item.name }}
          </a-menu-item>
        </template>
      </a-menu>
    </a-col>
    <IsLogin></IsLogin>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter, useRoute } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import IsLogin from "@/components/IsLogin.vue";

const router = useRouter();
const route = useRoute();
const store = useStore();

// 递归过滤路由的函数
const filterRoutes = (routesArray: any[]) => {
  return routesArray.filter((item) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as number)
    ) {
      return false;
    }
    if (item.children && item.children.length > 0) {
      item.children = filterRoutes(item.children);
      // 如果子路由都被过滤掉了，父路由也不显示
      if (item.children.length === 0) {
        return false;
      }
    }
    return true;
  });
};

// 展示在菜单的路由数组
const visibleRoutes = computed(() => {
  return filterRoutes(routes);
});

// 默认主页
const selectedKeys = ref([route.path]);

// 路由跳转后，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
  console.log([to.path]);
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo-container {
  width: 60px; /* 调整容器宽度 */
  height: 60px; /* 调整容器高度 */
  border-radius: 50%; /* 使容器为圆形 */
  overflow: hidden; /* 隐藏溢出部分 */
  transition: all 0.3s ease; /* 添加过渡动画 */
  display: flex; /* 使用 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  cursor: pointer; /* 鼠标悬停时显示手型图标 */
}

.logo-container:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* 鼠标悬停时加深阴影 */
  transform: scale(1.05); /* 鼠标悬停时放大容器 */
}

.logo {
  width: 80%; /* 调整图片宽度，使其在容器内有一定内边距 */
  height: auto; /* 保持图片比例 */
  object-fit: contain; /* 使图片完整显示在容器内 */
  filter: brightness(1.1); /* 提高图片亮度 */
}

.arco-dropdown-open .arco-icon-down {
  transform: rotate(180deg);
}
</style>
