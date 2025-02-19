<template>
  <div id="questionSubmitView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="questionId" label="题号" style="min-width: 240px">
        <a-input v-model="searchParams.questionId" placeholder="请输入" />
      </a-form-item>
      <a-form-item field="language" label="编程语言" style="min-width: 240px">
        <a-select
          v-model="searchParams.language"
          :style="{ width: '320px' }"
          placeholder="选择编程语言"
        >
          <a-option>java</a-option>
          <a-option>cpp</a-option>
          <a-option>go</a-option>
          <a-option>html</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #judgeInfo="{ record }">
        <a-tag
          color="blue"
          v-if="HANDLE_STATUS.HANDLING.includes(record.status)"
          loading
        >
          判题中
        </a-tag>
        <a-tag
          color="red"
          v-else-if="HANDLE_STATUS.HANDLE_FAIL == record.status"
        >
          判题失败，系统异常
        </a-tag>
        <a-tag
          color="green"
          v-else-if="record.judgeInfo.message === 'Accepted'"
        >
          {{ record.judgeInfo.message }}
        </a-tag>
        <a-tag color="red" v-else>
          {{ record.judgeInfo.message }}
        </a-tag>
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>

      <!--      <template #status="{ record }">-->
      <!--        <a-tag-->
      <!--          color="green"-->
      <!--          v-if="record.status === HANDLE_STATUS.HANDLE_SUCCESS"-->
      <!--        >-->
      <!--          判题完成-->
      <!--        </a-tag>-->
      <!--        <a-tag-->
      <!--          color="blue"-->
      <!--          v-if="HANDLE_STATUS.HANDLING.includes(record.status)"-->
      <!--          loading-->
      <!--        >-->
      <!--          判题中-->
      <!--        </a-tag>-->

      <!--        <a-tag color="red" v-if="record.status === HANDLE_STATUS.HANDLE_FAIL">-->
      <!--          判题失败-->
      <!--        </a-tag>-->
      <!--      </template>-->
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  OjQuestion,
  OjQuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";
import HANDLE_STATUS from "@/access/HandleStatusEnum";

const tableRef = ref();

const dataList = ref<QuestionSubmitQueryRequest[]>([]);
const total = ref(0);
const searchParams = ref<QuestionSubmitQueryRequest>({
  questionId: undefined,
  language: undefined,
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await OjQuestionControllerService.listOjQuestionSubmitByPage({
    ...searchParams.value,
    sortField: "create_time",
    sortOrder: "descend",
  });
  if (res.code === 20000) {
    // console.log(res.data.records[0].status === 1);
    dataList.value = res.data.records;
    total.value = res.data.total;
    // console.log(dataList.value);
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const columns = [
  // {
  //   title: "提交号",
  //   dataIndex: "id",
  // },
  {
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "判题信息",
    slotName: "judgeInfo",
  },
  // {
  //   title: "判题状态",
  //   slotName: "status",
  // },
  {
    title: "题目 id",
    dataIndex: "questionId",
  },
  {
    title: "提交者 id",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const router = useRouter();

/**
 * 跳转到做题页面
 * @param question
 */
const toQuestionPage = (question: OjQuestion) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};

/**
 * 确认搜索，重新加载数据
 */
const doSubmit = () => {
  // 这里需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped>
#questionSubmitView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
