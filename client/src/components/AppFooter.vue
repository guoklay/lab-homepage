<script setup>
import { inject } from 'vue';

const site = inject('site', {});
const year = new Date().getFullYear();
</script>

<template>
  <footer class="app-footer">
    <div class="container footer-inner">
      <div class="footer-col">
        <div class="footer-title">{{ site.site_name || '实验室名称' }}</div>
        <p class="footer-desc">{{ site.slogan || '' }}</p>
      </div>
      <div class="footer-col">
        <div class="footer-title">联系方式</div>
        <p>地址：{{ site.address || '—' }}</p>
        <p>邮箱：{{ site.email || '—' }}</p>
        <p>电话：{{ site.phone || '—' }}</p>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        © {{ year }} {{ site.university || '' }} · {{ site.site_name || '实验室' }}
        <span v-if="site.icp"> · {{ site.icp }}</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: #0a101f;
  color: rgba(255, 255, 255, 0.85);
  margin-top: auto;
  border-top: 1px solid var(--lab-border);
}
.footer-inner {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  padding: 40px 20px;
}
.footer-col {
  min-width: 220px;
}
.footer-title {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 12px;
}
.footer-col p {
  font-size: 14px;
  line-height: 2;
  color: rgba(255, 255, 255, 0.7);
}
.footer-desc {
  color: rgba(255, 255, 255, 0.7);
}
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding: 14px 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
}
</style>
