<template>
  <div id="basicLayout" v-bind:class="{ noScroll: showTranslationModal }">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <!-- 浮动提示元素 -->
      <div class="ai-float-tip" :class="{ expanded: isExpanded }">
        <div class="ai-tip-content" v-if="isExpanded">
          <span class="close-icon" @click="toggleExpansion">×</span>
          <p @click="showTranslationModal = true">
            deepseek(Temporary dialogue)
          </p>
        </div>
        <div class="ai-tip-toggle" v-else @click="toggleExpansion">
          <i class="icon"></i>
        </div>
      </div>
      <!-- 翻译弹窗 -->
      <div v-if="showTranslationModal" class="translation-container">
        <h1 class="title">deepseek</h1>
        <div class="input-section">
          <input v-model="message" type="text" placeholder="请输入问题" />
          <button @click="sendMessage">确定</button>
        </div>
        <div class="output" id="output">
          <!-- 显示用户发送的内容 -->
          <div class="user-message" v-if="userMessage">{{ userMessage }}</div>
          <!-- 只有当 thinkingContent 有内容时才显示思考区域 -->
          <div
            class="thinking-section"
            v-if="thinkingContent.length != 0 && thinkingContent.length != 2"
          >
            <h3 class="thinking-title">思考中</h3>
            <p>{{ thinkingContent }}</p>
          </div>
          <!-- 显示回复的内容 -->
          <div class="reply-message" v-if="translationResult">
            {{ translationResult }}
          </div>
          <div v-else>cheers!</div>
        </div>
        <div v-if="loading" class="loading-spinner">
          <div class="spinner"></div>
        </div>
        <div v-else-if="error" class="error-message">
          <p>{{ error }}</p>
        </div>
        <span class="chat-modal-close" @click="showTranslationModal = false"
          >×</span
        >
      </div>
    </a-layout>
  </div>
</template>

<style scoped>
/* 整体页面样式 */
#basicLayout {
  font-family: "Poppins", sans-serif;
  overflow-x: hidden;
}

#basicLayout .header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

#basicLayout .content {
  min-height: 80%;
  margin-top: 5px;
  margin-left: 10px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #ccc #f4f4f4;
}

/* 浮动提示元素样式 */
.ai-float-tip {
  position: fixed;
  bottom: 20px;
  right: 0;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: right 0.3s ease, width 0.3s ease;
  z-index: 1000;
}

.ai-float-tip.expanded {
  right: 20px;
  width: 260px;
}

.ai-tip-content {
  padding: 18px;
  position: relative;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 14px;
  font-size: 26px;
  cursor: pointer;
  color: #777;
}

.ai-tip-toggle {
  width: 26px;
  height: 76px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.icon {
  width: 26px;
  height: 3px;
  background-color: #444;
  position: relative;
}

.icon::before,
.icon::after {
  content: "";
  position: absolute;
  width: 26px;
  height: 3px;
  background-color: #444;
  left: 0;
}

.icon::before {
  top: -8px;
}

.icon::after {
  top: 8px;
}

/* 翻译弹窗样式 */
.translation-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fafafa; /* 更改背景颜色 */
  z-index: 1001;
  padding: 30px;
  width: 600px; /* 固定宽度 */
  height: 400px; /* 固定高度 */
  overflow-y: auto; /* 竖直方向滚动条 */
  scrollbar-width: thin;
  scrollbar-color: #ccc #f4f4f4;
  border-radius: 15px; /* 添加圆角 */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15); /* 增强阴影效果 */
}

.translation-container::-webkit-scrollbar {
  width: 8px;
}

.translation-container::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

.translation-container::-webkit-scrollbar-track {
  background-color: #f4f4f4;
}

.title {
  font-size: 32px;
  font-weight: 600;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.input-section {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  margin-left: 19px;
  width: 90%;
}

.input-section input {
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 10px;
  margin-right: 16px;
  font-size: 18px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s ease;
}

.input-section input:focus {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  outline: none;
}

.input-section button {
  padding: 16px 32px;
  background-color: #007bff; /* 更改按钮颜色 */
  color: #ffffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12);
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.input-section button:hover {
  background-color: #0056b3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.16);
}

.output {
  padding: 24px;
  background-color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  line-height: 1.6;
  color: #333333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
  width: 90%;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #ccc #f4f4f4;
}

.output::-webkit-scrollbar {
  width: 8px;
}

.output::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

.output::-webkit-scrollbar-track {
  background-color: #f4f4f4;
}

/* 区分用户发送和回复的内容样式 */
.user-message {
  background-color: #e6f2ff; /* 更改用户消息背景颜色 */
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
}

.reply-message {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
}

.thinking-section {
  height: auto;
  margin: 0;
  background-color: #e8f6ff;
  border: none;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.04);
}

.thinking-title {
  font-size: 22px;
  font-weight: 500;
  color: #007bff;
  margin-bottom: 8px;
}

.result-section {
  color: #333333;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.spinner {
  border: 7px solid rgba(0, 0, 0, 0.1);
  border-left-color: #007bff;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  margin-top: 30px;
  padding: 24px;
  background-color: #ffe6e6; /* 更改错误消息背景颜色 */
  border: none;
  border-radius: 10px;
  color: #d80000;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

.chat-modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 30px;
  cursor: pointer;
  color: #777;
}
</style>

<script setup>
import { ref } from "vue";
import GlobalHeader from "@/components/GlobalHeader";

// 定义响应式数据
const isExpanded = ref(false);
const showTranslationModal = ref(false);
const message = ref("");
const translationResult = ref("");
const thinkingContent = ref("");
const loading = ref(false);
const error = ref(null);
const isThinking = ref(false);
const userMessage = ref("");

// 定义方法
const toggleExpansion = () => {
  isExpanded.value = !isExpanded.value;
};

const sendMessage = async () => {
  userMessage.value = message.value;
  translationResult.value = "";
  thinkingContent.value = "";
  loading.value = true;
  error.value = null;
  isThinking.value = true;

  try {
    const response = await fetch(
      `http://localhost:8080/chat/basic?message=${encodeURIComponent(
        message.value
      )}`
    );
    if (!response.ok) {
      throw new Error(`请求失败，状态码: ${response.status}`);
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        loading.value = false;
        break;
      }
      let chunk = decoder.decode(value);
      if (isThinking.value) {
        const thinkEndIndex = chunk.indexOf("</think>");
        if (thinkEndIndex !== -1) {
          // 去除 <think> 标签
          chunk = chunk.replace("<think>", "");
          thinkingContent.value += chunk.slice(0, thinkEndIndex);
          translationResult.value += chunk.slice(
            thinkEndIndex + "</think>".length
          );
          isThinking.value = false;
        } else {
          // 去除 <think> 标签
          chunk = chunk.replace("<think>", "");
          thinkingContent.value += chunk;
        }
      } else {
        translationResult.value += chunk;
      }
    }
  } catch (err) {
    loading.value = false;
    error.value = `请求翻译结果时出错: ${err.message}`;
  }
};
</script>
