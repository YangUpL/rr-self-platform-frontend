<template>
  <div id="showLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <!-- 使用 a-space 包裹左侧内容 -->
        <a-space>
          <div class="logo-wrapper">
            <img src="../assets/logo.png" class="logo" />
          </div>
          <div>RR 面试</div>
        </a-space>
        <!-- IsLogin 组件 -->
        <IsLogin></IsLogin>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
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
      <!--      <a-layout-footer class="footer">-->
      <!--        <a href="https://yupi.icu" target="_blank"> 面试平台 by yangrr </a>-->
      <!--      </a-layout-footer>-->
    </a-layout>
  </div>
</template>

<style scoped>
#showLayout {
  background: url("https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png")
    0% 0% / 100% 100%;
}

#showLayout .logo-wrapper {
  width: 55px; /* 增大容器尺寸 */
  height: 55px;
  border-radius: 50%; /* 圆形容器 */
  overflow: hidden; /* 隐藏溢出部分 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* 添加阴影 */
  transition: all 0.3s ease; /* 过渡效果 */
}

#showLayout .logo-wrapper:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* 鼠标悬停时加深阴影 */
  transform: scale(1.05); /* 鼠标悬停时放大 */
}

#showLayout .logo {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 填充图片 */
  filter: brightness(1.1); /* 提高图片亮度 */
}

#showLayout .header {
  margin-top: 16px;
  display: flex; /* 设置为 flex 容器 */
  justify-content: space-between; /* 子元素两端对齐 */
  align-items: center; /* 子元素垂直居中 */
}

#showLayout .content {
  margin-bottom: 16px;
  padding: 20px;
}

#showLayout .footer {
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
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
import { defineComponent } from "vue";
import IsLogin from "@/components/IsLogin.vue";

export default defineComponent({
  components: { IsLogin },
  data() {
    return {
      isExpanded: false,
    };
  },
  methods: {
    toggleExpansion() {
      this.isExpanded = !this.isExpanded;
    },
  },
});
</script>
