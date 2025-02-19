<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space class="header-content">
          <div class="logo-container">
            <img src="../assets/logo.png" class="logo" />
          </div>
          <div class="title">RR 面试</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://yupi.icu" target="_blank"> 面试平台 by yangrr </a>
      </a-layout-footer>
      <!-- 浮动提示元素 -->
      <div class="ai-float-tip" :class="{ expanded: isExpanded }">
        <div class="ai-tip-content" v-if="isExpanded">
          <span class="close-icon" @click="toggleExpansion">×</span>
          <p>这里有AI可以用</p>
        </div>
        <div class="ai-tip-toggle" v-else @click="toggleExpansion">
          <i class="icon"></i>
        </div>
      </div>
    </a-layout>
  </div>
</template>

<style scoped>
#userLayout {
  text-align: center;
  background: url("https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png")
    0% 0% / 100% 100%;
}

#userLayout a-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#userLayout a-layout-content {
  flex: 1;
}

.header {
  margin-top: 16px;
  background-color: rgba(255, 255, 255, 0.8); /* 半透明背景 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 底部阴影 */
  padding: 10px 20px; /* 内边距 */
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center; /* 水平居中 */
}

.logo-container {
  width: 60px;
  height: 60px;
  border-radius: 50%; /* 圆形边框 */
  overflow: hidden; /* 隐藏溢出部分 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* 阴影效果 */
  margin-right: 20px; /* 右侧间距 */
}

.logo {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 填充图片 */
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333; /* 文字颜色 */
}

.content {
  margin-bottom: 16px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9); /* 半透明背景 */
  border-radius: 8px; /* 圆角边框 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}

.ai-float-tip {
  position: fixed;
  bottom: 20px;
  right: 0;
  background-color: #f0f0f0;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: right 0.3s ease;
  z-index: 1000;
}

.ai-float-tip.expanded {
  right: 20px;
  width: 200px;
}

.ai-tip-content {
  padding: 10px;
  position: relative;
}

.close-icon {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}

.ai-tip-toggle {
  /* 缩小宽度 */
  width: 20px;
  /* 缩小高度 */
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(204, 204, 204, 0.8); /* 调整背景颜色透明度 */
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.icon {
  width: 20px;
  height: 2px;
  background-color: #333;
  position: relative;
}

.icon::before,
.icon::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 2px;
  background-color: #333;
  left: 0;
}

.icon::before {
  top: -6px;
}

.icon::after {
  top: 6px;
}
</style>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const isExpanded = ref(false);

    const toggleExpansion = () => {
      isExpanded.value = !isExpanded.value;
    };

    return {
      isExpanded,
      toggleExpansion,
    };
  },
});
</script>
