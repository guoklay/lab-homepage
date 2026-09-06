<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<template>
  <div class="not-found">
    <h1 class="code">404</h1>
    <p class="tip">页面不存在或已被移除</p>
    <el-button type="primary" @click="router.push('/')">返回首页</el-button>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
.code {
  font-size: 80px;
  font-weight: 700;
  color: var(--lab-primary);
  margin: 0;
}
.tip {
  color: var(--lab-text-secondary);
  margin-bottom: 12px;
}
</style>
