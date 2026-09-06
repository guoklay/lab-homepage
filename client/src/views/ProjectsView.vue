<script setup>
import { ref, onMounted } from 'vue';
import { getProjects } from '@/api';

const projects = ref([]);
const loading = ref(false);
const status = ref('');

const statusMap = { ongoing: '进行中', completed: '已结题' };

const statusOptions = [
  { value: '', label: '全部' },
  { value: 'ongoing', label: '进行中' },
  { value: 'completed', label: '已结题' },
];

async function load() {
  loading.value = true;
  try {
    const params = status.value ? { status: status.value } : {};
    projects.value = (await getProjects(params)) || [];
  } catch (e) {
    projects.value = [];
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
        <h1 class="page-banner-title">科研项目</h1>
        <span class="page-banner-sub">Projects</span>
      </div>
    </section>

    <section class="section container">
      <el-radio-group v-model="status" @change="load" class="filters">
        <el-radio-button v-for="s in statusOptions" :key="s.value" :value="s.value">
          {{ s.label }}
        </el-radio-button>
      </el-radio-group>

      <div v-loading="loading">
        <el-empty v-if="!projects.length" description="暂无项目" />
        <div v-else class="project-grid">
          <router-link v-for="p in projects" :key="p.id" :to="`/project/${p.id}`" class="project-card">
            <div class="project-head">
              <el-tag size="small" class="cat-tag">{{ p.category || '项目' }}</el-tag>
              <el-tag size="small" :type="p.status === 'ongoing' ? 'success' : 'info'">
                {{ statusMap[p.status] || p.status }}
              </el-tag>
            </div>
            <div class="project-name">{{ p.name }}</div>
            <div class="project-years">{{ p.start_year }} — {{ p.end_year }}</div>
            <div class="project-desc">{{ p.description }}</div>
            <div class="project-more">查看详情 →</div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.filters {
  margin-bottom: 24px;
}
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
.project-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 22px 20px;
  background: var(--lab-surface);
  backdrop-filter: blur(8px);
  border: 1px solid var(--lab-border);
  border-radius: var(--lab-radius);
  border-top: 3px solid var(--lab-primary);
  text-decoration: none;
  transition: all 0.2s;
}
.project-card:hover {
  box-shadow: 0 8px 26px rgba(59, 130, 246, 0.25);
  transform: translateY(-3px);
  border-color: rgba(56, 189, 248, 0.4);
}
.project-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.project-name {
  font-size: 17px;
  font-weight: 600;
  color: var(--lab-text);
  line-height: 1.5;
}
.project-years {
  font-size: 13px;
  color: var(--lab-accent);
  font-family: var(--lab-font-mono);
}
.project-desc {
  font-size: 14px;
  color: var(--lab-text-secondary);
  line-height: 1.7;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.project-more {
  font-size: 12px;
  color: var(--lab-accent);
  margin-top: 4px;
  opacity: 0.7;
}
.project-card:hover .project-more {
  opacity: 1;
}
</style>
