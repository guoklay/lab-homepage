<script setup>
import { computed, inject } from 'vue';
import { Location, Message, Phone } from '@element-plus/icons-vue';

const site = inject('site', {});

const items = computed(() => [
  { icon: Location, label: '地址', value: site.value?.address },
  { icon: Message, label: '邮箱', value: site.value?.email },
  { icon: Phone, label: '电话', value: site.value?.phone },
]);
</script>

<template>
  <div>
    <section class="page-banner">
      <div class="container">
        <h1 class="page-banner-title">联系我们</h1>
        <span class="page-banner-sub">Contact Us</span>
      </div>
    </section>

    <section class="section container">
      <el-row :gutter="40">
        <el-col :xs="24" :md="12">
          <el-card shadow="never" class="contact-card">
            <div v-for="item in items" :key="item.label" class="contact-item">
              <el-icon class="contact-icon"><component :is="item.icon" /></el-icon>
              <div>
                <div class="contact-label">{{ item.label }}</div>
                <div class="contact-value">{{ item.value || '—' }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :md="12">
          <el-card shadow="never" class="map-card">
            <div class="map-placeholder">
              <el-icon :size="40"><Location /></el-icon>
              <p>地图位置占位</p>
              <p class="map-hint">后续可接入百度地图 / 高德地图</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<style scoped>
.contact-card {
  height: 100%;
}
.contact-item {
  display: flex;
  gap: 14px;
  padding: 18px 0;
  border-bottom: 1px solid var(--lab-border);
}
.contact-item:last-child {
  border-bottom: none;
}
.contact-icon {
  font-size: 22px;
  color: var(--lab-primary);
  margin-top: 4px;
}
.contact-label {
  font-size: 14px;
  color: var(--lab-text-secondary);
}
.contact-value {
  font-size: 16px;
  color: var(--lab-text);
  margin-top: 4px;
}
.map-card {
  height: 100%;
}
.map-placeholder {
  min-height: 260px;
  background: var(--lab-bg);
  border-radius: var(--lab-radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--lab-text-secondary);
  gap: 8px;
}
.map-hint {
  font-size: 13px;
  color: var(--lab-text-secondary);
}
</style>
