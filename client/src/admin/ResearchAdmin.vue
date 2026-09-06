<script setup>
import CrudManager from './CrudManager.vue';
import { getResearch, createResearch, updateResearch, deleteResearch } from '@/api';

const columns = [
  { prop: 'name', label: '方向名称', minWidth: 180 },
  { prop: 'name_en', label: '英文名', minWidth: 180 },
  { prop: 'description', label: '简介', minWidth: 260 },
];

const fields = [
  { prop: 'name', label: '方向名称', required: true },
  { prop: 'name_en', label: '英文名' },
  { prop: 'description', label: '简介', type: 'textarea' },
  { prop: 'icon', label: '图标' },
  { prop: 'sort_order', label: '排序', type: 'number' },
];
</script>

<template>
  <CrudManager
    title="研究方向"
    :columns="columns"
    :fields="fields"
    :load="getResearch"
    :create="createResearch"
    :update="updateResearch"
    :remove="deleteResearch"
  />
</template>
