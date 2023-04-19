import { createRouter, createWebHashHistory } from 'vue-router'

// 路由列表
const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/TestView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView/LoginView.vue'),
  },
  {
    path: '/',
    name: 'backstageServiceDesign',
    component: () => import('../views/BackstageServiceView/BackstageServiceDesign.vue'),
    children: [{
      path: 'ServiceAdd',
      component: () => import('../views/BackstageServiceView/DesignView/ServiceAdd.vue'),
    }],
  },
]

// 导出路由
export default createRouter({
  history: createWebHashHistory(),
  routes,
})
