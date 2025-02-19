<template>
  <div id="searchPart">
    <a-form layout="inline" :model="listQuestionDto">
      <a-form-item field="searchQuestion" label="搜索题目" style="min-width: 240px">
        <a-input
          v-model="listQuestionDto.searchQuestion"
          placeholder="请输入题目名称"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="fetchData()">提交</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      class="showQuestionList question-table"
      :columns="columns"
      :data="data"
      @change="handleChange"
      @cell-click="(record) => console.log(record)"
      :pagination="paginationConfig"
      @page-change="change"
      @page-size-change="pageChange"
      size="large"
    >
      <template #difficulty="{ record }">
        <div :style="{ color: difficultyColorMap[record.difficulty] }">
          {{ difficultyMap[record.difficulty] }}
        </div>
      </template>
      <template #question="{ record }">
        <router-link
          :to="{
            path: '/show/Question/answer',
            query: { id: encrypt(record.id) },
          }"
        >
          {{ record.question }}
        </router-link>
      </template>

      <template #taglist="{ record }">
        <span v-for="tag in record.taglist" :key="tag" style="padding: 5px">
          <a-tag color="gray">{{ tag }}</a-tag>
        </span>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { h, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
// 使用 useRoute 函数获取当前路由信息
import {
  QuestionControllerService,
  QuestionQueryRequest,
} from "../../../generated";
import { JSEncrypt } from "jsencrypt";

const data = reactive([]);
const route = useRoute();

//加密函数
const encrypt = (message) => {
  let publicKey = localStorage.getItem("publicKey");
  if (!publicKey) {
    const res = QuestionControllerService.getPublicKey().then((res) => {
      localStorage.setItem("publicKey", res.data?.publicKey);
      publicKey = localStorage.getItem("publicKey");
    });
  }
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(message);
};

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

let listQuestionDto = ref({
  pageNum: 1,
  pageSize: 10,
  sorterName: "",
  sorterOrder: "",
  searchQuestion: "",
  tid: 1,
  difficulties: [],
});

const paginationConfig = ref({
  total: 0,
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  showTotal: (total) => `共 ${total} 条`,
  showJumper: true,
  showPageSize: true,
});

const change = async (page) => {
  paginationConfig.value.current = page;
  await fetchData(page);
};

const pageChange = async (pageSize) => {
  paginationConfig.value.pageSize = pageSize;
  paginationConfig.value.current = 1;
  listQuestionDto.value.pageSize = pageSize;
  await fetchData(paginationConfig.value.current);
};

const fetchData = async (page) => {
  try {
    listQuestionDto.value.tid = route.params.id;
    listQuestionDto.value.pageNum = page;
    const res = await QuestionControllerService.listQuestion(
      listQuestionDto.value
    );
    if (res.code === 20000) {
      data.length = 0;
      res.data.list.forEach((item) => {
        data.push(item);
      });
      paginationConfig.value.total = res.data.total;
      console.log("Data after fetch:", data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(async () => {
  await fetchData();
});

const columns = [
  {
    title: "题目",
    dataIndex: "question",
    // width: 650,
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
      filter: (value, record) => value.includes(record.difficulty),
      multiple: true,
    },
    width: 100,
    cellClass: "difficulty-column",
  },
  {
    title: "标签",
    dataIndex: "taglist",
    slotName: "taglist",
    cellClass: "taglist-column",
    width: 250,
  },
];

const handleChange = (data, extra, currentDataSource) => {
  // console.log("change", data);
  // console.log("change", extra);
  console.log("change", extra);
  if (extra.type === "sorter") {
    listQuestionDto.value = {
      pageNum: paginationConfig.value.current,
      pageSize: paginationConfig.value.pageSize,
      tid: route.params.id,
      sorterName: extra.sorter.field,
      sorterOrder: extra.sorter.direction,
    };
  } else if (extra.type === "filter") {
    listQuestionDto.value = {
      pageNum: paginationConfig.value.current,
      pageSize: paginationConfig.value.pageSize,
      tid: route.params.id,
      difficulties: extra.filters.difficulty,
    };
  }
  fetchData(paginationConfig.value.current);
};
// console.log("change", currentDataSource);
</script>
