<script setup>
import CrudManager from './CrudManager.vue';
import { getNews, createNews, updateNews, deleteNews } from '@/api';

const categoryMap = { general: '综合', achievement: '成果', activity: '活动', notice: '通知' };

const columns = [
  { prop: 'title', label: '标题', minWidth: 220 },
  { prop: 'date', label: '日期', width: 120 },
  { prop: 'category', label: '分类', width: 90, map: categoryMap },
  { prop: 'pinned', label: '置顶', width: 70, map: { 1: '是', 0: '否' } },
  { prop: 'summary', label: '摘要', minWidth: 200 },
];

const fields = [
  { prop: 'title', label: '标题', required: true },
  { prop: 'date', label: '日期', placeholder: '如 2024-12-01' },
  { prop: 'category', label: '分类', type: 'select', options: Object.entries(categoryMap).map(([value, label]) => ({ value, label })) },
  { prop: 'summary', label: '摘要', type: 'textarea' },
  { prop: 'content', label: '正文', type: 'textarea' },
  { prop: 'pinned', label: '置顶', type: 'switch' },
  { prop: 'sort_order', label: '排序', type: 'number' },
];
</script>

<template>
  <CrudManager
    title="新闻管理"
    :columns="columns"
    :fields="fields"
    :load="() => getNews({ page: 1, pageSize: 1000 }).then((d) => d.list)"
    :create="createNews"
    :update="updateNews"
    :remove="deleteNews"
  />
</template>
