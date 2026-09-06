<script setup>
import { ref, onMounted } from 'vue';
import { getNews } from '@/api';

const list = ref([]);
const total = ref(0);
const page = ref(1);
const pageSize = 10;
const loading = ref(false);

async function load() {
  loading.value = true;
  try {
    const data = await getNews({ page: page.value, pageSize });
    list.value = data?.list || [];
    total.value = data?.total || 0;
  } catch (e) {
    list.value = [];
    total.value = 0;
  } finally {
    loading.value = false;
  }
}

function onPageChange(p) {
  page.value = p;
  load();
}

onMounted(load);
</script>

<template>
  <div>
    <section class="page-banner">
      <div class="container">
        <h1 class="page-banner-title">新闻动态</h1>
        <span class="page-banner-sub">News</span>
      </div>
    </section>

    <section class="section container">
      <div v-loading="loading">
        <el-empty v-if="!list.length" description="暂无新闻" />
        <ul v-else class="news-list">
          <li v-for="n in list" :key="n.id" class="news-item">
            <router-link :to="`/news/${n.id}`" class="news-link">
              <div class="news-title">
                <el-tag v-if="n.pinned" type="warning" size="small" class="pin-tag">置顶</el-tag>
                {{ n.title }}
              </div>
              <div class="news-summary">{{ n.summary }}</div>
              <div class="news-date">{{ n.date }}</div>
            </router-link>
          </li>
        </ul>
      </div>

      <div v-if="total > pageSize" class="pagination">
        <el-pagination
          background
          layout="prev, pager, next, total"
          :total="total"
          :page-size="pageSize"
          :current-page="page"
          @current-change="onPageChange"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.news-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.news-item {
  border-bottom: 1px solid var(--lab-border);
}
.news-link {
  display: block;
  padding: 18px 8px;
  text-decoration: none;
  transition: background 0.2s;
}
.news-link:hover {
  background: var(--lab-bg);
}
.news-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--lab-text);
  display: flex;
  align-items: center;
  gap: 8px;
}
.pin-tag {
  flex-shrink: 0;
}
.news-summary {
  font-size: 14px;
  color: var(--lab-text-secondary);
  margin-top: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.news-date {
  font-size: 13px;
  color: var(--lab-text-secondary);
  margin-top: 6px;
}
.pagination {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}
</style>
