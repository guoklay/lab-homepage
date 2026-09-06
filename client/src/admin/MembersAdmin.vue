<script setup>
import { ref } from 'vue';
import CrudManager from './CrudManager.vue';
import { getMembers, createMember, updateMember, deleteMember } from '@/api';

const crud = ref(null);
const typeFilter = ref('');

const typeMap = {
  faculty: '教师',
  phd: '博士生',
  master: '硕士生',
  alumni: '校友',
  visiting: '访问学者',
};

const columns = [
  { prop: 'name', label: '姓名', minWidth: 110 },
  { prop: 'name_en', label: '英文名', minWidth: 110 },
  { prop: 'title', label: '职称/身份', minWidth: 120 },
  { prop: 'type', label: '类型', width: 100, map: typeMap },
  { prop: 'research_direction', label: '研究方向', minWidth: 150 },
  { prop: 'email', label: '邮箱', minWidth: 150 },
  { prop: 'active', label: '显示', width: 70, map: { 1: '是', 0: '否' } },
];

const fields = [
  { prop: 'name', label: '姓名', required: true },
  { prop: 'name_en', label: '英文名' },
  { prop: 'title', label: '职称/身份' },
  { prop: 'type', label: '类型', type: 'select', options: Object.entries(typeMap).map(([value, label]) => ({ value, label })) },
  { prop: 'avatar', label: '头像', type: 'image' },
  { prop: 'research_direction', label: '研究方向' },
  { prop: 'email', label: '邮箱' },
  { prop: 'bio', label: '个人简介', type: 'textarea' },
  { prop: 'active', label: '前台显示', type: 'switch' },
  { prop: 'sort_order', label: '排序', type: 'number' },
];

const typeOptions = Object.entries(typeMap).map(([value, label]) => ({ value, label }));

const load = () => {
  const params = { all: 1 };
  if (typeFilter.value) params.type = typeFilter.value;
  return getMembers(params);
};

function onTypeChange() {
  crud.value?.reload();
}
</script>

<template>
  <CrudManager
    ref="crud"
    title="成员管理"
    :columns="columns"
    :fields="fields"
    :load="load"
    :create="createMember"
    :update="updateMember"
    :remove="deleteMember"
  >
    <template #toolbar>
      <el-select
        v-model="typeFilter"
        placeholder="按类型筛选"
        clearable
        style="width: 140px"
        @change="onTypeChange"
      >
        <el-option v-for="o in typeOptions" :key="o.value" :label="o.label" :value="o.value" />
      </el-select>
    </template>
  </CrudManager>
</template>
