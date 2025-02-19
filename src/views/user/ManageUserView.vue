<template>
  <div id="manageQuestionView">
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
      <template #avatar="{ record }">
        <a-avatar>
          <img alt="avatar" :src="record.avatar" />
        </a-avatar>
      </template>
      <template #githubUrl="{ record }">
        <a :href="record.githubUrl" target="_blank">{{ record.githubUrl }}</a>
      </template>
      <template #updateTime="{ record }">
        {{ moment(record.updateTime).format("YYYY-MM-DD") }}
      </template>
      <template #gender="{ record }">
        {{ genderMap[record.gender] }}
      </template>
      <template #role="{ record }">
        {{ roleMap[record.role] }}
      </template>
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
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  QuestionControllerService,
  SafetyUser,
  UserControllerService,
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
});
//role的映射
const roleMap = {
  0: "普通用户",
  1: "管理员",
  2: "vip",
};

//gender映射
const genderMap = {
  "-1": "未知",
  "0": "男",
  "1": "女",
};

const loadData = async () => {
  const res = await UserControllerService.getUserList(searchParams.value);
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

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

// {id: "1", title: "A+ D", content: "新的题目内容", tags: "["二叉树"]", answer: "新的答案", submitNum: 0,…}

const columns = [
  {
    title: "用户名",
    dataIndex: "username",
  },
  {
    title: "头像",
    dataIndex: "avatar",
    slotName: "avatar",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    slotName: "email",
  },
  {
    title: "权限",
    dataIndex: "role",
    slotName: "role",
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    slotName: "updateTime",
  },
  {
    title: "性别",
    dataIndex: "gender",
    slotName: "gender",
  },
  {
    title: "github",
    dataIndex: "githubUrl",
    slotName: "githubUrl",
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

const doDelete = async (user: { id: number }) => {
  const res = await UserControllerService.deleteUser(user.id);
  if (res.code === 20000) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败");
  }
};

const router = useRouter();

const doUpdate = (user: SafetyUser) => {
  router.push({
    path: "/admin/update/user",
    query: {
      id: user.id,
    },
  });
};
</script>

<style scoped>
#manageQuestionView {
}
</style>
