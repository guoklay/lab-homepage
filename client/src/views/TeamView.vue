<script setup>
import { ref, onMounted } from 'vue';
import { getMembers } from '@/api';
import MemberAvatar from '@/components/MemberAvatar.vue';

const types = [
  { key: '', label: '全部' },
  { key: 'faculty', label: '教师' },
  { key: 'phd', label: '博士生' },
  { key: 'master', label: '硕士生' },
  { key: 'alumni', label: '校友' },
];

const activeType = ref('');
const members = ref([]);
const loading = ref(false);

async function load() {
  loading.value = true;
  try {
    const params = activeType.value ? { type: activeType.value } : {};
    members.value = (await getMembers(params)) || [];
  } catch (e) {
    members.value = [];
  } finally {
    loading.value = false;
  }
}

onMounted(load);
</script>

<template>
  <div>
    <section class="page-banner">
      <div class="container">
        <h1 class="page-banner-title">团队成员</h1>
        <span class="page-banner-sub">People</span>
      </div>
    </section>

    <section class="section container">
      <el-tabs v-model="activeType" @tab-change="load" class="team-tabs">
        <el-tab-pane v-for="t in types" :key="t.key" :label="t.label" :name="t.key" />
      </el-tabs>

      <div v-loading="loading">
        <el-empty v-if="!members.length" description="暂无成员" />
        <div v-else class="member-grid">
          <router-link v-for="m in members" :key="m.id" :to="`/member/${m.id}`" class="member-card">
            <MemberAvatar :name="m.name" :src="m.avatar" :size="72" />
            <div class="member-name">{{ m.name }}</div>
            <div class="member-name-en">{{ m.name_en }}</div>
            <div class="member-title">{{ m.title }}</div>
            <div class="member-dir">{{ m.research_direction }}</div>
            <div class="member-more">查看详情 →</div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.team-tabs :deep(.el-tabs__item) {
  font-size: 16px;
}
.member-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
.member-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  text-decoration: none;
  background: var(--lab-surface);
  backdrop-filter: blur(8px);
  border: 1px solid var(--lab-border);
  border-radius: var(--lab-radius);
  padding: 28px 16px;
  transition: all 0.2s;
}
.member-card:hover {
  box-shadow: 0 8px 26px rgba(59, 130, 246, 0.25);
  transform: translateY(-3px);
  border-color: rgba(56, 189, 248, 0.4);
}
.member-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--lab-text);
  margin-top: 14px;
}
.member-name-en {
  font-size: 12px;
  color: var(--lab-text-secondary);
  margin-top: 2px;
}
.member-title {
  font-size: 13px;
  color: var(--lab-accent);
  margin-top: 6px;
}
.member-dir {
  font-size: 13px;
  color: var(--lab-text-secondary);
  margin-top: 6px;
}
.member-more {
  font-size: 12px;
  color: var(--lab-accent);
  margin-top: 12px;
  opacity: 0.7;
}
.member-card:hover .member-more {
  opacity: 1;
}
</style>
