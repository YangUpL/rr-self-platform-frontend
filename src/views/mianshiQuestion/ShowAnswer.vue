<template>
  <MdViewer :viewer-value="parentValue" class="mdViewer" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { QuestionControllerService } from "../../../generated";
import MdViewer from "@/components/MdViewer.vue";

const route = useRoute();
const router = useRouter();
const id = route.query.id;

// 使用 ref 来创建响应式数据
const parentValue = ref("");

onMounted(async () => {
  let validId = id;
  if (!validId) {
    // 如果 id 为空，使用默认 id 进行跳转
    validId = "1888458978204327937";
    router.push({
      path: route.path,
      query: {
        ...route.query,
        id: validId,
      },
    });
    return;
  }

  try {
    const res = await QuestionControllerService.getQuestionById(validId);
    if (res.code === 20000) {
      if (res.data.answer) {
        // 更新 parentValue 的值
        parentValue.value = res.data.answer;
      }
    }
  } catch (error) {
    console.error("请求出错:", error);
  }
});
</script>

<style>
.mdViewer {
  position: absolute;
  z-index: 0;
  left: 0;
  right: 0;
}
</style>
