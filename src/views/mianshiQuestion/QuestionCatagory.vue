<template>
  <div class="card-container">
    <a-card
      :style="{ width: 'calc((100% - 100px) / 3)', cursor: 'pointer' }"
      v-for="item in category"
      :key="item.id"
      size="small"
      @click="handleCardClick(item.id)"
      class="custom-card"
    >
      <a-card-meta class="custom-card-meta">
        <template #title>
          <!-- 显示转换后的类型描述 -->
          <p class="card-title">
            {{ item.type }}
          </p>
        </template>
        <template #avatar>
          <a-avatar class="custom-avatar">
            <img alt="avatar" :src="item.typeImg" />
          </a-avatar>
        </template>
        <template #description>
          <p class="card-description">
            {{ getShortDescription(item.description) }}
          </p>
        </template>
      </a-card-meta>
    </a-card>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref, computed } from "vue";
import { QuestionCategoryControllerService } from '../../../generated'

const router = useRouter();
const category = ref([
  {
    id: 1,
    type: "后台好像走丢了",
    typeImg:
      "https://tse4-mm.cn.bing.net/th/id/OIP-C.iPvJGrWq7mwCEd_aiX7LvAHaFJ?rs=1&pid=ImgDetMain",
    description: "回去扣后台工资",
  },
]);

onMounted(async () => {
  const res = await QuestionCategoryControllerService.listQuestionCategory();
  if (res.code === 20000) {
    category.value = res.data;
    console.log(category.value);
  }
});

const handleCardClick = (tid) => {
  // 传递实际的分类 ID
  router.push({
    name: "QuestionList",
    params: {
      id: tid,
    },
  });
};

// 定义计算属性来截取 description
const getShortDescription = (description) => {
  return description.length > 24
    ? description.slice(0, 24) + "..."
    : description;
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 24px;
  padding: 24px;
  justify-content: center;
}

.custom-card {
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  min-width: 300px;
  max-width: 400px;
}

.custom-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-4px);
}

.custom-card-meta {
  display: flex;
  align-items: center;
  padding: 16px;
}

.custom-avatar {
  width: 64px;
  height: 64px;
  margin-right: 16px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
}

.custom-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.card-description {
  font-size: 14px;
  color: #666;
}

/* 媒体查询示例，可根据实际需求调整 */
@media (max-width: 1200px) {
  .custom-card {
    width: calc((100% - 48px) / 2);
  }
}

@media (max-width: 768px) {
  .custom-card {
    width: 100%;
  }
}
</style>
