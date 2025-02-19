<template>
  <div id="main">
    <mavon-editor
      v-model="value"
      :subfield="false"
      defaultOpen="preview"
      :toolbarsFlag="false"
      :editable="false"
    />
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
interface ViewerType {
  viewerValue: string;
}

const props = defineProps<ViewerType>();

const value = ref(props.viewerValue);

// 监听 props.viewerValue 的变化
watch(
  () => props.viewerValue,
  (newValue) => {
    value.value = newValue;
  }
);
</script>
