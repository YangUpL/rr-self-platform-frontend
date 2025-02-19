<template>
  <div class="center-container">
    <a-result status="error" title="No internet ">
      <template #icon>
        <IconFaceFrownFill />
      </template>
      <template #subtitle> DNS_PROBE_FINISHED_NO_INTERNET </template>

      <template #extra>
        <!-- 绑定点击事件 -->
        <a-button type="primary" @click="refreshPage">Refresh</a-button>
      </template>
      <a-typography style="background: var(--color-fill-2); padding: 24px">
        <a-typography-paragraph>Try:</a-typography-paragraph>
        <ul>
          <li>Checking the network cables, modem, and router</li>
          <li>Reconnecting to Wi-Fi</li>
        </ul>
      </a-typography>
    </a-result>
  </div>
</template>

<script>
import { IconFaceFrownFill } from "@arco-design/web-vue/es/icon";

export default {
  components: {
    IconFaceFrownFill,
  },
  methods: {
    // 定义刷新页面的方法
    refreshPage() {
      location.reload();
    },
  },
};
</script>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
