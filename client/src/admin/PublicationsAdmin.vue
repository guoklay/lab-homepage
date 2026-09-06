<script setup>
import { ref, computed, onMounted } from 'vue';
import CrudManager from './CrudManager.vue';
import { getPublications, createPublication, updatePublication, deletePublication, getMembers } from '@/api';

const typeMap = { journal: '期刊论文', conference: '会议论文', patent: '专利' };
const memberOptions = ref([{ value: 0, label: '无关联成员' }]);

const columns = [
  { prop: 'title', label: '标题', minWidth: 220 },
  { prop: 'authors', label: '作者', minWidth: 140 },
  { prop: 'venue', label: '期刊/会议', minWidth: 120 },
  { prop: 'year', label: '年份', width: 80 },
  { prop: 'type', label: '类型', width: 100, map: typeMap },
];

const fields = computed(() => [
  { prop: 'title', label: '标题', required: true },
  { prop: 'authors', label: '作者' },
  { prop: 'venue', label: '期刊/会议' },
  { prop: 'year', label: '年份', type: 'number' },
  { prop: 'pages', label: '卷期页码', placeholder: '如 36(2): 123-130' },
  { prop: 'type', label: '类型', type: 'select', options: Object.entries(typeMap).map(([value, label]) => ({ value, label })) },
  { prop: 'keywords', label: '关键词', placeholder: '用逗号分隔' },
  { prop: 'member_id', label: '关联成员', type: 'select', options: memberOptions.value },
  { prop: 'abstract', label: '摘要', type: 'textarea' },
  { prop: 'doi', label: 'DOI' },
  { prop: 'link', label: '链接' },
  { prop: 'sort_order', label: '排序', type: 'number' },
]);

onMounted(async () => {
  try {
    const ms = await getMembers({ all: 1 });
    memberOptions.value = [{ value: 0, label: '无关联成员' }, ...ms.map((m) => ({ value: m.id, label: m.name }))];
  } catch (e) {
    // 忽略
  }
});
</script>

<template>
  <CrudManager
    title="成果管理"
    :columns="columns"
    :fields="fields"
    :load="getPublications"
    :create="createPublication"
    :update="updatePublication"
    :remove="deletePublication"
  />
</template>
