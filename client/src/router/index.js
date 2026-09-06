import { createRouter, createWebHistory } from 'vue-router';
import { isLoggedIn } from '@/admin/auth';

const routes = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue'), meta: { title: '首页' } },
  { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue'), meta: { title: '研究院简介' } },
  { path: '/team', name: 'team', component: () => import('@/views/TeamView.vue'), meta: { title: '团队成员' } },
  { path: '/research', name: 'research', component: () => import('@/views/ResearchView.vue'), meta: { title: '研究方向' } },
  { path: '/publications', name: 'publications', component: () => import('@/views/PublicationsView.vue'), meta: { title: '科研成果' } },
  { path: '/news', name: 'news', component: () => import('@/views/NewsView.vue'), meta: { title: '新闻动态' } },
  { path: '/news/:id', name: 'news-detail', component: () => import('@/views/NewsDetailView.vue'), meta: { title: '新闻详情' } },
  { path: '/contact', name: 'contact', component: () => import('@/views/ContactView.vue'), meta: { title: '联系我们' } },
  { path: '/member/:id', name: 'member-detail', component: () => import('@/views/MemberDetailView.vue'), meta: { title: '成员详情' } },
  { path: '/publication/:id', name: 'publication-detail', component: () => import('@/views/PublicationDetailView.vue'), meta: { title: '成果详情' } },
  { path: '/projects', name: 'projects', component: () => import('@/views/ProjectsView.vue'), meta: { title: '科研项目' } },
  { path: '/project/:id', name: 'project-detail', component: () => import('@/views/ProjectDetailView.vue'), meta: { title: '项目详情' } },

  // ===== 后台管理 =====
  { path: '/admin/login', name: 'admin-login', component: () => import('@/admin/AdminLogin.vue'), meta: { title: '后台登录' } },
  {
    path: '/admin',
    component: () => import('@/admin/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'admin-dashboard', component: () => import('@/admin/Dashboard.vue'), meta: { title: '仪表盘' } },
      { path: 'members', name: 'admin-members', component: () => import('@/admin/MembersAdmin.vue'), meta: { title: '成员管理' } },
      { path: 'publications', name: 'admin-publications', component: () => import('@/admin/PublicationsAdmin.vue'), meta: { title: '成果管理' } },
      { path: 'news', name: 'admin-news', component: () => import('@/admin/NewsAdmin.vue'), meta: { title: '新闻管理' } },
      { path: 'projects', name: 'admin-projects', component: () => import('@/admin/ProjectsAdmin.vue'), meta: { title: '项目管理' } },
      { path: 'research', name: 'admin-research', component: () => import('@/admin/ResearchAdmin.vue'), meta: { title: '研究方向' } },
      { path: 'site', name: 'admin-site', component: () => import('@/admin/SiteAdmin.vue'), meta: { title: '站点信息' } },
    ],
  },

  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFoundView.vue'), meta: { title: '404' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});

// 登录守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some((r) => r.meta.requiresAuth) && !isLoggedIn()) {
    next({ path: '/admin/login', query: { redirect: to.fullPath } });
  } else if (to.path === '/admin/login' && isLoggedIn()) {
    next({ path: '/admin' });
  } else {
    next();
  }
});

router.afterEach((to) => {
  const suffix = to.path.startsWith('/admin') ? '后台管理' : '实验室主页';
  document.title = to.meta.title ? `${to.meta.title} · ${suffix}` : suffix;
});

export default router;
