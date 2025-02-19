<template>
  <div id="addQuestionView">
    <h2>创建题目</h2>
    <a-form :model="form" label-align="left">
      <a-form-item label="用户名" field="username">
        <space style="width: 50%"
          ><a-input v-model="form.username" placeholder="请输入用户名"
        /></space>
      </a-form-item>
      <a-form-item label="邮箱" field="email">
        <space style="width: 50%"
          ><a-input v-model="form.email" placeholder="请输入邮箱"
        /></space>
      </a-form-item>
      <a-form-item label="描述" field="description">
        <space style="width: 50%"
          ><a-input v-model="form.description" placeholder="请输入描述"
        /></space>
      </a-form-item>
      <a-form-item label="github" field="githubUrl">
        <space style="width: 50%"
          ><a-input v-model="form.githubUrl" placeholder="请输入github链接"
        /></space>
      </a-form-item>
      <a-form-item label="性别" field="gender">
        <space style="width: 50%">
          <a-select v-model="form.gender">
            <a-option value="0">男</a-option>
            <a-option value="1">女</a-option>
            <a-option value="-1">未知</a-option>
          </a-select>
        </space>
      </a-form-item>
      <a-form-item label="权限" field="role">
        <space style="width: 50%">
          <a-select v-model="form.role">
            <a-option value="0">普通用户</a-option>
            <a-option value="1">管理员</a-option>
            <a-option value="2">VIP</a-option>
          </a-select>
        </space>
      </a-form-item>
      <a-form-item label="头像" field="avatar">
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
                    v-if="file.status === 'uploading' && file.percent < 100"
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
                    <div style="margin-top: 10px; font-weight: 600">Upload</div>
                  </div>
                </div>
              </div>
            </template>
          </a-upload>
        </a-space>
      </a-form-item>
      <div style="margin-top: 16px" />
      <a-form-item>
        <a-button type="primary" style="min-width: 200px" @click="doSubmit"
          >提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import {
  OjQuestionControllerService,
  QuestionControllerService,
  UserControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";
import { IconEdit, IconPlus } from "@arco-design/web-vue/es/icon";

const route = useRoute();
const router = useRouter();
// 如果页面地址包含 update，视为更新页面
const updatePage = route.path.includes("update");

let form = ref({
  id: 0,
  username: "",
  avatar:
    "https://img14.360buyimg.com/n1/s450x450_jfs/t1/216642/33/49478/76614/67432744F9042bf07/77530d9c811094d4.jpg",
  email: "",
  role: "0",
  description: "",
  gender: "-1",
  githubUrl: "",
});

const file = ref();

const onChange = (_: any, currentFile: any) => {
  file.value = {
    ...currentFile,
    //url: URL.createObjectURL(currentFile.file),
  };
  // console.log(currentFile);
};
const onProgress = async (currentFile: any) => {
  file.value.url = currentFile.url;
};

const doSuccess = (fileItem: any) => {
  console.log(fileItem);
  file.value.url = fileItem.response;
  form.value.avatar = fileItem.response;
};

/**
 * 根据题目 id 获取老的数据
 */
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await UserControllerService.getUserById(id as any);
  if (res.code === 20000) {
    message.success("加载成功");
    form.value = {
      id: res.data?.id,
      username: res.data?.username,
      avatar: res.data?.avatar,
      email: res.data?.email,
      role: String(res.data?.role),
      description: res.data?.description,
      gender: String(res.data?.gender),
      githubUrl: res.data?.githubUrl,
    };
    //将file.value赋值给当前avatar
    file.value = {
      url: form.value.avatar,
    };
  } else {
    message.error("加载失败，" + res.message);
  }
};

onMounted(() => {
  loadData();
});

const doSubmit = async () => {
  console.log(form.value);
  // 区分更新还是创建
  if (updatePage) {
    const res = await UserControllerService.updateUser(form.value);
    if (res.code === 20000) {
      message.success("更新成功");
      router.push("/admin/manage/user");
    } else {
      message.error("更新失败，" + res.message);
    }
  } else {
    const res = await UserControllerService.addUser(form.value);
    if (res.code === 20000) {
      message.success("创建成功");
      // 跳转到列表页面
      router.push("/admin/manage/user");
    } else {
      message.error("创建失败，" + res.message);
    }
  }
};
</script>

<style scoped></style>
