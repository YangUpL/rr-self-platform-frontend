<template>
  <div class="parent-container">
    <a-card :style="{ width: '30%', position: 'relative' }">
      <a-button
        type="text"
        style="
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 1;
          color: black;
        "
      >
        个人信息
      </a-button>
      <!-- 编辑按钮 -->
      <a-button
        type="text"
        style="position: absolute; top: 10px; right: 10px; z-index: 1"
        @click="doEditor()"
      >
        <icon-edit />
        编辑
      </a-button>
      <template #cover>
        <div
          style="
            width: 100%;
            position: relative;
            height: 150px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 59px;
          "
        >
          <div
            style="
              width: 120px;
              height: 120px;
              border-radius: 50%;
              overflow: hidden;
            "
          >
            <img
              :src="userInfo.avatar"
              :alt="userInfo.avatarAlt"
              style="width: 100%; height: 100%; object-fit: cover"
            />
          </div>
        </div>
      </template>
      <a-card-meta
        :title="userInfo.username"
        :description="userInfo.description"
        :avatar-style="{ display: 'none' }"
      />
      <div class="info-bottom">
        <span class="level-tag">{{ userInfo.role }}</span>
        <span class="id-info">ID: {{ userInfo.id }}</span>
      </div>
      <template #actions>
        <a :href="userInfo.githubUrl" target="_blank"><icon-github /></a>
        <icon-user-group v-if="userInfo.gender === -1" />
        <icon-man v-if="userInfo.gender === 0" />
        <icon-woman v-if="userInfo.gender === 1" />
      </template>
      <!-- 原生编辑弹窗 -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <h2 class="modal-title">编辑信息</h2>
          <div
            class="closeIcon"
            @click="doCancle"
            style="
              cursor: pointer;
              width: 10px;
              position: absolute;
              left: 73%;
              top: 15%;
            "
          >
            X
          </div>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <a-space direction="vertical" :style="{ width: '100%' }">
                <a-upload
                  action="http://localhost:8080/user/upload"
                  :fileList="file ? [file] : []"
                  :show-file-list="false"
                  @success="doSuccess"
                  @change="onChange"
                  @progress="onProgress"
                >
                  <template #upload-button>
                    <div
                      :class="`arco-upload-list-item${
                        file && file.status === 'error'
                          ? ' arco-upload-list-item-error'
                          : ''
                      }`"
                    >
                      <div
                        class="arco-upload-list-picture custom-upload-avatar"
                        v-if="file && file.url"
                      >
                        <img :src="file.url" />
                        <div class="arco-upload-list-picture-mask">
                          <IconEdit />
                        </div>
                        <a-progress
                          v-if="
                            file.status === 'uploading' && file.percent < 100
                          "
                          :percent="file.percent"
                          type="circle"
                          size="mini"
                          :style="{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translateX(-50%) translateY(-50%)',
                          }"
                        />
                      </div>
                      <div class="arco-upload-picture-card" v-else>
                        <div class="arco-upload-picture-card-text">
                          <IconPlus />
                          <div style="margin-top: 10px; font-weight: 600">
                            Upload
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </a-upload>
              </a-space>
            </div>
            <div class="form-group">
              <label for="username">用户名</label>
              <input
                type="text"
                id="username"
                v-model="formData.username"
                :class="{ 'is-invalid': errors.username }"
              />
              <span v-if="errors.username" class="error-message">{{
                errors.username
              }}</span>
            </div>
            <div class="form-group">
              <label for="email">邮箱</label>
              <input
                type="text"
                id="email"
                v-model="formData.email"
                :class="{ 'is-invalid': errors.email }"
              />
              <span v-if="errors.email" class="error-message">{{
                errors.email
              }}</span>
            </div>
            <div class="form-group">
              <label for="description">个人简介</label>
              <a-textarea
                placeholder="Please enter something"
                :max-length="50"
                allow-clear
                show-word-limit
                id="description"
                v-model="formData.description"
                :class="{ 'is-invalid': errors.description }"
              />
              <span v-if="errors.description" class="error-message">{{
                errors.description
              }}</span>
            </div>
            <div class="form-group">
              <label for="githubUrl">githubUrl</label>
              <input
                id="githubUrl"
                v-model="formData.githubUrl"
                :class="{ 'is-invalid': errors.githubUrl }"
              />
              <span v-if="errors.githubUrl" class="error-message">{{
                errors.githubUrl
              }}</span>
            </div>
            <div class="form-group">
              <label for="gender">性别</label>
              <!-- 使用 v-model 绑定 formData.gender -->
              <a-select id="gender" v-model="formData.gender">
                <a-option value="0">男</a-option>
                <a-option value="1">女</a-option>
                <a-option value="-1">隐藏</a-option>
              </a-select>
              <span v-if="errors.gender" class="error-message">{{
                errors.gender
              }}</span>
            </div>
            <div class="form-actions">
              <button type="button" @click="doCancle()">取消</button>
              <button type="submit">确定</button>
            </div>
          </form>
        </div>
      </div>
    </a-card>
    <div class="right-div">
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
        style="height: 380px"
        :scroll="{ y: 380 }"
      >
        <template #difficulty="{ record }">
          <div :style="{ color: difficultyColorMap[record.difficulty] }">
            {{ difficultyMap[record.difficulty] }}
          </div>
        </template>
        <template #question="{ record }">
          <router-link
            :to="{ path: '/show/ojQuestion/answer', query: { id: record.id } }"
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
  </div>
  <div class="bottom-text">
    要加油喔！努力的同时记得开心 --> <a href="singIn">通往努力的见证</a>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { IconEdit, IconPlus } from "@arco-design/web-vue/es/icon";
import { UserControllerService } from "../../../generated";
import { Message } from "@arco-design/web-vue";
import { useRoute } from "vue-router";

// 定义默认头像
const defaultAvatar =
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp";

// 用户信息
const userInfo = ref({
  id: 0,
  username: "",
  description: "暂无个人简介",
  avatar: defaultAvatar,
  avatarAlt: "封面图片",
  role: "普通用户",
  githubUrl: "",
  gender: -1,
});

const showModal = ref(false);
const file = ref();
const store = useStore();
const formData = ref({
  id: 0,
  username: "",
  description: "",
  avatar: "",
  email: "",
  gender: "",
  githubUrl: "",
});

const onChange = (_: any, currentFile: any) => {
  file.value = {
    ...currentFile,
  };
};

const onProgress = async (currentFile: any) => {
  file.value.url = currentFile.url;
};

const doSuccess = (fileItem: any) => {
  userInfo.value.avatar = fileItem.response;
  file.value.url = fileItem.response;
  formData.value.avatar = fileItem.response;
};

// role的映射
const roleMap = {
  0: "普通用户",
  1: "管理员",
  2: "vip",
};

const fetchStore = async () => {
  const loginUser = store.state.user?.loginUser;
  userInfo.value.avatar = loginUser?.avatar || defaultAvatar;
  userInfo.value.username = loginUser?.username || "";
  userInfo.value.id = loginUser?.id || 0;
  userInfo.value.role = roleMap[loginUser?.role as 0 | 1 | 2] || "普通用户";
  userInfo.value.description = loginUser?.description || "暂无个人简介";
  userInfo.value.githubUrl = loginUser?.githubUrl || "";
  userInfo.value.gender = loginUser?.gender;

  file.value = {
    url: userInfo.value.avatar,
  };
};

onMounted(() => {
  fetchStore();
});

const doEditor = () => {
  showModal.value = true;
  const loginUser = store.state.user?.loginUser;
  formData.value.id = loginUser?.id || 0;
  formData.value.username = loginUser?.username || "";
  formData.value.description = loginUser?.description || "";
  formData.value.email = loginUser?.email || "";
  formData.value.avatar = loginUser?.avatar || "";
  formData.value.gender = String(loginUser?.gender || -1);
  formData.value.githubUrl = loginUser?.githubUrl || "";
};

const doCancle = () => {
  showModal.value = false;
  file.value.url = userInfo.value.avatar;
};

const errors = ref({
  username: "",
  description: "",
  avatar: "",
  email: "",
  gender: "",
  githubUrl: "",
});

const validateForm = () => {
  let isValid = true;
  errors.value = {
    username: "",
    description: "",
    avatar: "",
    email: "",
    gender: "",
    githubUrl: "",
  };
  if (!formData.value.username) {
    errors.value.username = "请输入用户名";
    isValid = false;
  }
  if (!formData.value.description) {
    errors.value.description = "请输入个人简介";
    isValid = false;
  }
  if (formData.value.description.length > 50) {
    errors.value.description = "个人简介过长";
    isValid = false;
  }
  if (!formData.value.email) {
    errors.value.email = "请输入邮箱";
    isValid = false;
  }
  if (!formData.value.githubUrl) {
    errors.value.githubUrl = "请输入github账号";
    isValid = false;
  }
  return isValid;
};

const handleSubmit = async () => {
  if (validateForm()) {
    // 这里可以添加保存数据的逻辑
    console.log("保存的数据:", formData.value);
    const res = await UserControllerService.updateUser(formData.value);
    if (res.code === 20000) {
      await store.dispatch("user/getLoginUser");
      await fetchStore();
      Message.success({
        id: "updateSuccess",
        content: "修改成功",
        duration: 2000,
      });
    } else {
      Message.error({
        id: "updateError",
        content: res.description as string,
        duration: 2000,
      });
    }
    showModal.value = false;
  }
};

const data = reactive([
  {
    id: "1",
    question: "John Brown",
    difficulty: 1,
    taglist: ["java", "基础"],
  },
  {
    id: "2",
    question: "John Brown",
    difficulty: 1,
    taglist: ["java", "基础"],
  },
  // 这里省略了重复的数据，实际使用时可按需添加
]);

// difficulty的映射关系
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

const paginationConfig = ref({
  total: data.length,
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  showTotal: (total: any) => `共 ${total} 条`,
  showJumper: true,
  showPageSize: true,
});

const change = async (page: number) => {
  paginationConfig.value.current = page;
};

const pageChange = async (pageSize: number) => {
  paginationConfig.value.pageSize = pageSize;
  paginationConfig.value.current = 1;
};

const columns = [
  {
    title: "收藏题目",
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

const handleChange = (data: any, extra: any, currentDataSource: any) => {
  console.log("change", data, extra, currentDataSource);
};
</script>

<style scoped>
.parent-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  /* background-color: red; */
}

a-card {
  flex: 1;
}

.right-div {
  margin-left: 50px;
  flex-shrink: 0;
  width: 60vw;
}

.info-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}

.level-tag {
  background-color: #ffc107;
  color: white;
  padding: 3px 8px;
  border-radius: 3px;
  font-size: 12px;
}

.id-info {
  color: #999;
  font-size: 12px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 30px; /* 适当增加内边距，让内容不那么紧凑 */
  border-radius: 8px; /* 加大边框圆角，让弹窗更圆润 */
  width: 600px; /* 加大弹窗宽度 */
  max-height: 70vh; /* 限制最大高度，缩小整体高度 */
  overflow-y: auto; /* 如果内容超出高度，显示滚动条 */
}

.modal-title {
  margin-top: 0;
  font-size: 20px; /* 加大标题字体大小 */
  font-weight: 600; /* 增加标题字体粗细 */
  margin-bottom: 20px; /* 增加标题与表单内容的间距 */
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px; /* 调整标签字体大小 */
  font-weight: 500; /* 增加标签字体粗细 */
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px; /* 增加输入框和文本域内边距 */
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s ease; /* 增加边框颜色过渡效果 */
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #007bff; /* 输入框和文本域聚焦时的边框颜色 */
  outline: none;
}

.is-invalid {
  border-color: red !important;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px; /* 增加操作按钮与表单内容的间距 */
}

.form-actions button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.form-actions button[type="button"] {
  background-color: #ccc;
}

.form-actions button[type="button"]:hover {
  background-color: #bbb;
}

.form-actions button[type="submit"] {
  background-color: #007bff;
  color: white;
}

.form-actions button[type="submit"]:hover {
  background-color: #0056b3;
}

.bottom-text {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  background-color: white;
  padding: 10px;
}

/* 新增弹窗内表单两列布局样式 */
.modal-content form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px; /* 增加两列之间的距离 */
}

/* 让上传头像部分横跨两列 */
.modal-content form .form-group:first-child {
  grid-column: 1 / span 2;
}

/* 让操作按钮部分横跨两列 */
.modal-content form .form-actions {
  grid-column: 1 / span 2;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}
</style>
