<script setup>
import { ref, computed, onMounted } from 'vue';
import CrudManager from './CrudManager.vue';
import { getProjects, createProject, updateProject, deleteProject, getMembers } from '@/api';

const statusMap = { ongoing: '进行中', completed: '已结题' };
const memberOptions = ref([]);

const columns = [
  { prop: 'name', label: '项目名称', minWidth: 220 },
  { prop: 'category', label: '类别', width: 100 },
  { prop: 'status', label: '状态', width: 90, map: statusMap },
  { prop: 'start_year', label: '开始', width: 70 },
  { prop: 'end_year', label: '结束', width: 70 },
  { prop: 'funding', label: '经费', width: 100 },
  { prop: 'description', label: '简介', minWidth: 200 },
];

const fields = computed(() => [
  { prop: 'name', label: '项目名称', required: true },
  { prop: 'description', label: '项目简介', type: 'textarea' },
  { prop: 'category', label: '类别', placeholder: '如 国家级 / 省部级 / 横向' },
  { prop: 'status', label: '状态', type: 'select', options: Object.entries(statusMap).map(([value, label]) => ({ value, label })) },
  { prop: 'start_year', label: '开始年份', type: 'number' },
  { prop: 'end_year', label: '结束年份', type: 'number' },
  { prop: 'funding', label: '经费', placeholder: '如 80万元' },
  { prop: 'member_ids', label: '参与成员', type: 'multiselect', options: memberOptions.value },
  { prop: 'sort_order', label: '排序', type: 'number' },
]);

onMounted(async () => {
  try {
    const ms = await getMembers({ all: 1 });
    memberOptions.value = ms.map((m) => ({ value: m.id, label: m.name }));
  } catch (e) {
    // 忽略
  }
});
</script>

<template>
  <CrudManager
    title="项目管理"
    :columns="columns"
    :fields="fields"
    :load="getProjects"
    :create="createProject"
    :update="updateProject"
    :remove="deleteProject"
  />
</template>
