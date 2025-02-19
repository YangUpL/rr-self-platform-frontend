<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :viewer-value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论" disabled> 评论区</a-tab-pane>
          <a-tab-pane key="answer" title="答案"> 暂时无法查看答案</a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item
            field="language"
            label="编程语言"
            style="min-width: 240px"
          >
            <a-select
              v-model="form.language"
              :style="{ width: '320px' }"
              placeholder="选择编程语言"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
              <a-option>html</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <CodeEditor
          :value="form.code as string"
          :language="form.language"
          :handle-change="changeCode"
        />
        <a-divider size="0" />
        <a-button
          :disabled="isDisabled"
          type="primary"
          style="min-width: 200px"
          @click="doSubmit"
        >
          提交代码
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect, withDefaults, defineProps } from "vue";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import {
  OjQuestionControllerService,
  QuestionSubmitAddRequest,
  OjQuestionVO,
} from "../../../generated";
import { useRoute, useRouter } from "vue-router";

const isDisabled = ref(false);

const router = useRouter();
const route = useRoute();

const question = ref<OjQuestionVO>();

const loadData = async () => {
  const res = await OjQuestionControllerService.getOjQuestionVoById(
    route.params.id as any
  );
  if (res.code === 20000) {
    question.value = res.data;
    template.value = res.data?.template;
    // 重新生成代码并更新 form 对象中的 code 属性
    form.value.code = generateJavaCode(template.value);
    console.log(form.value.code);
  } else {
    message.error("加载失败，" + res.message);
  }
};

const template = ref({
  returnName: "void",
  methodName: "testMethod",
  argsType: ["int", "int"],
});

// 处理 argsType 数组，生成参数列表字符串
function generateArgsString(argsType: any[]) {
  return argsType.map((type, index) => `${type} arg${index}`).join(", ");
}

// 生成完整的 Java 代码
function generateJavaCode(template: {
  argsType: any;
  returnName: any;
  methodName: any;
}) {
  const argsString = generateArgsString(template.argsType);
  const codeTemplate = `public class Main {
    public ${template.returnName} ${template.methodName}(${argsString}) {
        
    }
}`;
  return codeTemplate;
}

const form = ref({
  language: "java",
  code: generateJavaCode(template.value),
});

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!form.value?.code) {
    message.error("请输入代码");
    return;
  }
  if (!question.value?.id) {
    return;
  }

  isDisabled.value = true;

  const res = await OjQuestionControllerService.doOjQuestionSubmit({
    ...form.value,
    questionId: question.value.id,
  });

  message.loading("正在提交代码，请稍后...");

  setTimeout(() => {
    if (res.code === 20000) {
      message.success("提交成功");
      router.push("/show/do/oj/view");
      loadData();
    } else {
      message.error("提交失败," + res.message);
    }
  }, 3000);
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const changeCode = (value: string) => {
  form.value.code = value;
};
</script>

<style>
#viewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
