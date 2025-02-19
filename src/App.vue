<template>
  <div id="app">
    <!-- 显示加载提示 -->
    <div v-if="isLoading" class="loading">
      <a-space size="large">
        <a-spin :size="32" />
        加载中...
      </a-space>
    </div>
    <!-- 动态渲染组件 -->
    <component :is="renderComponent" v-else />
  </div>
</template>

<style>
#app {
}

.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  z-index: 9999;
}
</style>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import BasicLayout from "@/layouts/BasicLayout.vue";
import { isLoading } from "@/plugins/loading";

// 获取当前路由对象
const route = useRoute();

// 定义路径前缀与组件的映射关系
const routeMap = {
  "/user": "router-view",
  "/show": "router-view",
};

// 计算属性，根据当前路由路径确定要渲染的组件
const renderComponent = computed(() => {
  for (const prefix in routeMap) {
    if (route.path.startsWith(prefix)) {
      return routeMap[prefix];
    }
  }
  return BasicLayout;
});

/**
 * 全局初始化函数，有全局单次调用的代码，都可以写到这里
 */
const doInit = () => {
  console.log("hello 欢迎来到我的项目");
};

onMounted(() => {
  doInit();
});
</script>
