<template>
  <div id="manageQuestionView">
    <a-form-item label="题目分类" field="tid">
      <space style="width: 50%">
        <a-select
          v-model="searchParams.tid"
          @change="
            (value) => {
              searchParams.tid = value;
              loadData();
            }
          "
        >
          <!-- 使用 v-for 渲染选项 -->
          <a-option
            v-for="option in questionCategories"
            :key="option.id"
            :value="option.id"
          >
            {{ option.type }}
          </a-option>
        </a-select>
      </space>
    </a-form-item>
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      style="height: 540px"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.pageNum,
        total,
      }"
      size="large"
      @page-change="onPageChange"
    >
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)" size="mini">
            修改</a-button
          >
          <a-popconfirm
            content="确定删除此项？"
            @ok="doDelete(record)"
            position="tr"
          >
            <a-button status="danger" size="mini">删除</a-button>
          </a-popconfirm>
        </a-space>
      </template>

      <template #difficulty="{ record }">
        <div :style="{ color: difficultyColorMap[record.difficulty] }">
          {{ difficultyMap[record.difficulty] }}
        </div>
      </template>
      <template #question="{ record }">
        <router-link
          :to="{ path: '/show/Question/answer', query: { id: record.id } }"
        >
          {{ record.question }}
        </router-link>
      </template>

      <template #taglist="{ record }">
        <span v-for="tag in record.taglist" :key="tag" style="padding: 5px">
          <a-tag color="gray">{{ tag }}</a-tag>
        </span>
      </template>
      <template #updateTime="{ record }">
        {{ moment(record.updateTime).format("YYYY-MM-DD") }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  OjQuestionControllerService,
  PageOjQuestion,
  QuestionVo,
  QuestionControllerService,
  QuestionCategoryControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment/moment";

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
  pageNum: 1,
  tid: 1,
});
//difficulty的映射关系
const difficultyMap = {
  1: "简单",
  2: "困难",
  3: "中等",
};

// 难度等级与颜色的映射
const difficultyColorMap = {
  1: "rgb(0, 128, 0)", // 简单难度显示绿色
  3: "rgb(253, 152, 21)", // 中等难度显示蓝色
  2: "rgb(255, 0, 0)", // 困难难度显示红色
};

const loadData = async () => {
  const res = await QuestionControllerService.listQuestion(searchParams.value);
  if (res.code === 20000) {
    dataList.value = res.data.list;
    total.value = res.data.total;
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

// 存储题目分类数据的响应式变量
const questionCategories = ref<any[]>([]);

const fetchQuestionCategories = async () => {
  try {
    // 假设这里有一个服务方法用于获取题目分类数据
    const res = await QuestionCategoryControllerService.listQuestionCategory();
    if (res.code === 20000) {
      // 假设响应数据的格式为 { data: [{ value: '0', label: '算法' }, { value: '1', label: '数据结构' }] }
      questionCategories.value = res.data;
    } else {
      message.error("获取题目分类数据失败，" + res.message);
    }
  } catch (error) {
    message.error("请求出错，请稍后重试");
  }
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
  fetchQuestionCategories();
});

// {id: "1", title: "A+ D", content: "新的题目内容", tags: "["二叉树"]", answer: "新的答案", submitNum: 0,…}

const columns = [
  {
    title: "题目",
    dataIndex: "question",
    slotName: "question",
    cellClass: "ojQuestion-column",
  },
  {
    title: "难度",
    dataIndex: "difficulty",
    slotName: "difficulty",
    sortable: {
      sortDirections: ["ascend", "descend"],
    },
    filterable: {
      filters: [
        {
          text: "简单",
          value: 1,
        },
        {
          text: "中等",
          value: 3,
        },
        {
          text: "困难",
          value: 2,
        },
      ],
      filter: (value: string | any[], record: { difficulty: any }) =>
        value.includes(record.difficulty),
      multiple: true,
    },
    cellClass: "difficulty-column",
  },
  {
    title: "标签",
    dataIndex: "taglist",
    slotName: "taglist",
    cellClass: "taglist-column",
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    slotName: "updateTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageNum: page,
  };
};

const doDelete = async (question: QuestionVo) => {
  const res = await QuestionControllerService.deleteQuestionById(question.id);
  if (res.code === 20000) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败");
  }
};

const router = useRouter();

const doUpdate = (question: QuestionVo) => {
  router.push({
    path: "/admin/update/mainshiquestion",
    query: {
      id: question.id,
    },
  });
};
</script>

<style scoped>
#manageQuestionView {
}
</style>
