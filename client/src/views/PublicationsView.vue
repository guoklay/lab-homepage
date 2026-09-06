<script setup>
import { ref, computed, onMounted } from 'vue';
import { getPublications } from '@/api';

const pubs = ref([]);
const loading = ref(false);
const type = ref('');
const year = ref(null);
const keyword = ref('');

const typeOptions = [
  { value: '', label: '全部' },
  { value: 'journal', label: '期刊论文' },
  { value: 'conference', label: '会议论文' },
  { value: 'patent', label: '专利' },
];

const typeMap = { journal: '期刊论文', conference: '会议论文', patent: '专利' };

const years = computed(() => {
  const set = [...new Set(pubs.value.map((p) => p.year))].sort((a, b) => b - a);
  return set;
});

async function load() {
  loading.value = true;
  try {
    const params = {};
    if (type.value) params.type = type.value;
    if (year.value) params.year = year.value;
    if (keyword.value.trim()) params.q = keyword.value.trim();
    pubs.value = (await getPublications(params)) || [];
  } catch (e) {
    pubs.value = [];
  } finally {
    loading.value = false;
  }
}

function search() {
  load();
}

onMounted(load);
</script>

<template>
  <div>
    <section class="page-banner">
      <div class="container">
        <h1 class="page-banner-title">科研成果</h1>
        <span class="page-banner-sub">Publications</span>
      </div>
    </section>

    <section class="section container">
      <div class="filters">
        <el-radio-group v-model="type" @change="search">
          <el-radio-button v-for="t in typeOptions" :key="t.value" :value="t.value">
            {{ t.label }}
          </el-radio-button>
        </el-radio-group>
        <el-select v-model="year" placeholder="按年份筛选" clearable class="year-select" @change="search">
          <el-option v-for="y in years" :key="y" :label="y" :value="y" />
        </el-select>
        <el-input
          v-model="keyword"
          placeholder="搜索标题 / 作者 / 期刊"
          clearable
          class="keyword-input"
          @keyup.enter="search"
        >
          <template #append>
            <el-button @click="search">搜索</el-button>
          </template>
        </el-input>
      </div>

      <div v-loading="loading">
        <el-empty v-if="!pubs.length" description="暂无成果" />
        <ul v-else class="pub-list">
          <li v-for="p in pubs" :key="p.id" class="pub-item">
            <div class="pub-type">{{ typeMap[p.type] || p.type }}</div>
            <router-link :to="`/publication/${p.id}`" class="pub-body">
              <div class="pub-title">{{ p.title }}</div>
              <div class="pub-meta">{{ p.authors }} · {{ p.venue }} · {{ p.year }}</div>
              <div v-if="p.abstract" class="pub-abstract">{{ p.abstract }}</div>
              <div class="pub-more">查看详情 →</div>
            </router-link>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}
.year-select {
  width: 140px;
}
.keyword-input {
  width: 280px;
}
.pub-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.pub-item {
  display: flex;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid var(--lab-border);
}
.pub-type {
  flex-shrink: 0;
  height: 26px;
  padding: 0 10px;
  border-radius: 4px;
  background: rgba(59, 130, 246, 0.15);
  color: var(--lab-accent);
  font-size: 13px;
  display: flex;
  align-items: center;
  margin-top: 2px;
}
.pub-body {
  min-width: 0;
  flex: 1;
  display: block;
  text-decoration: none;
  color: inherit;
}
.pub-body:hover .pub-title {
  color: var(--lab-accent);
}
.pub-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--lab-text);
  line-height: 1.5;
}
.pub-more {
  font-size: 12px;
  color: var(--lab-accent);
  margin-top: 6px;
  opacity: 0.7;
}
.pub-body:hover .pub-more {
  opacity: 1;
}
.pub-meta {
  font-size: 13px;
  color: var(--lab-text-secondary);
  margin-top: 4px;
}
.pub-abstract {
  font-size: 13px;
  color: var(--lab-text-secondary);
  margin-top: 6px;
  line-height: 1.7;
}
</style>
