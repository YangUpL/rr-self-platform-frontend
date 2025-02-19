import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { routes } from "@/router/routes";
import { isLoading } from "@/plugins/loading";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach(() => {
  isLoading.value = false;
});

export default router;
