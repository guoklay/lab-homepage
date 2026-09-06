<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { getSite, updateSite } from '@/api';

const form = ref({});
const saving = ref(false);

const fields = [
  { key: 'site_name', label: '站点名称' },
  { key: 'site_name_en', label: '站点英文名' },
  { key: 'university', label: '所属单位' },
  { key: 'slogan', label: '口号/标语' },
  { key: 'about', label: '研究院简介', type: 'textarea' },
  { key: 'address', label: '地址' },
  { key: 'email', label: '邮箱' },
  { key: 'phone', label: '电话' },
  { key: 'icp', label: '备案号' },
];

onMounted(async () => {
  try {
    form.value = (await getSite()) || {};
  } catch (e) {
    // 忽略
  }
});

async function save() {
  saving.value = true;
  try {
    await updateSite(form.value);
    ElMessage.success('已保存');
  } catch (e) {
    ElMessage.error(e?.response?.data?.error || '保存失败');
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <div class="site-admin">
    <div class="site-title">站点信息</div>
    <el-form label-width="120px" class="site-form">
      <el-form-item v-for="f in fields" :key="f.key" :label="f.label">
        <el-input
          v-if="f.type === 'textarea'"
          v-model="form[f.key]"
          type="textarea"
          :rows="4"
        />
        <el-input v-else v-model="form[f.key]" />
      </el-form-item>
    </el-form>
    <el-button type="primary" :loading="saving" @click="save">保存站点信息</el-button>
  </div>
</template>

<style scoped>
.site-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--lab-text);
  margin-bottom: 16px;
}
.site-form {
  max-width: 720px;
}
</style>
