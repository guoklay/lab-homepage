<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getMembers, getPublications, getNews, getProjects, getResearch } from '@/api';

const router = useRouter();
const stats = ref({ members: 0, publications: 0, news: 0, projects: 0, research: 0 });

const cards = [
  { key: 'members', label: '团队成员', path: '/admin/members' },
  { key: 'publications', label: '科研成果', path: '/admin/publications' },
  { key: 'news', label: '新闻动态', path: '/admin/news' },
  { key: 'projects', label: '科研项目', path: '/admin/projects' },
  { key: 'research', label: '研究方向', path: '/admin/research' },
];

onMounted(async () => {
  try {
    const [m, p, n, pj, r] = await Promise.all([
      getMembers({ all: 1 }),
      getPublications(),
      getNews({ page: 1, pageSize: 1 }),
      getProjects(),
      getResearch(),
    ]);
    stats.value = {
      members: m.length,
      publications: p.length,
      news: n.total,
      projects: pj.length,
      research: r.length,
    };
  } catch (e) {
    // 忽略
  }
});
</script>

<template>
  <div>
    <div class="dash-welcome">
      <h2>欢迎使用后台管理系统</h2>
      <p>在此维护成员、成果、新闻、项目、研究方向与站点信息。</p>
    </div>
    <el-row :gutter="20">
      <el-col v-for="c in cards" :key="c.key" :xs="12" :sm="8" :md="8" :lg="4">
        <el-card shadow="hover" class="stat-card" @click="router.push(c.path)">
          <div class="stat-num">{{ stats[c.key] }}</div>
          <div class="stat-label">{{ c.label }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.dash-welcome {
  margin-bottom: 24px;
}
.dash-welcome h2 {
  font-size: 22px;
  color: var(--lab-text);
  margin-bottom: 6px;
}
.dash-welcome p {
  font-size: 14px;
  color: var(--lab-text-secondary);
}
.stat-card {
  cursor: pointer;
  text-align: center;
  transition: all 0.2s;
}
.stat-card:hover {
  border-color: rgba(56, 189, 248, 0.5);
  box-shadow: 0 8px 26px rgba(59, 130, 246, 0.25);
  transform: translateY(-3px);
}
.stat-num {
  font-size: 34px;
  font-weight: 700;
  color: var(--lab-accent);
}
.stat-label {
  font-size: 14px;
  color: var(--lab-text-secondary);
  margin-top: 6px;
}
</style>
