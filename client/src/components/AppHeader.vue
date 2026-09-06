<script setup>
import { computed, inject } from 'vue';
import { useRoute } from 'vue-router';

const site = inject('site', {});
const route = useRoute();

const menus = [
  { path: '/', label: '首页' },
  { path: '/about', label: '研究院简介' },
  { path: '/team', label: '团队成员' },
  { path: '/research', label: '研究方向' },
  { path: '/publications', label: '科研成果' },
  { path: '/projects', label: '科研项目' },
  { path: '/news', label: '新闻动态' },
  { path: '/contact', label: '联系我们' },
];

// 新闻详情页也高亮「新闻动态」
const activeMenu = computed(() => {
  const p = route.path;
  if (p.startsWith('/news')) return '/news';
  return p;
});
</script>

<template>
  <header class="app-header">
    <div class="container header-inner">
      <router-link to="/" class="brand">
        <img src="/logo.svg" alt="logo" class="brand-logo" />
        <div class="brand-text">
          <span class="brand-name">{{ site.site_name || '实验室名称' }}</span>
          <span class="brand-name-en">{{ site.site_name_en || 'Laboratory' }}</span>
        </div>
      </router-link>

      <el-menu
        mode="horizontal"
        :default-active="activeMenu"
        :ellipsis="false"
        router
        class="nav-menu"
      >
        <el-menu-item v-for="m in menus" :key="m.path" :index="m.path">
          {{ m.label }}
        </el-menu-item>
      </el-menu>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(11, 18, 32, 0.75);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--lab-border);
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.35);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--lab-header-height);
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: inherit;
}
.brand-logo {
  width: 40px;
  height: 40px;
}
.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}
.brand-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--lab-primary);
}
.brand-name-en {
  font-size: 12px;
  color: var(--lab-text-secondary);
}
.nav-menu {
  border-bottom: none;
  --el-menu-hover-bg-color: transparent;
}
.nav-menu :deep(.el-menu-item) {
  height: var(--lab-header-height);
  line-height: var(--lab-header-height);
  font-size: 15px;
}
.nav-menu :deep(.el-menu-item.is-active) {
  color: var(--el-color-primary);
  font-weight: 600;
  border-bottom-color: var(--el-color-primary);
}
</style>
