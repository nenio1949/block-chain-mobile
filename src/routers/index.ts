import { createRouter, createWebHistory } from "vue-router";

// 2. 配置路由
const routes = [
  {
    path: "/",
    component: () => import("@/pages/home/index.vue")
  },
  {
    path: "/order",
    component: () => import("@/pages/order/index.vue")
  },
  {
    path: "/tutorial",
    component: () => import("@/pages/tutorial/index.vue")
  },
  {
    path: "/404",
    component: () => import("@/pages/common/notFound.vue")
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404"
  }
];
// 1.返回一个 router 实列，为函数，里面有配置项（对象） history
const router = createRouter({
  history: createWebHistory(),
  routes
});

// 3导出路由   然后去 main.ts 注册 router.ts
export default router;
