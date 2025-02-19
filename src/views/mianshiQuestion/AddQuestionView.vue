<template>
  <div id="addQuestionView">
    <h2>创建题目</h2>
    <a-form :model="form" label-align="left">
      <a-form-item field="question" label="题目内容">
        <MdEditor
          :editor-value="form.question"
          :handle-change="onContentChange"
          style="z-index: 0"
        />
      </a-form-item>
      <a-form-item field="answer" label="答案">
        <MdEditor
          :editor-value="form.answer"
          :handle-change="onAnswerChange"
          style="z-index: 0"
        />
      </a-form-item>
      <a-form-item label="标签" field="taglist">
        <space style="width: 50%"
          ><a-input-tag
            v-model="form.taglist"
            placeholder="请输入题目标签"
          ></a-input-tag
        ></space>
      </a-form-item>
      <a-form-item
        label="题目信息配置"
        :content-flex="false"
        :merge-props="false"
      >
        <a-form-item label="题目分类" field="tid">
          <space style="width: 50%">
            <a-select v-model="form.tid">
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
          <a-button type="primary" @click="showCategoryModal = true"
            >管理题目分类</a-button
          >
        </a-form-item>
        <a-form-item label="题目难度" field="difficulty">
          <space style="width: 50%">
            <a-select v-model="form.difficulty">
              <a-option value="1">简单</a-option>
              <a-option value="3">中等</a-option>
              <a-option value="2">困难</a-option>
            </a-select>
          </space>
        </a-form-item>
        <a-form-item label="是否需要vip" field="needVip">
          <space style="width: 50%">
            <a-select v-model="form.needVip">
              <a-option value="0">不需要</a-option>
              <a-option value="1">需要</a-option>
            </a-select>
          </space>
        </a-form-item>
      </a-form-item>
      <div style="margin-top: 16px" />
      <a-form-item>
        <a-button type="primary" style="min-width: 200px" @click="doSubmit"
          >提交</a-button
        >
      </a-form-item>
    </a-form>
    <a-modal
      v-model:visible="showCategoryModal"
      title="题目分类管理"
      @ok="showCategoryModal = false"
      @cancel="showCategoryModal = false"
      fullscreen
    >
      <a-button type="primary" size="mini" @click="addCategory()"
        >增加</a-button
      >
      <a-table :columns="catagory" :data="data">
        <template #typeImg="{ record }">
          <a-avatar>
            <img alt="avatar" :src="record.typeImg" />
          </a-avatar>
        </template>
        <template #description="{ record }">
          {{
            record.description.length > 20
              ? record.description.slice(0, 20) + "..."
              : record.description
          }}
        </template>
        <template #optional="{ record }">
          <a-space>
            <a-button
              type="primary"
              size="mini"
              @click="updateCategory(record.id)"
            >
              修改</a-button
            >
            <a-popconfirm
              content="确定删除此项？"
              @ok="doDeleteCatagory(record.id)"
            >
              <a-button status="danger" size="mini">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table>
    </a-modal>
    <a-modal
      v-model:visible="categoryAddUpdateModal"
      @ok="handAddAndUpdate()"
      @cancel="handCancleAddAndUpdate()"
    >
      <a-form>
        <a-form-item label="分类图标" field="typeImg">
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
                      <div style="margin-top: 10px; font-weight: 600">
                        Upload
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </a-upload>
          </a-space>
        </a-form-item>
        <a-form-item label="分类名称" field="type">
          <a-input v-model="categoryForm.type" placeholder="请输入分类名称" />
        </a-form-item>
        <a-form-item label="分类描述" field="description">
          <a-textarea
            v-model="categoryForm.description"
            placeholder="请输入分类描述"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import {
  OjQuestionControllerService,
  QuestionCategoryControllerService,
  QuestionControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";
import { Modal } from "@arco-design/web-vue";
import { IconEdit, IconPlus } from "@arco-design/web-vue/es/icon";

const route = useRoute();
const router = useRouter();
// 如果页面地址包含 update，视为更新页面
const updatePage = route.path.includes("update");

let form = ref({
  id: 0,
  question: "",
  answer: "",
  tid: 1,
  difficulty: "1",
  needVip: "0",
  taglist: [],
});

const categoryForm = ref({
  id: null,
  type: "",
  description: "",
  typeImg: "",
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
  categoryForm.value.typeImg = fileItem.response;
};

// 弹窗显示状态
const showCategoryModal = ref(false);
const categoryAddUpdateModal = ref(false);

/**
 * 根据题目 id 获取老的数据
 */
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionControllerService.getQuestionById(id as any);
  if (res.code === 20000) {
    message.success("加载成功");
    form.value = {
      id: res.data?.id,
      question: res.data?.question,
      answer: res.data?.answer,
      tid: res.data?.tid,
      difficulty: String(res.data?.difficulty),
      needVip: String(res.data?.needVip),
      taglist: res.data?.taglist,
    };
  } else {
    message.error("加载失败，" + res.message);
  }
};

// 存储题目分类数据的响应式变量
const questionCategories = ref<any[]>([]);

/**
 * 获取题目分类数据
 */
const fetchQuestionCategories = async () => {
  try {
    // 假设这里有一个服务方法用于获取题目分类数据
    const res = await QuestionCategoryControllerService.listQuestionCategory();
    if (res.code === 20000) {
      // 假设响应数据的格式为 { data: [{ value: '0', label: '算法' }, { value: '1', label: '数据结构' }] }
      questionCategories.value = res.data;
      data.value = res.data;
    } else {
      message.error("获取题目分类数据失败，" + res.message);
    }
  } catch (error) {
    message.error("请求出错，请稍后重试");
  }
};

const catagory = [
  {
    title: "分类名称",
    dataIndex: "type",
  },
  {
    title: "分类图片",
    dataIndex: "typeImg",
    slotName: "typeImg",
  },
  {
    title: "分类描述",
    dataIndex: "description",
    slotName: "description",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
const data = ref([]);

const addCategory = () => {
  categoryAddUpdateModal.value = true;
};
const loadCategoryData = async (id: number) => {
  const res = await QuestionCategoryControllerService.getQuestionCategoryById(
    id
  );
  if (res.code === 20000) {
    categoryForm.value = res.data;
    file.value = {
      url: categoryForm.value.typeImg,
    };
  }
};
const updateCategory = (id: number) => {
  categoryAddUpdateModal.value = true;
  loadCategoryData(id);
};

onMounted(() => {
  loadData();
  fetchQuestionCategories();
});

const doSubmit = async () => {
  console.log(form.value);
  // 区分更新还是创建
  if (updatePage) {
    const res = await QuestionControllerService.updateQuestion(form.value);
    if (res.code === 20000) {
      message.success("更新成功");
      router.push("/admin/manage/mainshiquestion");
    } else {
      message.error("更新失败，" + res.message);
    }
  } else {
    const res = await QuestionControllerService.addQuestion(form.value);
    if (res.code === 20000) {
      message.success("创建成功");
      // 跳转到列表页面
      router.push("/admin/manage/mainshiquestion");
    } else {
      message.error("创建失败，" + res.message);
    }
  }
};

const onContentChange = (value: string) => {
  form.value.question = value;
};

const onAnswerChange = (value: string) => {
  form.value.answer = value;
};

// @ok="handAddAndUpdate()"
const handAddAndUpdate = async () => {
  if (categoryForm.value.id) {
    const res = await QuestionCategoryControllerService.updateQuestionCategory(
      categoryForm.value
    );
    if (res.code === 20000) {
      message.success("更新成功");
      // showCategoryModal.value = false;
      categoryAddUpdateModal.value = false;
      fetchQuestionCategories();
    } else {
      message.error("更新失败，" + res.message);
    }
  } else {
    const res = await QuestionCategoryControllerService.addQuestionCategory(
      categoryForm.value
    );
    if (res.code === 20000) {
      message.success("创建成功");
      // showCategoryModal.value = false;
      categoryAddUpdateModal.value = false;
      fetchQuestionCategories();
    }
  }
  categoryForm.value = {
    id: null,
    type: "",
    typeImg: "",
    description: "",
  };
  file.value = null;
};
// @cancel="handCancleAddAndUpdate()"
const handCancleAddAndUpdate = () => {
  categoryForm.value = {
    id: null,
    type: "",
    typeImg: "",
    description: "",
  };
  file.value = null;
  categoryAddUpdateModal.value = false;
};

const doDeleteCatagory = async (id: number) => {
  const res = await QuestionCategoryControllerService.deleteQuestionCategory(
    id
  );
  if (res.code === 20000) {
    message.success("删除成功");
    fetchQuestionCategories();
  } else {
    message.error("删除失败，" + res.message);
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.text-wrapper {
  flex-grow: 1;
  text-align: center;
}
</style>
