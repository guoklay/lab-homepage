<script setup>
import { ref, inject, onMounted } from 'vue';
import { getMembers } from '@/api';

const site = inject('site', {});
const stats = ref({ faculty: 0, student: 0 });

onMounted(async () => {
  try {
    const [f, s] = await Promise.all([
      getMembers({ type: 'faculty' }),
      getMembers({ type: 'phd' }),
    ]);
    const masters = await getMembers({ type: 'master' });
    stats.value = { faculty: f.length, student: s.length + masters.length };
  } catch (e) {
    // 忽略
  }
});
</script>

<template>
  <div>
    <section class="page-banner">
      <div class="container">
        <h1 class="page-banner-title">研究院简介</h1>
        <span class="page-banner-sub">About Us</span>
      </div>
    </section>

    <section class="section container">
      <el-row :gutter="40">
        <el-col :xs="24" :md="16">
          <p class="about-text">{{ site.about || '（简介内容占位）' }}</p>
        </el-col>
        <el-col :xs="24" :md="8">
          <el-card shadow="never" class="stat-card">
            <div class="stat-item">
              <div class="stat-num">{{ stats.faculty }}</div>
              <div class="stat-label">教师</div>
            </div>
            <el-divider />
            <div class="stat-item">
              <div class="stat-num">{{ stats.student }}</div>
              <div class="stat-label">硕博研究生</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<style scoped>
.about-text {
  color: var(--lab-text-secondary);
  font-size: 15px;
  line-height: 2;
  white-space: pre-line;
}
.stat-card {
  text-align: center;
}
.stat-item {
  padding: 8px 0;
}
.stat-num {
  font-size: 34px;
  font-weight: 700;
  color: var(--lab-primary);
}
.stat-label {
  font-size: 14px;
  color: var(--lab-text-secondary);
  margin-top: 4px;
}
</style>
