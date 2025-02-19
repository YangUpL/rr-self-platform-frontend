<template>
  <div>
    <!-- 使用父组件传递的 value 和 style  -->
    <mavon-editor v-model="value" @change="handleChange" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
interface EditorType {
  editorValue: string;
  handleChange: (v: string) => void;
}
// 这里定义props接收传入的userList
// eslint-disable-next-line no-undef
const props = withDefaults(defineProps<EditorType>(), {
  editorValue: "",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const value = ref(props.editorValue);

// 监听 props.viewerValue 的变化
watch(
  () => props.editorValue,
  (newValue) => {
    value.value = newValue;
  }
);
</script>
