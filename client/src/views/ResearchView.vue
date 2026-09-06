<script setup>
import { ref, onMounted } from 'vue';
import { getResearch } from '@/api';

const research = ref([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    research.value = (await getResearch()) || [];
  } catch (e) {
    research.value = [];
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <section class="page-banner">
      <div class="container">
        <h1 class="page-banner-title">研究方向</h1>
        <span class="page-banner-sub">Research Directions</span>
      </div>
    </section>

    <section class="section container">
      <div v-loading="loading">
        <el-empty v-if="!research.length" description="暂无内容" />
        <el-row v-else :gutter="24">
          <el-col v-for="r in research" :key="r.id" :xs="24" :sm="12" :md="6">
            <el-card shadow="hover" class="dir-card">
              <div class="dir-icon">{{ r.name.charAt(0) }}</div>
              <div class="dir-name">{{ r.name }}</div>
              <div class="dir-en">{{ r.name_en }}</div>
              <div class="dir-desc">{{ r.description }}</div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>

<style scoped>
.dir-card {
  height: 100%;
  border-top: 3px solid var(--lab-primary);
}
.dir-card :deep(.el-card__body) {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}
.dir-icon {
  width: 52px;
  height: 52px;
  border-radius: 10px;
  background: rgba(59, 130, 246, 0.15);
  color: var(--lab-accent);
  font-size: 22px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
}
.dir-name {
  font-size: 17px;
  font-weight: 600;
  color: var(--lab-primary);
}
.dir-en {
  font-size: 12px;
  color: var(--lab-text-secondary);
  letter-spacing: 0.5px;
}
.dir-desc {
  font-size: 14px;
  color: var(--lab-text-secondary);
  line-height: 1.7;
}
</style>
