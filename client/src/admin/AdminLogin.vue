<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { login } from '@/api';
import { setToken } from './auth';

const router = useRouter();
const route = useRoute();
const form = ref({ username: '', password: '' });
const loading = ref(false);

async function onSubmit() {
  if (!form.value.username || !form.value.password) {
    ElMessage.warning('请输入用户名和密码');
    return;
  }
  loading.value = true;
  try {
    const data = await login(form.value.username, form.value.password);
    setToken(data.token);
    ElMessage.success('登录成功');
    router.push(route.query.redirect || '/admin');
  } catch (e) {
    ElMessage.error(e?.response?.data?.error || '登录失败');
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="login-wrap">
    <div class="login-card">
      <div class="login-logo">
        <img src="/logo.svg" alt="logo" />
        <div>
          <div class="login-title">后台管理系统</div>
          <div class="login-sub">实验室主页 · 内容管理</div>
        </div>
      </div>
      <el-form label-position="top" @submit.prevent="onSubmit">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名" @keyup.enter="onSubmit" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" show-password placeholder="请输入密码" @keyup.enter="onSubmit" />
        </el-form-item>
        <el-button type="primary" class="login-btn" :loading="loading" @click="onSubmit">登 录</el-button>
      </el-form>
      <div class="login-hint">默认账号 admin / admin123（请尽快修改）</div>
    </div>
  </div>
</template>

<style scoped>
.login-wrap {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.14), transparent 55%), var(--lab-bg-page);
}
.login-card {
  width: 380px;
  padding: 36px 32px;
  background: var(--lab-surface);
  backdrop-filter: blur(12px);
  border: 1px solid var(--lab-border);
  border-radius: 14px;
  box-shadow: 0 0 40px rgba(59, 130, 246, 0.15);
}
.login-logo {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 26px;
}
.login-logo img {
  width: 46px;
  height: 46px;
}
.login-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--lab-text);
}
.login-sub {
  font-size: 13px;
  color: var(--lab-text-secondary);
}
.login-btn {
  width: 100%;
  margin-top: 6px;
}
.login-hint {
  margin-top: 16px;
  font-size: 12px;
  color: var(--lab-text-secondary);
  text-align: center;
}
</style>
