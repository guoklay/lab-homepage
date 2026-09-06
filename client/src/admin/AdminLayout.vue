<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { clearToken } from './auth';
import { getMe } from '@/api';

const router = useRouter();
const route = useRoute();
const username = ref('');

const menus = [
  { path: '/admin', label: '仪表盘', icon: 'Odometer' },
  { path: '/admin/members', label: '成员管理', icon: 'User' },
  { path: '/admin/publications', label: '成果管理', icon: 'Document' },
  { path: '/admin/news', label: '新闻管理', icon: 'Bell' },
  { path: '/admin/projects', label: '项目管理', icon: 'Files' },
  { path: '/admin/research', label: '研究方向', icon: 'Compass' },
  { path: '/admin/site', label: '站点信息', icon: 'Setting' },
];

onMounted(async () => {
  try {
    const u = await getMe();
    username.value = u.username;
  } catch (e) {
    // 忽略
  }
});

function logout() {
  clearToken();
  router.push('/admin/login');
}
</script>

<template>
  <el-container class="admin-layout">
    <el-aside width="220px" class="admin-aside">
      <div class="admin-logo">
        <img src="/logo.svg" alt="logo" />
        <span>后台管理</span>
      </div>
      <el-menu :default-active="route.path" router class="admin-menu">
        <el-menu-item v-for="m in menus" :key="m.path" :index="m.path">
          <el-icon><component :is="m.icon" /></el-icon>
          <span>{{ m.label }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="admin-header">
        <div class="admin-header-title">{{ route.meta.title || '后台管理' }}</div>
        <div class="admin-header-right">
          <span class="admin-user">{{ username }}</span>
          <el-button link type="primary" @click="logout">退出登录</el-button>
        </div>
      </el-header>
      <el-main class="admin-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.admin-layout {
  height: 100vh;
}
.admin-aside {
  background: #0a101f;
  border-right: 1px solid var(--lab-border);
}
.admin-logo {
  height: 60px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
  color: #fff;
  font-weight: 600;
  border-bottom: 1px solid var(--lab-border);
}
.admin-logo img {
  width: 30px;
  height: 30px;
}
.admin-menu {
  border-right: none;
  background: transparent;
}
.admin-menu :deep(.el-menu-item) {
  color: var(--lab-text-secondary);
}
.admin-menu :deep(.el-menu-item.is-active) {
  color: var(--lab-accent);
  background: rgba(59, 130, 246, 0.12);
}
.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(11, 18, 32, 0.7);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--lab-border);
}
.admin-header-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--lab-text);
}
.admin-header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.admin-user {
  color: var(--lab-text-secondary);
  font-size: 14px;
}
.admin-main {
  background: var(--lab-bg-page);
}
</style>
